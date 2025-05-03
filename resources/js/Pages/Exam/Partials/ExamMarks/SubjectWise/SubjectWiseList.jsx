import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import SelectInput2 from "@/Components/SelectInput2";
import TextInput from "@/Components/TextInput";
import ToggleCheckboxInput from "@/Components/ToggleCheckboxInput";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";

import Box from "@mui/material/Box";
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
import { useState } from "react";


const SubjectWiseList = ({
    classWiseData = [],
    classroomId = null,
    apsenceReson,
    data,
    setData,
    errors,
    post,
    reset,
    processing,
    formFields,
    setFormFields,
    fullMinMark,
    grade,
    is_co_scholastic,
    isMarkFreezed
}) => {

    // old code start

    useEffect(() => {
        setFormFields(
            classWiseData?.sort(customSort)?.map((item) => ({
                student_id: item?.id,
                roll_no: item?.roll_no ?? null,
                admission_no: item?.admission_no,
                student_name: `${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`,
                father_name: `${item?.fatherFirstName ?? ""} ${item?.fatherMiddleName ?? ""} ${item?.fatherLastName ?? ""}`,
                mark: Number.isNaN(parseFloat(item?.mark?.mark)) ? "" : parseFloat(item?.mark?.mark),
                is_present: item?.mark?.is_present ?? true,
                absence_reason: item?.mark?.absence_reason,
                academic_grade_item_id: item?.mark?.academic_grade_item_id,
            }))
        );
    }, [classWiseData]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_mark_array: formFields,
        }));
    }, [formFields]);

    const handleFormChange = (event, id, field) => {
        const updatedFields = [...formFields];

        const index = updatedFields.findIndex((item) => item.student_id == id);

        let value = event.target.value;

        if (field === "mark") {
            // value = value > 100 ? 100 : Number.isNaN(parseFloat(value)) ? "" : parseFloat(value).toFixed(1);
            if (value != "" && !Number.isNaN(parseFloat(value))) {
                value = value > 100 ? 100 : formatNumber(value);

                if (fullMinMark?.full_mark && value > fullMinMark?.full_mark) {
                    value = fullMinMark?.full_mark;
                }
            } else {
                value = "";
            }
        }

        if (field === "is_present") {
            if (!event.target.checked) {
                updatedFields[index]["mark"] = "";
                updatedFields[index]["academic_grade_item_id"] = null;
            }
            value = event.target.checked;
        }
        updatedFields[index][field] = value;
        setFormFields(updatedFields);
    };

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (num <= 0 && num?.length > 0) {
            newNum = 0;
        }
        else if (num > 0 && !isNaN(num) && !Number.isInteger(parseFloat(num))) {
            // newNum = parseFloat(num).toFixed(2);
            newNum = num;
        }

        if (newNum > 0 && (newNum.split('.')[1] == '0' || parseInt(newNum.split('.')[1]?.slice(0, 1)) <= 0 || isNaN(newNum.split('.')[1]) || newNum.split('.')[1] <= 0)) {
            newNum = parseInt(newNum.split('.')[0]);
        }else if (newNum > 0) {
            newNum = newNum.split('.')[0] + '.' + newNum.split('.')[1]?.slice(0, 2);
        }

        return newNum;
    }
    // format number end


    // old code start
    // const handleFormChange = (event, index, field) => {
    //     const updatedFields = [...formFields];
    //     let value = event.target.value;
    //     if (field === "mark") {
    //         value = value > 100 ? 100 : Number.isNaN(parseFloat(value)) ? "" : parseFloat(value);

    //         if (fullMinMark?.full_mark && value > fullMinMark?.full_mark) {
    //             value = fullMinMark?.full_mark;
    //         }
    //     }

    //     if (field === "is_present") {
    //         if (!event.target.checked) {
    //             updatedFields[index]["mark"] = "";
    //             updatedFields[index]["academic_grade_item_id"] = null;
    //         }
    //         value = event.target.checked;
    //     }
    //     updatedFields[index][field] = value;
    //     setFormFields(updatedFields);
    // };
    // old code end

    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if roll_no is not null for both a and b
        if ((a.roll_no != "" && a.roll_no != null)  && (b.roll_no != "" && b.roll_no != null)) {
            return a.roll_no - b.roll_no;
        }
        else if (a.roll_no == "" || a.roll_no == null) {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the start of the sorted array
        }
    }
    // sort students by classroom roll end

    // old code end

    // material table start
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const rowsData = classWiseData?.sort(customSort)?.map((item) => ({
            student_id: item?.id,
            roll_no: item?.roll_no ?? null,
            admission_no: item?.admission_no,
            name: `${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`,
            father_name: `${item?.fatherFirstName ?? ""} ${item?.fatherMiddleName ?? ""} ${item?.fatherLastName ?? ""}`,
            mark: Number.isNaN(parseFloat(item?.mark?.mark)) ? "" : parseFloat(item?.mark?.mark),
            is_present: item?.mark?.is_present ?? true,
            absence_reason: item?.mark?.absence_reason,
            academic_grade_item_id: item?.mark?.academic_grade_item_id,
        }))

        setRows(rowsData.map((item) =>
            createData(item?.student_id, item.roll_no, item.admission_no, item.father_name, item?.name, item.mark, item.is_present, item?.absence_reason, item?.academic_grade_item_id)
        ));
    }, [classWiseData]);

    function createData(student_id, roll_no, admission_no, father_name, student_name, mark, is_present, absence_reason, academic_grade_item_id) {
        return {
            student_id,
            roll_no,
            admission_no,
            father_name,
            student_name,
            mark,
            is_present,
            absence_reason,
            academic_grade_item_id
        };
    }

    function descendingComparator(a, b, orderBy) {
        if (orderBy == "roll_no") {
            if ((a[orderBy] != "" && a[orderBy] != null) && (b[orderBy] != "" && b[orderBy] != null)) {
                return b[orderBy] - a[orderBy];
            }
            else if (b[orderBy] == "" || b[orderBy] == null) {
                return -1;
            } else {
                return 1;
            }
        }
        else {
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }

            return 0;
        }
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
            id: "roll_no",
            numeric: true,
            disablePadding: false,
            label: "Roll",
            sortable: true
        },
        {
            id: "admission_no",
            numeric: false,
            disablePadding: false,
            label: "Adm No.",
            sortable: true
        },
        {
            id: "father_name",
            numeric: false,
            disablePadding: false,
            label: "Father Name",
            sortable: true
        },
        {
            id: "student_name",
            numeric: false,
            disablePadding: false,
            label: "Student Name",
            sortable: true
        },
        {
            id: "marks",
            numeric: true,
            disablePadding: false,
            label: "Marks",
            sortable: false
        },
        {
            id: "attendance",
            numeric: true,
            disablePadding: false,
            label: "Attendance",
            sortable: false
        },
        {
            id: "reason",
            numeric: false,
            disablePadding: false,
            label: "Reason",
            sortable: false
        },
    ];

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("roll_no");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);

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

    const visibleRows = React.useMemo(() =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),[rows, order, orderBy, page, rowsPerPage]);


    // useEffect(() => {
    //     setFormFields(visibleRows);
    // }, [visibleRows]);

    useEffect(() => {
        setFormFields(rows);
    }, [rows]);

    // material table end
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
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
                                                        disabled={!headCell?.sortable}
                                                    >
                                                        {headCell.label}
                                                        {headCell?.sortable && orderBy === headCell.id ? (
                                                            <Box component="span" sx={visuallyHidden}>
                                                                {order === "desc" ? "sorted descending" : "sorted ascending"}
                                                            </Box>
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
                                                <TableCell>{row.roll_no}</TableCell>
                                                <TableCell>{row.admission_no}</TableCell>
                                                <TableCell>{row.father_name}</TableCell>
                                                <TableCell>{row.student_name}</TableCell>
                                                <TableCell>
                                                    {is_co_scholastic ? (
                                                        <>
                                                            <td>
                                                                <div className="educare-input-field-styles">
                                                                    <SelectInput2
                                                                        data_label="select"
                                                                        data={
                                                                            grade?.academic_grade_items
                                                                        }
                                                                        selectedData={
                                                                            row?.academic_grade_item_id
                                                                        }
                                                                        disabled={
                                                                            !row?.is_present
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleFormChange(
                                                                                e,
                                                                                row?.student_id,
                                                                                "academic_grade_item_id"
                                                                            )
                                                                        }
                                                                        className="block "
                                                                    />
                                                                </div>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <td>
                                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="mark"
                                                                        value={
                                                                            row?.mark
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleFormChange(
                                                                                e,
                                                                                row?.student_id,
                                                                                "mark"
                                                                            );
                                                                        }}
                                                                        disabled={
                                                                            !row?.is_present
                                                                        }
                                                                        className="block"
                                                                        type="number"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.mark
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="educare-toggle-checkbox-button-styles">
                                                        <ToggleCheckboxInput
                                                            id={`is_present_${index}`}
                                                            name={`is_present_${index}`}
                                                            checked={
                                                                row?.is_present
                                                            }
                                                            onChange={(e) => {
                                                                handleFormChange(
                                                                    e,
                                                                    row?.student_id,
                                                                    "is_present"
                                                                );
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`is_present_${index}`}
                                                        >
                                                            <div>
                                                                <Tooltip
                                                                    title="Promoted"
                                                                    placement="top"
                                                                    arrow
                                                                    as="button"
                                                                >
                                                                    <span className="on">
                                                                        P
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Absence"
                                                                    placement="top"
                                                                    arrow
                                                                    as="button"
                                                                >
                                                                    <span className="off">
                                                                        A
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {row?.is_present ==
                                                        false && (
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    data_label="Reason"
                                                                    data={
                                                                        apsenceReson
                                                                    }
                                                                    value={
                                                                        row?.absence_reason
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleFormChange(
                                                                            e,
                                                                            row?.student_id,
                                                                            "absence_reason"
                                                                        )
                                                                    }
                                                                    className="block "
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.absence_reason
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        )}
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
                                rowsPerPageOptions={[50, 100, 250]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                            {visibleRows?.length > 0 && isMarkFreezed == false ? (
                                <div className="flex items-center gap-2.5 justify-end mt-2.5">
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Save Marks
                                    </PrimaryButton>
                                </div>
                            ) : (
                                ""
                            )}

                            {/* do not remove this code */}
                            {/* ormal table */}
                            {/* <table>
                                <thead>
                                    <tr>
                                        <th>Roll</th>
                                        <th>Adm No.</th>
                                        <th>Father Name</th>
                                        <th>Student Name</th>
                                        <th>
                                            {" "}
                                            {is_co_scholastic
                                                ? "Grade"
                                                : "Marks"}{" "}
                                        </th>
                                        <th>Attendance</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formFields?.length > 0 ? (
                                        formFields?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.roll_no}</td>
                                                <td>{item.admission_no}</td>
                                                <td>{item?.father_name}</td>
                                                <td>{item?.student_name}</td>
                                                {is_co_scholastic ? (
                                                    <>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput2
                                                                    data_label="select"
                                                                    data={
                                                                        grade?.academic_grade_items
                                                                    }
                                                                    selectedData={
                                                                        item?.academic_grade_item_id
                                                                    }
                                                                    disabled={
                                                                        !item?.is_present
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleFormChange(
                                                                            e,
                                                                            index,
                                                                            "academic_grade_item_id"
                                                                        )
                                                                    }
                                                                    className="block "
                                                                />
                                                            </div>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td>
                                                        <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="mark"
                                                                    value={
                                                                        item?.mark
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleFormChange(
                                                                            e,
                                                                            index,
                                                                            "mark"
                                                                        );
                                                                    }}
                                                                    disabled={
                                                                        !item?.is_present
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.mark
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                )}
                                                <td>
                                                    <div className="educare-toggle-checkbox-button-styles">
                                                        <ToggleCheckboxInput
                                                            id={`is_present_${index}`}
                                                            name={`is_present_${index}`}
                                                            checked={
                                                                item?.is_present
                                                            }
                                                            onChange={(e) => {
                                                                handleFormChange(
                                                                    e,
                                                                    index,
                                                                    "is_present"
                                                                );
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`is_present_${index}`}
                                                        >
                                                            <div>
                                                                <Tooltip
                                                                    title="Promoted"
                                                                    placement="top"
                                                                    arrow
                                                                    as="button"
                                                                >
                                                                    <span className="on">
                                                                        P
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Absence"
                                                                    placement="top"
                                                                    arrow
                                                                    as="button"
                                                                >
                                                                    <span className="off">
                                                                        A
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item?.is_present ==
                                                        false && (
                                                        <div className="educare-input-field-styles">
                                                            <SelectInput
                                                                data_label="Reason"
                                                                data={
                                                                    apsenceReson
                                                                }
                                                                value={
                                                                    item?.absence_reason
                                                                }
                                                                onChange={(e) =>
                                                                    handleFormChange(
                                                                        e,
                                                                        index,
                                                                        "absence_reason"
                                                                    )
                                                                }
                                                                className="block "
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.absence_reason
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="7"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table> */}

                            {/* {classWiseData?.length > 0 ? (
                                <div className="flex items-center gap-2.5 justify-end mt-2.5">
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Save Marks
                                    </PrimaryButton>
                                </div>
                            ) : (
                                ""
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubjectWiseList;
