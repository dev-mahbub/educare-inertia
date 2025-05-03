import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import { concatName } from "@/Hooks/GlobalFunction";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

// import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
// import { visuallyHidden } from "@mui/utils";
import * as React from "react";

export default function ExamAttendanceForm({
    students = [],
    classrooms = [],
    exams = [],
}) {
    const [filteredExams, setFilteredExams] = useState([]);
    const [formFields, setFormFields] = useState({});
    const [loading, setLoading] = useState(false);

    const { data, setData, errors, post, reset, processing } = useForm({
        classroom_id: "",
        exam_id: "",
        examAttendance_array: formFields,
        present_day: "",
        working_day: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            examAttendance_array: formFields,
        }));
    }, [formFields]);

    useEffect(() => {
        setFormFields(
            students?.sort(customSort)?.map((item) => ({
                student_id: item.student_id,
                present_day: item.present_day && parseFloat(item.present_day),
                working_day: item.working_day && parseFloat(item.working_day),
                roll_no: item.roll_no,
                admission_no: item.admission_no,
                student_name: concatName(
                    item?.first_name,
                    item?.middle_name,
                    item?.last_name
                ),
            }))
        );
    }, [students]);

    // Handle Classroom Changes
    const handleClassroomChange = (id) => {
        setFilteredExams(
            exams?.filter(
                (item) =>
                    item?.classrooms?.find((item) => item?.id == id)?.id == id
            )
        );
        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            exam_id: "",
        }));
    };

    const handleExamChange = (exam_id) => {
        setData((prevData) => ({
            ...prevData,
            exam_id: exam_id,
        }));
        const form_data = {
            exam_id: exam_id,
            classroom_id: data.classroom_id,
        };
        router.post(route("exam_attendance.list"), form_data);
        setLoading(false);
    };

    const handleFormChange = (id, value, field) => {
        const updatedFields = [...formFields];
        const index = updatedFields.findIndex((item) => item.student_id == id);
        updatedFields[index][field] = value;
        setFormFields(updatedFields);
    };

    // const handleCopy = (field, value) => {
    //     const updatedFields = formFields.map((item) => ({
    //         ...item,
    //         [field]: value,
    //     }));
    //     setFormFields(updatedFields);
    // };

    const handlesetFormFields = (e) => {
        e.preventDefault();
        post(route("exam_attendance.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleReset = (e) => {
        e.preventDefault();
        setFormFields([]);
        reset();
    };

    useEffect(() => {
        setLoading(false);
    }, [students]);

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

    const handleCopy = (field, value) => {
        const updatedRows = rows.map((item) => ({
            ...item,
            [field]: value,
        }));

        setRows(updatedRows);
    };

    useEffect(() => {
        const rowsData = students?.sort(customSort)?.map(item => ({
            student_id: item.student_id,
            present_day: item.present_day && parseFloat(item.present_day),
            working_day: item.working_day && parseFloat(item.working_day),
            roll_no: item.roll_no,
            admission_no: item.admission_no,
            student_name: concatName(
                item?.first_name,
                item?.middle_name,
                item?.last_name
            )
        }));

        setRows(rowsData.map((item) =>
            createData(item?.student_id, item?.roll_no, item?.admission_no, item?.student_name, item?.present_day, item?.working_day)
        ));
    }, [students]);

    function createData(student_id, roll_no, admission_no, student_name, present_day, working_day) {
        return {
            student_id,
            roll_no,
            admission_no,
            student_name,
            present_day,
            working_day
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
            id: "present_day",
            numeric: true,
            disablePadding: false,
            label: "Present Day",
            sortable: false
        },
        {
            id: "working_day",
            numeric: true,
            disablePadding: false,
            label: "Working Day",
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
        setFormFields(rows);
    }, [rows]);

    // material table end

    return (
        <>
            <div className="educare-classroom-form-area">
                <form onSubmit={handlesetFormFields}>
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-3 col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Filter
                                        </h5>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="classroom_id"
                                                                value="Class"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={classrooms}
                                                        value={
                                                            data.classroom_id
                                                        }
                                                        onChange={(e) =>
                                                            handleClassroomChange(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.classroom_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="exam_id"
                                                                value="Exam"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Exam"
                                                        data={filteredExams}
                                                        value={data.exam_id}
                                                        onChange={(e) =>
                                                            handleExamChange(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={errors.exam_id}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {students.length > 0 ? (
                                                <div className="col-span-12">
                                                    <div className="flex flex-wrap gap-2.5 mt-2">
                                                        <PrimaryButton
                                                            className="educare-gray-btn-lg-stroke"
                                                            type="button"
                                                            disabled={
                                                                processing
                                                            }
                                                            onClick={(e) =>
                                                                handleReset(e)
                                                            }
                                                        >
                                                            Reset
                                                        </PrimaryButton>

                                                        <PrimaryButton
                                                            className="educare-primary-btn-lg-fill"
                                                            type="submit"
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            Save
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-9 col-span-12">
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Exam Attendance
                                        </h5>
                                    </div>
                                    <div className="educare-default-table xs:overflow-x-auto">
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
                                                                        // <Box component="span" sx={visuallyHidden}>
                                                                        //     {order === "desc" ? "sorted descending" : "sorted ascending"}
                                                                        // </Box>
                                                                        ""
                                                                    ) : null}
                                                                </TableSortLabel>
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {visibleRows?.length > 0 ? (
                                                        <TableRow>
                                                            <TableCell></TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell>
                                                                <div className="inline-flex">
                                                                    <div className="educare-input-field-styles-px-8 max-w-[60px]">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    data.present_day
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "present_day",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                className="block"
                                                                                type="number"
                                                                            />
                                                                            <InputError
                                                                                message={
                                                                                    errors.present_day
                                                                                }
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <SuccessButton
                                                                            disabled={
                                                                                processing
                                                                            }
                                                                            type="button"
                                                                            className="educare-secondary-btn-md-fill"
                                                                            onClick={() => {
                                                                                handleCopy(
                                                                                    "present_day",
                                                                                    data.present_day
                                                                                );
                                                                            }}
                                                                        >
                                                                            C
                                                                        </SuccessButton>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="inline-flex">
                                                                    <div className="educare-input-field-styles-px-8 max-w-[60px]">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    data.working_day
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "working_day",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                className="block"
                                                                                type="number"
                                                                            />
                                                                            <InputError
                                                                                message={
                                                                                    errors.working_day
                                                                                }
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <SuccessButton
                                                                            disabled={
                                                                                processing
                                                                            }
                                                                            type="button"
                                                                            className="educare-secondary-btn-md-fill"
                                                                            onClick={() => {
                                                                                handleCopy(
                                                                                    "working_day",
                                                                                    data.working_day
                                                                                );
                                                                            }}
                                                                        >
                                                                            C
                                                                        </SuccessButton>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        ""
                                                    )}

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
                                                                <div className="educare-input-field-styles-px-8 max-w-[120px]">
                                                                    <div className="educare-input-field-styles">
                                                                        <TextInput
                                                                            value={
                                                                                row.present_day
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleFormChange(
                                                                                    row.student_id, e.target.value, "present_day"
                                                                                )
                                                                            }
                                                                            className="block"
                                                                            type="number"
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors.present_day
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="educare-input-field-styles-px-8 max-w-[120px]">
                                                                    <div className="educare-input-field-styles">
                                                                        <TextInput
                                                                            value={
                                                                                row.working_day
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleFormChange(
                                                                                    row.student_id, e.target.value, "working_day"
                                                                                )
                                                                            }
                                                                            className="block"
                                                                            type="number"
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors.working_day
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>
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
                    </div>
                </form>
            </div>
        </>
    );
}
