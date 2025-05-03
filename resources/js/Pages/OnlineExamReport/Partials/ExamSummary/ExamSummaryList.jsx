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
import { useEffect } from "react";

function createData(id, exam_title, exam_code, start_time, class_subject, total_participated, total_not_participated) {
    return {
        id,
        exam_title,
        exam_code,
        start_time,
        class_subject,
        total_participated,
        total_not_participated,
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
        id: "exam_code",
        numeric: true,
        disablePadding: false,
        label: "Exam Code",
    },
    {
        id: "start_time",
        numeric: true,
        disablePadding: false,
        label: "Start Time",
    },
    {
        id: "class_subject",
        numeric: true,
        disablePadding: false,
        label: "Class Subject",
    },
    {
        id: "participated",
        numeric: true,
        disablePadding: false,
        label: "Participated",
    },
    {
        id: "not_participated",
        numeric: true,
        disablePadding: false,
        label: "Not Participated",
    },
];

export default function ExamSummaryList({
    virtualExams
}) {

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        setRows(virtualExams.map((item) =>
            createData(
                item?.id,
                item?.title,
                item?.exam_code,
                item?.start_date+" "+item?.start_time,
                item?.class_name?.title+"/"+item?.subject?.title,
                item?.total_participated ?? 'need to work',
                item?.total_not_participated ?? 'need to work',
            )
        ));
    }, [virtualExams]);

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

    return (
        <>

            <div className="educare-common-mat-list w-full">
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(
                                            row.id
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(event, row.id)
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <TableCell id={labelId}>
                                                    {row.exam_title}
                                                </TableCell>
                                                <TableCell>
                                                    {row.exam_code}
                                                </TableCell>
                                                <TableCell>{row.start_time}</TableCell>
                                                <TableCell>
                                                    {row.class_subject}
                                                </TableCell>
                                                <TableCell>
                                                    {row.total_participated}
                                                </TableCell>
                                                <TableCell>
                                                    {row.total_not_participated}
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
                            count={rows.length}
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
