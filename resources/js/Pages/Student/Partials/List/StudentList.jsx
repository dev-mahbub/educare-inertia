import Dropdown from "@/Components/Dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import { concatName } from "@/Hooks/GlobalFunction";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import studentImg from "../../../../../images/user/user-1.png";
import StudentListNotesPopup from "./StudentListNotesPopup";
import StudentListUpdatePopup from "./StudentListUpdatePopup";

import Box from "@mui/material/Box";
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


function createData(id, sl_no, student_name, admission_no, roll_no, className, dob, father, father_mobile, sms_no, student_status, student_image, student_notes, mother) {
    return {
        id, sl_no, student_name, admission_no, roll_no, className, dob, father, father_mobile, sms_no, student_status, student_image, student_notes, mother
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
        id: "sl_no",
        numeric: true,
        disablePadding: true,
        label: "Sl. No",
    },
    {
        id: "student_name",
        numeric: true,
        disablePadding: false,
        label: "Student Name",
    },
    {
        id: "admission_no",
        numeric: false,
        disablePadding: false,
        label: "Adm No.",
    },
    {
        id: "roll_no",
        numeric: true,
        disablePadding: false,
        label: "Roll No.",
    },
    {
        id: "className",
        numeric: true,
        disablePadding: false,
        label: "Class",
    },
    {
        id: "dob",
        numeric: true,
        disablePadding: false,
        label: "dob",
    },
    {
        id: "father",
        numeric: true,
        disablePadding: false,
        label: "Father",
    },
    {
        id: "father_mobile",
        numeric: true,
        disablePadding: false,
        label: "Father Mobile",
    },
    {
        id: "sms_no",
        numeric: true,
        disablePadding: false,
        label: "SMS No",
    },
];


