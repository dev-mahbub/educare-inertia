import ToggleCheckboxInput from '@/Components/ToggleCheckboxInput';
import { concatName } from "@/Hooks/GlobalFunction";
import { router, useForm } from "@inertiajs/react";
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
import { useEffect } from "react";
import Swal from "sweetalert2";


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
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "Title",
    },
    {
        id: "class_title",
        numeric: false,
        disablePadding: false,
        label: "Class",
    },
    {
        id: "subject_title",
        numeric: false,
        disablePadding: false,
        label: "Subject",
    },
    {
        id: "asset_type",
        numeric: false,
        disablePadding: false,
        label: "Type",
    },
    {
        id: "topic_title",
        numeric: false,
        disablePadding: false,
        label: "Topic",
    },
    {
        id: "is_publish",
        numeric: true,
        disablePadding: false,
        label: "Publish",
    },
];

export default function AssetList({
    examAssets,
    formData
}) {

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("question");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        setRows(examAssets.map((item) =>
            createData(
                item.id,
                item.title,
                item?.class_name?.title,
                item?.subject?.title,
                item?.asset_type,
                item?.online_topic?.title,
                item.is_publish,
                concatName(item?.user?.first_name, item?.user?.middle_name, item?.user?.last_name)
            )
        ));
    }, [examAssets]);


    function createData(id, title, class_title, subject_title, asset_type, topic_title, is_publish, created_by) {
        return {
            id,
            title,
            class_title,
            subject_title,
            asset_type,
            topic_title,
            is_publish,
            created_by
        };
    }

    //set rowdata in useform
    const {
        data,
        setData,
        errors,
        post,
        get,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        id: '',
    });

    //handle toggle publish asset start
    const handleTogglePublishAsset = (id) => {
        const form_data = {
            is_publish: rows?.find(item => item?.id == id)?.is_publish == true ? false : true
        }

        router.patch(route('online_exam.update_asset_publish_status', id), form_data, {
            onSuccess: () => {
                router.post(route('online_exam.asset_list'), formData);
            },
            onError: () => {
                router.post(route('online_exam.asset_list'), formData);
            }
        });
    };
    //handle toggle publish asset end

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, rows]
    );

    // handle post edit
    const handleEditSubmit = (e, value) => {
        setData((prevData) => ({
            ...prevData,
            id: value
        }));

        const form_data = {
            id: value
        }

        router.post(route('online_exam.edit_asset'), form_data);
    }
    // handle post edit

    // handle delete
    const handleRowDelete = (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('online_exam.delete_asset', id), {
                    onSuccess: () => {
                        //setEditableIds([]);
                        router.get(route('oneline_exam.asset_list'));
                    }
                });
            }
        });
    }
    // handle delete

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
                                            row.id
                                        );
                                        const labelId = `enhanced-table-checkdiv-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(event, row.id)
                                                }
                                                role="checkdiv"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <TableCell id={labelId}>
                                                    {row?.title}
                                                    {row?.created_by &&
                                                        <p className="text-[14px]">Created By: {row?.created_by}</p>
                                                    }
                                                </TableCell>
                                                <TableCell>{row?.class_title}</TableCell>
                                                <TableCell>
                                                    {row?.subject_title}
                                                </TableCell>
                                                <TableCell>
                                                    {row?.asset_type}
                                                </TableCell>
                                                <TableCell>
                                                    {row?.topic_title}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="educare-toggle-checkbox-button-styles">
                                                        <ToggleCheckboxInput
                                                            id={`toggle_${row.id}`}
                                                            name={`toggle_${row.id}`}
                                                            checked={row?.is_publish}
                                                            onChange={() => handleTogglePublishAsset(row.id)}
                                                        />
                                                        <label htmlFor={`toggle_${row.id}`}>
                                                            <span className={row.is_publish ? 'on' : 'off'}>
                                                                {row.is_publish ? 'Yes' : 'No'}
                                                            </span>
                                                        </label>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip title="Edit" placement="top" arrow>
                                                                <button onClick={(e) => handleEditSubmit(e, row.id)}
                                                                type="button"
                                                                className="educare-warning-btn-sm-fill">
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
                                                                    className="educare-danger-btn-sm-fill"
                                                                    type="button"
                                                                    onClick={(e) => handleRowDelete(e, row?.id)}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
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

