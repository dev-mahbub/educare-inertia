import ToggleCheckboxInput from '@/Components/ToggleCheckboxInput';
import { Link } from "@inertiajs/react";
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

export default function AssignQuestionList({
    selectedQuestions,
    setSelectedQuestions,
    virtualQuestions,
    searchText
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
                item?.class_name?.title + '/' + item?.subject?.title,
                item.difficulty_level,
                item.is_assigned
            )
        ));
    }, [virtualQuestions]);

    function createData(id, question, question_type, mark, class_subject, difficulty_level, is_assigned) {
        return {
            id,
            question,
            question_type,
            mark,
            class_subject,
            difficulty_level,
            is_assigned
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
        }
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
            )?.filter(item => {
                const filterText = searchText?.trim()?.toLowerCase();
                const question = item?.question?.toLowerCase();
                const questionType = item?.question_type?.toLowerCase();
                const mark = String(item?.mark)?.toLowerCase();
                const classSubject = item?.class_subject?.toLowerCase();
                const difficultyLevel = item?.difficulty_level?.toLowerCase();

                return (
                    (question && question?.includes(filterText)) ||
                    (questionType && questionType?.includes(filterText)) ||
                    (difficultyLevel && difficultyLevel?.includes(filterText)) ||
                    (mark && mark?.includes(filterText)) ||
                    (classSubject && classSubject?.includes(filterText)) ||
                    (difficultyLevel && difficultyLevel?.includes(filterText))
                );
            })?.map((row) => {
                const selected_question = selectedQuestions?.find(item => row.id == item.id);

                if (selected_question?.id != null) {
                    row['is_assigned'] = true;
                } else {
                    row['is_assigned'] = false;
                }

                return row;
            }),
        [order, orderBy, page, rowsPerPage, rowsData, searchText, selectedQuestions]
    );

    //handle assign question start
    const handleAssignQuestion = (index, id) => {
        const selected_question = visibleRows?.find(item => item?.id == id);

        const isAssigned = !selected_question?.is_assigned;

        let updatedSelectedQuestions;
        if (isAssigned) {
            selected_question['display_order'] = 0;

            updatedSelectedQuestions = [...selectedQuestions, selected_question];
        } else {
            updatedSelectedQuestions = selectedQuestions.filter(item => item.id != id);
        }

        setSelectedQuestions(updatedSelectedQuestions);

        visibleRows[index]['is_assigned'] = isAssigned;
    };
    //handle assign question end

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
                                        <TableCell>
                                            Assign
                                        </TableCell>
                                        <TableCell>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {visibleRows.map((row, index) => {
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
                                                    {row.question}
                                                </TableCell>
                                                <TableCell>{row.questionType}</TableCell>
                                                <TableCell>
                                                    {row.mark}
                                                </TableCell>
                                                <TableCell>
                                                    {row.grade}
                                                </TableCell>
                                                <TableCell>
                                                    {row.difficulty}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="educare-toggle-checkbox-button-styles">
                                                        <ToggleCheckboxInput
                                                            id={`toggle_${row.id}`}
                                                            name={`toggle_${row.id}`}
                                                            checked={row.publish || false}
                                                            onChange={() => handleToggleChange(row.id)}
                                                        />
                                                        <label htmlFor={`toggle_${row.id}`}>
                                                            <span className={row.publish ? 'on' : 'off'}>
                                                                {row.publish ? 'Yes' : 'No'}
                                                            </span>
                                                        </label>
                                                    </div>
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
                                                                    href="#"
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
                                                                <button type="button"
                                                                    className="educare-tertiary-btn-sm-fill"
                                                                >
                                                                    <i className="icon-eye"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })} */}
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
                                                            checked={row?.is_assigned ?? false}
                                                            onChange={() => handleAssignQuestion(index, row.id)}
                                                        />
                                                        <label htmlFor={`toggle_${row.id}`}>
                                                            <span className={row.is_assigned ? 'on' : 'off'}>
                                                                {row.is_assigned ? 'Yes' : 'No'}
                                                            </span>
                                                        </label>
                                                    </div>
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