const StudentList = ({
    students,
    loading,
    setLoading,
    data,
    setData,
    studentData,
    setStudentData,
    contextStatus
}) => {
    const [admNoModalUpdateOpen, setAdmNoModalUpdateOpen] = useState(false);
    const [admNoModalData, setAdmNoModalData] = useState(false);
    const [modalNotesOpen, setModalNotesOpen] = useState(false);
    const [modelNotesData, setModelNotesData] = useState(false);
    const [studentId, setStudentId] = useState(null);

    const handleAdmNoModalPopup = (id, student_name, admission_no) => {
        setAdmNoModalData({ id, student_name, admission_no });
        setAdmNoModalUpdateOpen(!admNoModalUpdateOpen);
    };

    const handleModalNotesClick = (
        student_id,
        student,
        father,
        mother,
        phone,
        student_notes
    ) => {
        setStudentId(student_id);
        setModelNotesData({
            student_id,
            student,
            father,
            mother,
            phone,
            student_notes,
            contextStatus
        });
        setModalNotesOpen(!modalNotesOpen);
    };

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
                router.delete(route("student.destroy", id));
            }
        });
    };

      // material ui table
      const [order, setOrder] = React.useState("asc");
      const [orderBy, setOrderBy] = React.useState("calories");
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(50);

      const rows = studentData?.map((item, index) =>
          createData(
            item.id,
            index + 1,
            concatName(item?.first_name, item?.middle_name, item?.last_name),
            item?.admission_no,
            item?.classroom_roll?.roll_no ? parseInt(item?.classroom_roll?.roll_no) : '',
            item?.promoted_classroom?.id ? item?.promoted_classroom?.title: item?.classTitle,
            item?.birth_date_at ? moment( item?.birth_date_at).format("DD MMM, YYYY") : "",
            concatName(item?.fatherFirstName, item?.fatherMiddleName, item?.fatherLastName),
            item?.fatherPhone,
            item?.smsPhone,
            item?.student_status,
            item?.student_image,
            item?.student_notes,
            concatName(item?.motherFirstName, item?.motherMiddleName, item?.motherLastName)
        )
      );

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

      useEffect(() => {
        if (studentData?.find(item => item?.id == studentId)?.student_notes?.length > modelNotesData?.student_notes?.length) {
            setModelNotesData((prevData) => ({
              ...prevData,
              student_notes: studentData?.find(item => item?.id == studentId)?.student_notes ?? []
            }));
        }
    }, [studentData, studentId]);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <Box sx={{ width: "100%" }}>
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
                                                                    <Box component="span" sx={visuallyHidden}>
                                                                        {/* {order === "desc" ? "sorted descending" : "sorted ascending"} */}
                                                                    </Box>
                                                                ) : null}
                                                            </TableSortLabel>
                                                        </TableCell>
                                                    ))}
                                                    <TableCell>
                                                        Actions
                                                    </TableCell>
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
                                                            {row.sl_no}
                                                            <Tooltip
                                                                title={row?.student_status == 'New' ? "New" : "Promoted"}
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <span
                                                                    className={`ml-3 badge ${row?.student_status == 'New' ? "success" : "dark"}`}
                                                                >
                                                                    {row?.student_status == 'New' ? "N" : "P"}
                                                                </span>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell>
                                                        <div className="educare-student-list-table-user-field">
                                                            <div className="educare-student-list-table-user-img">
                                                                {row ?.student_image ?.path ? (
                                                                    <img
                                                                        src={
                                                                            row
                                                                                ?.student_image
                                                                                ?.path
                                                                        }
                                                                        alt="user not found"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={
                                                                            studentImg
                                                                        }
                                                                        alt="user not found"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="educare-student-list-table-user-name">
                                                                {row.student_name}
                                                            </div>
                                                        </div>
                                                        </TableCell>
                                                        <TableCell>{row.admission_no}</TableCell>
                                                        <TableCell>{row.roll_no}</TableCell>
                                                        <TableCell>{row.className}</TableCell>
                                                        <TableCell>{row.dob}</TableCell>
                                                        <TableCell>{row.father}</TableCell>
                                                        <TableCell>{row.father_mobile}</TableCell>
                                                        <TableCell>{row.sms_no}</TableCell>
                                                        <TableCell>
                                                        <div className="educare-admission-list-action-btn">
                                                                <div className="educare-list-button-field-styles">
                                                                    <Tooltip
                                                                        title="Edit"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <Link
                                                                            href={route(
                                                                                "student.edit",
                                                                                row.id
                                                                            )}
                                                                            className="bg-supportingB/80 inline-block"
                                                                        >
                                                                            <i className="icon-editing"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                                <div className="educare-list-button-field-styles">
                                                                    <Tooltip
                                                                        title="Details"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <a
                                                                            href={route('student.details', row?.id)}
                                                                            target="_blank"
                                                                            className="bg-supportingC/80 inline-block"
                                                                        >
                                                                            <i className="icon-eye text-[20px] font-primary"></i>
                                                                        </a>
                                                                    </Tooltip>
                                                                </div>
                                                                <div className="educare-list-button-field-styles">
                                                                    <PrimaryButton
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                row.id
                                                                            )
                                                                        }
                                                                        className="bg-danger/80 "
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </PrimaryButton>
                                                                </div>
                                                                <div className="educare-list-button-field-styles">
                                                                    <Dropdown>
                                                                        <Dropdown.Trigger>
                                                                            <div
                                                                                type="button"
                                                                                className="educare-dropdown-menu"
                                                                            >
                                                                                <PrimaryButton className="bg-dark/80 inline-block">
                                                                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                </PrimaryButton>
                                                                            </div>
                                                                        </Dropdown.Trigger>
                                                                        <Dropdown.Content>

                                                                            <a
                                                                                target="_blank"
                                                                                href={route(
                                                                                    "student.print_pdf",
                                                                                    row?.id
                                                                                )}
                                                                            >
                                                                                <i className="icon-printer text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                Print
                                                                            </a>

                                                                            <button
                                                                                type="button"
                                                                                onClick={(
                                                                                    e
                                                                                ) =>
                                                                                    handleModalNotesClick(
                                                                                        row.id,
                                                                                        // student
                                                                                        row?.className,
                                                                                        // father
                                                                                        row?.father,
                                                                                        // mother
                                                                                        row?.mother,
                                                                                        row?.father_mobile,
                                                                                        row?.student_notes
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i className="icon-Notebook text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                Notes
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={(
                                                                                    e
                                                                                ) =>
                                                                                    handleAdmNoModalPopup(
                                                                                        row?.id,
                                                                                        concatName(
                                                                                            row?.first_name,
                                                                                            row?.middle_name,
                                                                                            row?.last_name
                                                                                        ),
                                                                                        row?.admission_no
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i className="icon-Notebook text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                Update
                                                                            </button>
                                                                        </Dropdown.Content>
                                                                    </Dropdown>
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
                                        rowsPerPageOptions={[50, 100, 250, 500]}
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
                    </div>
                </div>
            </div>
            <StudentListUpdatePopup
                admNoModalUpdateOpen={admNoModalUpdateOpen}
                setAdmNoModalUpdateOpen={setAdmNoModalUpdateOpen}
                admNoModalData={admNoModalData}
            />
            <StudentListNotesPopup
                modalNotesOpen={modalNotesOpen}
                setModalNotesOpen={setModalNotesOpen}
                modelNotesData={modelNotesData}
                formData={data}
            />
        </>
    );
};

export default StudentList;
