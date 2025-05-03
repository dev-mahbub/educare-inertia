import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import StudentAdmissionEditPopup from "./StudentAdmissionEditPopup";

const InactiveStudentList = ({
    students,
    loading,
    setLoading,
}) => {

    const [studentData, setStudentData] = useState(students);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);

    useEffect(() => {
        setStudentData(students);
        setLoading(false);
    }, [students])

    const handleActive = (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure to make active?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Active!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(route('student.make_active', id));
            }
        });
    }

    // update
    const handleAdmissionPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Roll no</th>
                                        <th>Admission No</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Father Name</th>
                                        <th>Mobile</th>
                                        <th>Inactive Date</th>
                                        <th>Inactive Reason</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {studentData?.length ?
                                            studentData?.map((student, index) => (
                                                <tr key={index}>
                                                    <td>{student?.roll_no}</td>
                                                    <td>{student?.admission_no}</td>
                                                    <td>{student?.student_name}</td>
                                                    <td>{student?.classroom_title}</td>
                                                    <td>{student?.father_name}</td>
                                                    <td>{student?.father_phone}</td>
                                                    <td>{student?.inactive_date != null ? moment(student?.inactive_date).format("DD MMM, YYYY") : ""}</td>
                                                    <td>{student?.inactive_reason}</td>
                                                    <td>
                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                            <div>
                                                                <Tooltip
                                                                    title="Make Active"
                                                                    placement="top"
                                                                    arrow
                                                                    as="button"
                                                                >
                                                                    <button
                                                                        type='button'
                                                                        onClick={(e) => handleActive(e, student.id)}
                                                                        className="educare-danger-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-warning"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <PrimaryButton
                                                                    onClick={(e) => handleAdmissionPopup(student)}
                                                                    type="button"
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Print Student Details"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <a
                                                                        target="_blank"
                                                                        href={route('pdf_student.inacticve_student_details', student?.id)}
                                                                        className="educare-tertiary-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-printer"></i>
                                                                    </a>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <StudentAdmissionEditPopup
                editPopupOpen={editPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                editData={editData} />
        </>
    );
};

export default InactiveStudentList;
