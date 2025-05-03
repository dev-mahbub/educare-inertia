import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from "@/Components/SelectInput";
import { concatName } from '@/Hooks/GlobalFunction';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
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

export default function AdmitCardCertificatePopup({
    admitCardPopupOpen,
    setAdmitCardPopupOpen,
    classrooms = [],
    studentNames = [],
    students = [],
    feeTypes = [],
    feeTitles = [],
    classroomWthExam = [],
    certificateId
}) {
    const [studentData, setStudentData] = useState([]);
    const [examData, setExamData] = useState('');

    const {
        data,
        setData,
    } = useForm({
        classroom_id: "",
        student_list: "class_wise",
        is_admit_card_without_due: false,
        selected_student: [],
        from_installment_id: "",
        to_installment_id: "",
        exam_id: "",
        digital_sign: false,
    });

    const handleClassroom = (classroomId) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
            selected_student: [],
        }));
        setStudentData(students?.filter((item) => item?.classroom_id == classroomId));
        setExamData(classroomWthExam?.filter((item) => item?.classroom_id == classroomId));
    }

    const closeModal = () => {
        setAdmitCardPopupOpen(false);
    };

    const handleSelectedStudent = (id) => {
        const isSelected = data.selected_student.some((student) => student.student_id === id);
        const updatedSelectedStudents = isSelected
            ? data.selected_student.filter((student) => student.student_id !== id)
            : [...data.selected_student, { student_id: id }];

        setData('selected_student', updatedSelectedStudents);
    }

    // old
    // const encodedData = encodeURIComponent(JSON.stringify(data));

    const handleData = () => {
        // new
        const studentIds = data?.selected_student?.map((item) => item?.student_id);

        const form_data = {
            certificate_id: certificateId,
            classroom_id: data?.classroom_id ?? "",
            student_list: data?.student_list ?? "class_wise",
            is_admit_card_without_due: data?.is_admit_card_without_due ?? false,
            student_ids: JSON.stringify(studentIds),
            from_installment_id: data?.from_installment_id ?? "",
            to_installment_id: data?.to_installment_id ?? "",
            exam_id: data?.exam_id ?? "",
            digital_sign: data?.digital_sign ?? false
        }

        window.open(route('admit_card_certificate_generator', form_data), '_blank');

        // old
        // window.open(route('admit_card_certificate_generator', { data: encodedData }), '_blank');
    }

    // handle select all student start
    const handleSelectAllStudent = (value) => {
        const selectedStudents = value ? studentData?.map(student => ({student_id: student?.id})) : [];

        setData('selected_student', selectedStudents);
    }
    // handle select all student end


    // material table start

    const [rows, setRows] = useState([]);

    React.useEffect(() => {
        setRows(studentData.map((item) =>
            createData(item?.id, item.admission_no, item.roll_no, concatName(item?.first_name, item?.middle_name, item?.last_name))
        ));
    }, [studentData]);


    function createData(id, admNo, rollNo, studentName) {
        return { id, admNo, rollNo, studentName };
    }

    function descendingComparator(a, b, orderBy) {
        if (orderBy == "rollNo") {
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
            id: "admNo",
            numeric: false,
            disablePadding: false,
            label: "Adm No.",
        },
        {
            id: "rollNo",
            numeric: true,
            disablePadding: false,
            label: "Roll No",
        },
        {
            id: "studentName",
            numeric: false,
            disablePadding: false,
            label: "Student Name",
        }
    ];
    /* End table dynamic */

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("rollNo");
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

    // material table end

    return (
        <form onSubmit={handleData}>
            <div className='educare-admission-follow-up-area space-y-6'>
                <Modal show={admitCardPopupOpen} onClose={closeModal} className="educare-xl-width-modal">
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Generate Admit Card Certificate</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-5">
                                        <div className="educare-create-school-settings-list-check min-width-full flex">
                                            <div className="educare-radio-field-styles flex gap-3 mb-3">
                                                <RadioInput
                                                    name="student_list"
                                                    value="Class wise"
                                                    checked={data.student_list === "class_wise"}
                                                    onChange={() => {
                                                        setData((prev) => ({
                                                            ...data,
                                                            "student_list": "class_wise",
                                                            "selected_student": [],
                                                        }));
                                                    }}
                                                />
                                                <RadioInput
                                                    name="student_list"
                                                    value="Individual"
                                                    checked={data.student_list === "individual"}
                                                    onChange={() => {
                                                        setData((prev) => ({
                                                            ...data,
                                                            "student_list": "individual",
                                                            "selected_student": [],
                                                        }));
                                                    }}
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document mb-3 ml-3">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="digital_sign"
                                                        name="digital_sign"
                                                        checked={
                                                            data.digital_sign
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "digital_sign",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="digital_sign"
                                                        value="Digital Sign."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) => handleClassroom(e.target.value)}
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="exam_id"
                                                data_label="test"
                                                data={examData}
                                                value={data?.exam_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "exam_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="flex">
                                            <PrimaryButton type="button" className="educare-primary-btn-md-fill" onClick={handleData}>
                                                {/* <a target="_blank" rel="noopener noreferrer" href={{ route('admit_card_certificate_generator', ['data' => encodedData]) }}> */}
                                                Generate
                                                {/* </a> */}
                                            </PrimaryButton>
                                            <SecondaryButton type="button" className="ml-3" onClick={closeModal}>
                                                Cancel
                                            </SecondaryButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-7">
                                        <div className="educare-create-school-settings-list-check min-width-full">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="is_admit_card_without_due"
                                                        name="is_admit_card_without_due"
                                                        checked={
                                                            data.is_admit_card_without_due
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "is_admit_card_without_due",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="is_admit_card_without_due"
                                                        value="Print Admit Card for Selected Installments (No Dues Student)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {data?.is_admit_card_without_due &&
                                        <div className="col-span-5">
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="from_installment_id"
                                                                    value="From Installments"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="from_installment_id"
                                                            data_label="installment"
                                                            data={feeTitles}
                                                            value={data?.from_installment_id}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "from_installment_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="to_installment_id"
                                                                    value="To Installments"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="to_installment_id"
                                                            data_label="to installment"
                                                            data={feeTitles}
                                                            value={data?.to_installment_id}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "to_installment_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {data?.student_list === 'individual' && <div className="educare-classroom-form-area">
                                <div className="educare-classroom-table-wrapper">
                                    <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                        <div className="educare-common-mat-list w-full">
                                            <div sx={{ width: "100%" }}>
                                                <div sx={{ width: "100%", mb: 2 }}>
                                                    <TableContainer>
                                                        <Table aria-labelledby="tableTitle">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                                <Checkbox
                                                                                    id={`select_all_student`}
                                                                                    name="select_all_student"
                                                                                    onChange={(e) => handleSelectAllStudent(e.target.checked)}
                                                                                    checked={data?.selected_student?.length > 0 && data?.selected_student?.length == studentData?.length}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </TableCell>
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
                                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                                    <Checkbox
                                                                                        id={`student_${index}`}
                                                                                        name="student_name"
                                                                                        onChange={(e) => handleSelectedStudent(row?.id)}
                                                                                        checked={data?.selected_student?.map((student) => student?.student_id)?.includes(row?.id)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell>{row.admNo}</TableCell>
                                                                        <TableCell>{row.rollNo}</TableCell>
                                                                        <TableCell>{row.studentName}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                                {emptyRows > 0 && (
                                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                                        <TableCell colSpan={15} />
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
                            </div>}
                            {/* old code backup */}
                            {/* {data?.student_list === 'individual' && <div className="educare-classroom-form-area">
                                <div className="educare-classroom-table-wrapper">
                                    <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`select_all_student`}
                                                                    name="select_all_student"
                                                                    onChange={(e) => handleSelectAllStudent(e.target.checked)}
                                                                    checked={data?.selected_student?.length > 0 && data?.selected_student?.length == studentData?.length}
                                                                />
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th>Adm No.</th>
                                                    <th>Roll No</th>
                                                    <th>Student Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentData?.length ?
                                                    studentData?.map((item, index) => (
                                                        <tr key={item?.id}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id={`student_${index}`}
                                                                            name="student_name"
                                                                            onChange={(e) => handleSelectedStudent(item?.id)}
                                                                            checked={data?.selected_student?.map((student) => student?.student_id)?.includes(item?.id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{item?.admission_no}</td>
                                                            <td>{item?.roll_no}</td>
                                                            <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                        </tr>
                                                    )) :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>} */}
                        </div>
                    </div>
                </Modal>
            </div>
        </form>
    );
}
