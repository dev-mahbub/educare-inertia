import Dropdown from "@/Components/Dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";
import moment from "moment";
import { useState } from "react";
import ClassMonitorPopup from "./Popup/ClassMonitorPopup";
import ViewStudentPopup from "./Popup/ViewStudentPopup";
import { Inertia } from "@inertiajs/inertia";

const ClassList = ({ classrooms, students, students2 }) => {
    const [assignMonitorPopup, setAssignMonitorPopup] = useState(false);
    const [viewStudentPopup, setViewStudentPopup] = useState(false);
    const [stds, setStds] = useState([]);
    const [modalStudents, setModalStudents] = useState([]);
    const [classMonitorId, setClassMonitorId] = useState("");
    const [classRoomId, setClassRoomId] = useState([]);
    const handleModalFollowUpClick = (item) => {
        setAssignMonitorPopup(!assignMonitorPopup);
        // get students from classroom id - item.id
        setStds(students2[item.id]);
        setClassRoomId(item.id);
        setClassMonitorId(item.class_monitor_id);
        // router.get(route('classroom.assign_class_monitor', id));
        // Inertia.get(`/class/assign-class?id=${id}`);
    };
    const handleViewStudentClick = (item) => {
        // get students from classroom id - item.id
        setModalStudents(students[item.id]);
        setViewStudentPopup(!viewStudentPopup);
        setClassMonitorId(item.class_monitor_id);
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
                router.delete(route("classroom.time_table_destroy", id));
            }
        });
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
                                        <th>Sl.No</th>
                                        <th>Class name</th>
                                        <th>Class Teacher</th>
                                        <th>Class Monitor</th>
                                        <th>Total Students</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classrooms?.length ? (
                                        classrooms?.map((item, index) => (
                                            <tr key={item?.id}>
                                                <td>{++index}</td>
                                                <td>{item.title}</td>
                                                <td>
                                                    {item.teacher_first_name}{" "}
                                                    {item.teacher_middle_name}{" "}
                                                    {item.teacher_last_name}
                                                </td>
                                                <td>
                                                    {item.student_first_name}{" "}
                                                    {item.student_middle_name}{" "}
                                                    {item.student_last_name}
                                                </td>
                                                <td>{item?.studentCount + item?.promoStudentCount}</td>
                                                <td>
                                                    <div className="flex flex-wrap gap-1">
                                                        <div className="assign-students-icon-wrap">
                                                            <Tooltip
                                                                title="Students"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-secondary-btn-md-fill"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handleViewStudentClick(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="icon-UsersThree"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        <div className="class-new-here">
                                                            <Tooltip
                                                                title="Assign Roll No"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href={route(
                                                                        "classroom.assign_roll",
                                                                        item.id
                                                                    )}
                                                                    className="educare-success-btn-md-stroke inline-block"
                                                                >
                                                                    Assign Roll
                                                                    No
                                                                </Link>
                                                            </Tooltip>
                                                        </div>

                                                        <div className="class-new-here">
                                                            <Tooltip
                                                                title="Assign Subject Teacher"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href={route(
                                                                        "subject.assign_teacher",
                                                                        item.id
                                                                    )}
                                                                    className="educare-primary-btn-md-stroke inline-block"
                                                                >
                                                                    Assign
                                                                    Subject
                                                                    Teacher
                                                                </Link>
                                                            </Tooltip>
                                                        </div>

                                                        <div className="class-new-here">
                                                            <Tooltip
                                                                title="Assign Class Monitor"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-warning-btn-md-stroke inline-block"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handleModalFollowUpClick(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    Assign Class
                                                                    Monitor
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="8"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ClassMonitorPopup
                classMonitorId={classMonitorId}
                assignMonitorPopup={assignMonitorPopup}
                setAssignMonitorPopup={setAssignMonitorPopup}
                students={stds}
                classRoomId={classRoomId}
            />
            <ViewStudentPopup
                viewStudentPopup={viewStudentPopup}
                setViewStudentPopup={setViewStudentPopup}
                students={modalStudents}
            />
        </>
    );
};

export default ClassList;
