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
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";

const rowsData = [
    {
        id: 1,
        name: "kola",
        calories: "11",
        fat: "21",
        carbs: "jam1",
        protein: "dab1",
    },
    {
        id: 2,
        name: "Donut",
        calories: "12",
        fat: "22",
        carbs: "jam2",
        protein: "dab2",
    },
    {
        id: 3,
        name: "Peyara",
        calories: "13",
        fat: "23",
        carbs: "jam3",
        protein: "dab3",
    },
    {
        id: 4,
        name: "dab",
        calories: "14",
        fat: "24",
        carbs: "jam4",
        protein: "dab4",
    },
    {
        id: 5,
        name: "jam",
        calories: "15",
        fat: "25",
        carbs: "jam5",
        protein: "dab5",
    },
    {
        id: 6,
        name: "tal",
        calories: "16",
        fat: "26",
        carbs: "jam6",
        protein: "dab6",
    },
    {
        id: 7,
        name: "banana",
        calories: "17",
        fat: "27",
        carbs: "jam7",
        protein: "dab7",
    },
];
const rows = rowsData.map((item) =>
    createData(
        item.id,
        item.name,
        item.calories,
        item.fat,
        item.carbs,
        item.protein
    )
);

function createData(id, name, calories, fat, carbs, protein) {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
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
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Dessert (100g serving)",
    },
    {
        id: "calories",
        numeric: true,
        disablePadding: false,
        label: "Calories",
    },
    {
        id: "fat",
        numeric: true,
        disablePadding: false,
        label: "Fat (g)",
    },
    {
        id: "carbs",
        numeric: true,
        disablePadding: false,
        label: "Carbs (g)",
    },
    {
        id: "protein",
        numeric: true,
        disablePadding: false,
        label: "Protein (g)",
    },
];

export default function MaterialTable() {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <>
            <div className="educare-card-title mt-5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Material Table With Sorting & Checkbox
                </h5>
            </div>
            <div className="educare-common-mat-list w-full">
                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer>
                            <Table aria-labelledby="tableTitle">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                indeterminate={
                                                    selected.length > 0 &&
                                                    selected.length <
                                                        rows.length
                                                }
                                                checked={
                                                    rows.length > 0 &&
                                                    selected.length ===
                                                        rows.length
                                                }
                                                onChange={handleSelectAllClick}
                                                inputProps={{
                                                    "aria-label":
                                                        "select all desserts",
                                                }}
                                            />
                                        </TableCell>
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
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            "aria-labelledby":
                                                                labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell id={labelId}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.calories}
                                                </TableCell>
                                                <TableCell>{row.fat}</TableCell>
                                                <TableCell>
                                                    {row.carbs}
                                                </TableCell>
                                                <TableCell>
                                                    {row.protein}
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
                </Box>
            </div>
        </>
    );
}
