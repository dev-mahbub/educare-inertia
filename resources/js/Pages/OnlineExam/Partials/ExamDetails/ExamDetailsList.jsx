import { Link } from "@inertiajs/react";
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


export default function ExamDetailsList({
    virtualExam
}) {

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(virtualExam?.virtual_questions?.map((item) =>
            createData(item.id, item.question, item.question_type, parseInt(item?.mark ?? 0), item?.class_name?.title, item?.subject?.title, item.difficulty_level, item.display_order)
        ));
    }, [virtualExam]);

    function createData(id, question, question_type, mark, class_title, subject_title, difficulty_level, display_order) {
        return {
            id,
            question,
            question_type,
            mark,
            class_title,
            subject_title,
            difficulty_level,
            display_order
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
        return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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
            id: "question",
            numeric: false,
            disablePadding: true,
            label: "Question",
        },
        {
            id: "question_type",
            numeric: true,
            disablePadding: false,
            label: "Question Type",
        },
        {
            id: "mark",
            numeric: true,
            disablePadding: false,
            label: "Mark",
        },
        {
            id: "class",
            numeric: true,
            disablePadding: false,
            label: "Class",
        },
        {
            id: "subject",
            numeric: true,
            disablePadding: false,
            label: "Subject",
        },
        {
            id: "difficulty",
            numeric: true,
            disablePadding: false,
            label: "difficulty",
        },
        {
            id: "order",
            numeric: true,
            disablePadding: false,
            label: "Order",
        },
        {
            id: "action",
            numeric: true,
            disablePadding: false,
            label: "Action",
        },
    ];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, rows]
    );

    return (
        <>
            <div className="educare-common-mat-list w-full mt-[20px]">
                <div sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer>
                            <Table aria-labelledby="tableTitle">
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((headCell) => (
                                            <TableCell
                                                key={headCell.id}
                                                align={headCell.numeric ? "left" : "left"}
                                                padding={headCell.disablePadding ? "none" : "normal"}
                                                sortDirection={orderBy === headCell.id ? order : false}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === headCell.id}
                                                    direction={orderBy === headCell.id ? order : "asc"}
                                                    onClick={(event) => handleRequestSort(event, headCell.id)}
                                                >
                                                    {headCell.label}
                                                    {orderBy === headCell.id ? (
                                                        <div component="span" sx={visuallyHidden}>
                                                            {/* {order === "desc" ? "sorted descending" : "sorted ascending"} */}
                                                        </div>
                                                    ) : null}
                                                </TableSortLabel>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {visibleRows.map((row, index) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            sx={{ cursor: "pointer" }}
                                        >
                                            <TableCell>
                                                <span
                                                    dangerouslySetInnerHTML={{ __html: row.question ?? ''}}
                                                >

                                                </span>
                                            </TableCell>
                                            <TableCell>{row.question_type}</TableCell>
                                            <TableCell>{row.mark}</TableCell>
                                            <TableCell>{row.class_title}</TableCell>
                                            <TableCell>{row.subject_title}</TableCell>
                                            <TableCell>{row.difficulty_level}</TableCell>
                                            <TableCell>{row.display_order}</TableCell>
                                            <TableCell>
                                                <Link
                                                    href={route('online_exam.edit_question', row?.id)}
                                                >
                                                    details
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={5} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        </>
    );
}
