import ToggleCheckboxInput from '@/Components/ToggleCheckboxInput';
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
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

export default function QuestionsList({
    virtualQuestions,
    searchText,
    data
}) {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("question");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        setRowsData(virtualQuestions?.map((item) =>
            createData(
                item.id,
                item.question,
                item.question_type,
                parseInt(item.mark ?? 0),
                item?.class_name?.title+'/'+item?.subject?.title,
                item.difficulty_level,
                item.is_published,
                item.language,
                item.status
            )
        ));
    }, [virtualQuestions]);

    function createData(id, question, question_type, mark, class_subject, difficulty_level, is_published, language, status) {
        return {
            id,
            question,
            question_type,
            mark,
            class_subject,
            difficulty_level,
            is_published,
            language,
            status
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
            id: "question",
            numeric: false,
            disablePadding: true,
            label: "Question",
        },
        {
            id: "question_type",
            numeric: false,
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
            id: "class_subject",
            numeric: false,
            disablePadding: false,
            label: "Grade/Sub",
        },
        {
            id: "difficulty_level",
            numeric: false,
            disablePadding: false,
            label: "Difficulty",
        },
        {
            id: "is_published",
            numeric: true,
            disablePadding: false,
            label: "Publish",
        },
        {
            id: "language",
            numeric: false,
            disablePadding: false,
            label: "Language",
        },
    ];

    //handle publish question start
    const handlePublishQuestion = (id) => {
        const form_data = {
            is_published: rowsData?.find(item => item?.id == id)?.is_published == true ? false : true
        }

        router.patch(route('online_exam.update_question_publish_status', id), form_data, {
            onSuccess: () => {
                router.post(route('online_exam.question_list'), data);
            },
            onError: () => {
                router.post(route('online_exam.question_list'), data);
            }
        });
    };
    //handle publish question end

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
            )?.filter(item => {
                const filterText = searchText?.trim()?.toLowerCase();
                const question = item?.question?.toLowerCase();
                const questionType = item?.question_type?.toLowerCase();
                const mark = String(item?.mark)?.toLowerCase();
                const classSubject = item?.class_subject?.toLowerCase();
                const difficultyLevel = item?.difficulty_level?.toLowerCase();
                const language = item?.language?.toLowerCase();

                return (
                    (question && question?.includes(filterText)) ||
                    (questionType && questionType?.includes(filterText)) ||
                    (difficultyLevel && difficultyLevel?.includes(filterText)) ||
                    (mark && mark?.includes(filterText)) ||
                    (classSubject && classSubject?.includes(filterText)) ||
                    (difficultyLevel && difficultyLevel?.includes(filterText)) ||
                    (language && language?.includes(filterText))
                );
            }),
        [order, orderBy, page, rowsPerPage, rowsData, searchText]
    );

    // handle delete start
    const handleDelete = (id) => {
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
                router.delete(route('online_exam.delete_question', id), {
                    onSuccess: () => {
                        router.post(route('online_exam.question_list'), data);
                    },
                    onError: () => {
                        router.post(route('online_exam.question_list'), data);
                    }
                });
            }
        });
    }
    // handle delete end

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
                                                <TableCell
                                                    id={labelId}
                                                 >
                                                    <span
                                                        dangerouslySetInnerHTML={{ __html: row.question }}
                                                    >

                                                    </span>
                                                    <p className="text-[14px]">Status - {row.status}</p>
                                                </TableCell>
                                                <TableCell>{row.question_type}</TableCell>
                                                <TableCell>
                                                    {row.mark}
                                                </TableCell>
                                                <TableCell>
                                                    {row.class_subject}
                                                </TableCell>
                                                <TableCell>
                                                    {row.difficulty_level}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="educare-toggle-checkbox-button-styles">
                                                        <ToggleCheckboxInput
                                                            id={`toggle_${row.id}`}
                                                            name={`toggle_${row.id}`}
                                                            checked={row.is_published}
                                                            onChange={() => handlePublishQuestion(row.id)}
                                                        />
                                                        <label htmlFor={`toggle_${row.id}`}>
                                                            <span className={row.is_published ? 'on' : 'off'}>
                                                                {row.is_published ? 'Yes' : 'No'}
                                                            </span>
                                                        </label>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {row.language}
                                                </TableCell>
                                                <TableCell>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href={route('online_exam.edit_question', row?.id)}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Preview"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href={route('online_exam.preview_question', row?.id)}
                                                                    className="educare-tertiary-btn-sm-fill"
                                                                >
                                                                    <i className="icon-eye"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
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
        </>
    );
}

