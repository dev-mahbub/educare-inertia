import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
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

const SetExamRemarkList = ({
    remarkForStudent = [],
    examId = null,
    setLoading,
    loading,
    data,
    setData,
    errors,
    post,
    reset,
    processing,
    getFormField,
    setFormField,
}) => {

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            exam_id: examId,
        }));
    }, [examId])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            remarks_array_data: getFormField,
        }))
    }, [getFormField])

    useEffect(() => {
        setFormField(remarkForStudent?.sort(customSort)?.map(item => ({
            remark_id: item.remark_id,
            student_id: item.student_id,
            srn_no: item.roll_no,
            first_name: item.first_name,
            middle_name: item.middle_name,
            last_name: item.last_name,
            admission_no: item.admission_no,
            exam_id: item.exam_id,
            remarks: item.remarks
        })))
        setLoading(false);
    }, [remarkForStudent])

    const handleFormChange = (id, value, field) => {
        const updatedFields = [...getFormField];
        const index = updatedFields.findIndex((item) => item.student_id == id);

        updatedFields[index][field] = value;
        setFormField(updatedFields);
    }

    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.roll_no != "" && b.roll_no != "") {
            return a.roll_no - b.roll_no;
        } else if (a.roll_no == "") {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the start of the sorted array
        }
    }
    // sort students by classroom roll end

    // material table start
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const rowsData = remarkForStudent?.sort(customSort)?.map(item => ({
            remark_id: item.remark_id,
            student_id: item.student_id,
            roll_no: item.roll_no,
            first_name: item.first_name,
            middle_name: item.middle_name,
            last_name: item.last_name,
            admission_no: item.admission_no,
            exam_id: item.exam_id,
            remarks: item.remarks
        }));

        setRows(rowsData.map((item) =>
            createData(item?.remark_id, item?.student_id, item?.exam_id, item?.roll_no, item?.admission_no, item?.first_name+' '+item?.middle_name+' '+item?.last_name, item?.remarks)
        ));
    }, [remarkForStudent]);

    function createData(remark_id, student_id, exam_id, roll_no, admission_no, student_name, remarks) {
        return {
            remark_id,
            student_id,
            exam_id,
            roll_no,
            admission_no,
            student_name,
            remarks
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
            label: "Roll No",
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
            id: "admission_no",
            numeric: false,
            disablePadding: false,
            label: "Adm No.",
            sortable: true
        },
        {
            id: "remarks",
            numeric: true,
            disablePadding: false,
            label: "Remark",
            sortable: false
        },
        {
            id: "action",
            numeric: true,
            disablePadding: false,
            label: "Action",
            sortable: false
        }
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
        ), [rows, order, orderBy, page, rowsPerPage]);

    useEffect(() => {
        setFormField(rows);
    }, [rows]);

    // material table end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
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
                                                <TableCell>{row.student_name}</TableCell>
                                                <TableCell>{row.admission_no}</TableCell>
                                                <TableCell>
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={row?.remarks}
                                                            onChange={(e) =>
                                                                handleFormChange(row?.student_id, e.target.value, 'remarks')
                                                            }
                                                            className="block"
                                                            type="text"
                                                        />
                                                        <InputError
                                                            message={errors.remarks}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <PrimaryButton
                                                        disabled={processing}
                                                        className="educare-primary-btn-md-fill"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </PrimaryButton>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetExamRemarkList;
