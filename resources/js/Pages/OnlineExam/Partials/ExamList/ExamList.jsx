import { concatName } from "@/Hooks/GlobalFunction";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import PublishExamPopup from './ExamListPopup/PublishExamPopup';
import ShareExamPopup from './ExamListPopup/ShareExamPopup';

export default function ExamList({
    virtualExams,
    data
}) {

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("question");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rowsData, setRowsData] = useState([]);
    const [selectedExam, setSelectedExam] = useState({});

    useEffect(() => {
        setRowsData(virtualExams.map((item) =>
            createData(
                item.id,
                item.title,
                item?.subject?.title,
                item?.start_date + " " + item?.start_time + " to " + item?.end_date + " " + item?.end_time,
                item.total_mark+"/"+item.pass_mark,
                item.exam_code,
                item.is_published,
                concatName(item?.created_by?.first_name, item?.created_by?.middle_name, item?.created_by?.last_name)
            )
        ));
    }, [virtualExams]);

    function createData(id, exam_title, subject_title, exam_time, full_pass_mark, exam_code, is_published, created_by) {
        return {
            id,
            exam_title,
            subject_title,
            exam_time,
            full_pass_mark,
            exam_code,
            is_published,
            created_by
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
            id: "exam",
            numeric: false,
            disablePadding: true,
            label: "Exam",
        },
        {
            id: "subject",
            numeric: true,
            disablePadding: false,
            label: "Subject",
        },
        {
            id: "examTime",
            numeric: true,
            disablePadding: false,
            label: "Exam Time",
        },
        {
            id: "fullPassMark",
            numeric: true,
            disablePadding: false,
            label: "Full/Pass Marks",
        },
        {
            id: "examCode",
            numeric: true,
            disablePadding: false,
            label: "Exam Code",
        },
    ];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsData.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rowsData, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, rowsData]
    );

    //publish popup start
    const [publishExamPopup, setPublishExamPopup] = React.useState(false);
    const handlePublishExamPopupClick = (item) => {
        setPublishExamPopup(!publishExamPopup);
        setSelectedExam(item);
    };
    //publish popup end

    //publish popup start
    const [shareExamPopup, setShareExamPopup] = React.useState(false);
    const handleShareExamPopupClick = () => {
        setShareExamPopup(!shareExamPopup);
    };
    //publish popup end

    // handle delete exam start
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
                router.delete(route('online_exam.delete_exam', id), {
                    onSuccess: () => {
                        router.post(route('online_exam.exam_list'), data);
                    },
                    onError: () => {
                        router.post(route('online_exam.exam_list'), data);
                    }
                });
            }
        });
    }
    // handle delete exam end

    return (
        <>
            <div className="educare-common-mat-list w-full mt-4">
                <div sx={{ width: "100%" }}>
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
                                                        <div
                                                            component="span"
                                                            sx={visuallyHidden}
                                                        >
                                                            {/* {order === "desc"
                                                                ? "sorted descending"
                                                                : "sorted ascending"} */}
                                                        </div>
                                                    ) : null}
                                                </TableSortLabel>
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(
                                            row?.id
                                        );
                                        const labelId = `enhanced-table-checkdiv-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(event, row?.id)
                                                }
                                                role="checkdiv"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row?.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <TableCell id={labelId}>
                                                    {row.exam_title}
                                                    <p className="text-[14px]">Created By: {row?.created_by}</p>
                                                    {
                                                        row.is_published ? (<span className='badge success'>Published</span>) :
                                                            (<span className='badge danger'>Not Published</span>)
                                                    }
                                                </TableCell>
                                                <TableCell>{row?.subject_title}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        {row?.exam_time}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {row?.full_pass_mark}
                                                </TableCell>
                                                <TableCell>
                                                    {row?.exam_code}
                                                </TableCell>
                                                <TableCell>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Publish Exam"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-success-btn-sm-fill"
                                                                    onClick={() => {
                                                                        handlePublishExamPopupClick(row)
                                                                    }}
                                                                >
                                                                    <i className="icon-SpeakerHigh"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Share Exam"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button type="button"
                                                                    className="educare-dark-btn-sm-fill"
                                                                    onClick={handleShareExamPopupClick}
                                                                >
                                                                    <i className="icon-ShareNetwork"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>

                                                        {row?.is_published == false &&
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <Link
                                                                        href={route('online_exam.create_exam', {id: row?.id})}
                                                                        className="educare-warning-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                        }

                                                        <div>
                                                            <Tooltip
                                                                title="Details & Download"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    className="educare-tertiary-btn-sm-fill"
                                                                    href={route('online_exam.exam_details', row?.id)}
                                                                >
                                                                    <i className="icon-eye"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>

                                                        {row?.is_published == false &&
                                                            <div>
                                                                <Tooltip
                                                                    title="Delete"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => {
                                                                            handleDelete(row?.id)
                                                                        }}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        }
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height:
                                                    (dense ? 33 : 53) *
                                                    emptyRows,
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
                            count={rowsData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
            <PublishExamPopup
                publishExamPopup={publishExamPopup}
                setPublishExamPopup={setPublishExamPopup}
                selectedExam={selectedExam}
                setSelectedExam={setSelectedExam}
                formData={data}
            />
            <ShareExamPopup
                shareExamPopup={shareExamPopup}
                setShareExamPopup={setShareExamPopup}
            />
        </>
    );
}

