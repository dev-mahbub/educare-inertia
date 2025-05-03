import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Swal from 'sweetalert2';
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Tooltip } from "@mui/material";
import { Link, router } from "@inertiajs/react";
import EditQuestionBankPopup from './QuestionBankPopup/EditQuestionBankPopup';
import Cookies from 'js-cookie';

function createData(id, questionName, description, questions) {
    return {
        id,
        questionName,
        description,
        questions,
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "questionName",
        numeric: false,
        disablePadding: true,
        label: "Question Bank Name",
    },
    {
        id: "questions",
        numeric: true,
        disablePadding: false,
        label: "Assigned Question",
    }
];

export default function QuestionBankList({ virtualQuestionBanks }) {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("questionName");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        setRows(virtualQuestionBanks.map((item) =>
            createData(
                item.id,
                item.title,
                item.description,
                item.questions
            )
        ));
    }, [virtualQuestionBanks]); 

     // delete
     const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('online_exam.destroy_question_bank', id));
            }
        });
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, rows]
    );

    const [editQuestionbank, setEditQuestionBank] = React.useState(false);
    const [activeQuestionBankRow, setActiveQuestionBankRow] = React.useState('');
    const [selectedRowId, setSelectedRowId] = React.useState('');
    const editHandleQuestionBankClick = (id) => {
        const activeRowData = rows.find((row) => row.id === id);
        setActiveQuestionBankRow(activeRowData);
        setEditQuestionBank(!editQuestionbank);
        setSelectedRowId(id)
    };

    const handlePreviewQuestionBankQuestionPaper = (id) => {
        Cookies.set('question_bank_id', id);

        window.open(route('pdf_generator.preview_questionbank_online_exam_question'));
    }

    const handleDownloadQuestionBankQuestionPaper = (id) => {
        Cookies.set('question_bank_id', id);

        window.open(route('pdf_generator.download_questionbank_online_exam_question'));
    }

    return (
        <>
            <div className="educare-common-mat-list w-full mt-4">
                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer>
                            <Table aria-labelledby="tableTitle">
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((headCell) => (
                                            <TableCell
                                                key={headCell.id}
                                                align={
                                                    headCell.numeric
                                                        ? "left"
                                                        : "left"
                                                }
                                                padding={
                                                    headCell.disablePadding
                                                        ? "none"
                                                        : "normal"
                                                }
                                                sortDirection={
                                                    orderBy === headCell.id
                                                        ? order
                                                        : false
                                                }
                                            >
                                                <TableSortLabel
                                                    active={
                                                        orderBy === headCell.id
                                                    }
                                                    direction={
                                                        orderBy === headCell.id
                                                            ? order
                                                            : "asc"
                                                    }
                                                    onClick={(event) =>
                                                        handleRequestSort(
                                                            event,
                                                            headCell.id
                                                        )
                                                    }
                                                >
                                                    {headCell.label}
                                                    {orderBy === headCell.id ? (
                                                        <Box
                                                            component="span"
                                                            sx={visuallyHidden}
                                                        >
                                                            {order === "desc"
                                                                ? "sorted descending"
                                                                : "sorted ascending"}
                                                        </Box>
                                                    ) : null}
                                                </TableSortLabel>
                                            </TableCell>
                                        ))}
                                        <TableCell >
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <TableCell id={labelId}>{row.questionName}</TableCell>
                                                <TableCell>
                                                    {typeof row.questions === 'string' 
                                                        ? JSON.parse(row.questions).length 
                                                        : Array.isArray(row.questions) 
                                                            ? row.questions.length 
                                                            : 0}
                                                </TableCell> 
                                                <TableCell>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    onClick={() => editHandleQuestionBankClick(row.id)}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    onClick={() => handleDelete(row.id)} 
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Assign Question"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <div className="flex items-center gap-1 bg-success rounded-md h-[23px] w-auto whitespace-nowrap">
                                                                    <Link
                                                                        href={route('online_exam.assign_question_bank_question', row.id)}
                                                                        className="text-white px-2 py-[1.5px] flex items-center gap-1"
                                                                    >
                                                                        <i className="icon-Table text-[16px]"></i>
                                                                        <span>Assign Ques.</span>
                                                                    </Link>
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Question Answer Paper"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <div className="flex items-center gap-1 bg-info rounded-md h-[23px] w-auto whitespace-nowrap">
                                                                    <button
                                                                        onClick={() => handlePreviewQuestionBankQuestionPaper(row.id)}
                                                                        type="button"
                                                                        className="text-white px-2 py-[1.5px] flex items-center gap-1"
                                                                    >
                                                                        <i className="icon-FilePdf text-[16px]"></i>
                                                                        <span>Ques. Ans Paper</span>
                                                                    </button>
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Question Paper"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <div className="flex items-center gap-1 bg-info rounded-md h-[23px] w-auto whitespace-nowrap">
                                                                    <button
                                                                        onClick={() => handleDownloadQuestionBankQuestionPaper(row.id)}
                                                                        type="button"
                                                                        className="text-white px-2 py-[1.5px] flex items-center gap-1"
                                                                    >
                                                                        <i className="icon-FilePdf text-[16px]"></i>
                                                                        <span>Ques. Paper</span>
                                                                    </button>
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </div>
            <EditQuestionBankPopup
                editQuestionbank={editQuestionbank}
                setEditQuestionBank={setEditQuestionBank}
                activeQuestionBankRow={activeQuestionBankRow}
            />
        </>
    );
}
