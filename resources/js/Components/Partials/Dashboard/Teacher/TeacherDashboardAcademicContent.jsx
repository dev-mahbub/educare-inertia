import React from "react";
import academicLeft from "../../../../../images/teacherDashboard/academic-left.svg";
import classRoom from "../../../../../images/teacherDashboard/classrom.svg";
import homework from "../../../../../images/teacherDashboard/homework.svg";
import classwork from "../../../../../images/teacherDashboard/classwork.svg";
import lessonPlan from "../../../../../images/teacherDashboard/lessonPlan.svg";
import syllabus from "../../../../../images/teacherDashboard/syllabus.svg";
import studentAttendance from "../../../../../images/teacherDashboard/student-attandance.png";
import leaveManagement from "../../../../../images/teacherDashboard/leave-management.png";
import ccReport from "../../../../../images/teacherDashboard/cce-report.png";
import salary from "../../../../../images/teacherDashboard/salary.png";
import transport from "../../../../../images/teacherDashboard/transport.png";
import helpdesk from "../../../../../images/teacherDashboard/helpdesk.svg";
import exam from "../../../../../images/teacherDashboard/exam.svg";
import timeTable from "../../../../../images/category/time-table.png";
import student from "../../../../../images/category/online-class.png";
import myTimeTable from "../../../../../images/category/class-work.png";
import whatsappIcon from "../../../../../images/category/teacher/social.png"
import ticketIcon from "../../../../../images/category/teacher/support-ticket.png"
import articleIcon from "../../../../../images/category/teacher/article.png"
import montageIcon from "../../../../../images/category/teacher/montage.png"
import errorIcon from "../../../../../images/category/teacher/browser.png"
import feedbackIcon from "../../../../../images/category/teacher/feedback.png"

import { Link } from "@inertiajs/react";
const TeacherDashboardAcademicContent = () => {
    return (
        <>
            <div className="academic-wrapper">
                <div className="teacher-academic-content">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-4 max3Xl:col-span-6 maxMd:col-span-12">
                            <div className="customer-support">
                                <Link href="#">
                                    <div className="customer-support-imgable">
                                        <img src={student} alt="Student" />
                                    </div>
                                    <div className="customer-support-text">
                                        <h4 className="support_title !mt-0">Students</h4>
                                        <p><strong>55</strong></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-4 max3Xl:col-span-6 maxMd:col-span-12">
                            <div className="customer-support">
                                <Link href="#">
                                    <div className="customer-support-imgable">
                                        <img src={myTimeTable} alt="Student Attendance" />
                                    </div>
                                    <div className="customer-support-text">
                                        <h4 className="support_title !mt-0">Student Attendance</h4>
                                        <p><strong>55</strong></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-4 max3Xl:col-span-6 maxMd:col-span-12">
                            <div className="customer-support">
                                <Link href="#">
                                    <div className="customer-support-imgable">
                                        <img src={timeTable} alt="My Time Table" />
                                    </div>
                                    <div className="customer-support-text">
                                        <h4 className="support_title !mt-0">My Time Table</h4>
                                        <p><strong>55</strong></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="assesment-wrapper mt-10 hidden">
                <div className="teacher-academic-heading">
                    <h2>
                        <label className="label label-for_title">
                            Assessment
                        </label>
                    </h2>
                </div>
                <div className="educare-parent-montly-income-area">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                            <div className="assesment-content">
                                <div className="assesment-content-img">
                                    <img src={exam} alt="Exam Icon" />
                                </div>
                                <div className="assesment-content-text">
                                    <h3>Online Exam and Assessment</h3>
                                    <p>
                                        Prepare students for something BIG. Analyze
                                        performance and help them to improve.
                                    </p>
                                    <ul className="assesment-list">
                                        <li>
                                            <Link href="/onlineexam">
                                                Go to Online Exam
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/assessments">
                                                Go to offline assessment
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                            <div className="assesment-content">
                                <div className="assesment-content-img">
                                    <img src={exam} alt="Exam Icon" />
                                </div>
                                <div className="assesment-content-text">
                                    <h3>Manage Academic Exams</h3>
                                    <p>
                                        Enter Marks, Find student performance report
                                        and attendance analysis.
                                    </p>
                                    <ul className="assesment-list">
                                        <li>
                                            <Link href="/academics/entermarks">
                                                Enter Marks
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/academics/report/subject">
                                                Subject Report
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/academics/attendance">
                                                Exam Attendance
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Manage your class students === */}

            <div className="assesment-wrapper mt-10 hidden">
                <div className="teacher-academic-heading">
                    <h2>
                        <label className="label label-for_title">
                            Manage your class students
                        </label>
                    </h2>
                </div>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-3 lg:col-span-6">
                        <div className="manage-box">
                            <Link href="#">
                                <h4>Student Attendance</h4>
                                <p>Take Attendance</p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-3 lg:col-span-6">
                        <div className="manage-box">
                            <Link href="#">
                                <h4>Roll Number</h4>
                                <p>Manage roll number of students</p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-3 lg:col-span-6">
                        <div className="manage-box">
                            <Link href="#">
                                <h4>Student Profile</h4>
                                <p>Manage profile and notes of student</p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-3 lg:col-span-6">
                        <div className="manage-box">
                            <Link href="#">
                                <h4>Phone Number</h4>
                                <p>Manage number of students</p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-3 lg:col-span-6">
                        <div className="manage-box">
                            <Link href="#">
                                <h4>Student Document</h4>
                                <p>Upload Document</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===My Administrative Details */}

            <div className="assesment-wrapper mt-10">
                <div className="teacher-academic-heading">
                    <h2>
                        <label className="label label-for_title">
                            Your Details
                        </label>
                    </h2>
                </div>

                <div className="administrative-detail grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-4 lg:col-span-4">
                        <div className="administrative-content">
                            <Link href={route('leave.manage_leave_request')}>
                                <img
                                    src={leaveManagement}
                                    alt="Leave Management"
                                />
                                <button type="button" className="transition cursor-pointer ease-in-out duration-150 hover:cursor-auto educare-secondary-btn-md-stroke">
                                    My Leave
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-4 lg:col-span-4">
                        <div className="administrative-content">
                            <Link href={route('leave.request')}>
                                <img src={leaveManagement} alt="Apply Leave" />
                                <button type="button" className="transition cursor-pointer ease-in-out duration-150 hover:cursor-auto educare-secondary-btn-md-stroke">
                                    Apply Leave
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-4 lg:col-span-4">
                        <div className="administrative-content">
                            <Link href={route('leave_report.staff_wise_attendance')}>
                                <img
                                    src={studentAttendance}
                                    alt="Attendance Report"
                                />
                                <button type="button" className="transition cursor-pointer ease-in-out duration-150 hover:cursor-auto educare-secondary-btn-md-stroke">
                                    Attendance Report
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-4 lg:col-span-4">
                        <div className="administrative-content">
                            <Link href={route('leave_report.extra_day')}>
                                <img src={ccReport} alt="Extra Day Report" />
                                <button type="button" className="transition cursor-pointer ease-in-out duration-150 hover:cursor-auto educare-secondary-btn-md-stroke">
                                    Extra Day Report
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-4 lg:col-span-4">
                        <div className="administrative-content">
                            <Link href={route('transport_report.teacher_transport_report')}>
                                <img src={transport} alt="Transport Details" />
                                <button type="button" className="transition cursor-pointer ease-in-out duration-150 hover:cursor-auto educare-secondary-btn-md-stroke">
                                    Transport Details
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-4 lg:col-span-4">
                        <div className="administrative-content">
                            <Link href="#">
                                <img src={salary} alt="Salary Slip Details" />
                                <button type="button" className="transition cursor-pointer ease-in-out duration-150 hover:cursor-auto educare-secondary-btn-md-stroke">
                                    Salary Slip details
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Customer Support */}

            <div className="assesment-wrapper mt-10">
                <div className="teacher-academic-heading">
                    <h2>
                        <label className="label label-for_title">
                            Customer Support
                        </label>
                    </h2>
                </div>
                <div className="administrative-detail administrative-detail-teacher grid grid-cols-12 gap-5">
                    <div className="col-span-2 max3Xl:col-span-4 maxMd:col-span-12"> 
                        <Link href="#">
                            <div className="educare-academic-category-item">
                                <div className="educare-academic-category-icon">
                                    <img src={whatsappIcon} alt="Leave Management" />
                                </div>
                                <div className="educare-academic-category-content text-center">
                                    <h5 className="title">WhatsApp Chat</h5>
                                    <p>(Instant Response)</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-span-2 max3Xl:col-span-4 maxMd:col-span-12">
                        <Link href="#">
                            <div className="educare-academic-category-item">
                                <div className="educare-academic-category-icon">
                                    <img src={ticketIcon} alt="Leave Management" />
                                </div>
                                <div className="educare-academic-category-content text-center">
                                    <h5 className="title">Ticket System</h5>
                                    <p>(Within 24 hours Response)</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-span-2 max3Xl:col-span-4 maxMd:col-span-12">
                        <Link href="#">
                            <div className="educare-academic-category-item">
                                <div className="educare-academic-category-icon">
                                    <img src={articleIcon} alt="Leave Management" />
                                </div>
                                <div className="educare-academic-category-content text-center">
                                    <h5 className="title">All Modules Articles</h5>
                                    <p>(Step by step)</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-span-2 max3Xl:col-span-4 maxMd:col-span-12">
                        <Link href="#">
                            <div className="educare-academic-category-item">
                                <div className="educare-academic-category-icon">
                                    <img src={montageIcon} alt="Leave Management" />
                                </div>
                                <div className="educare-academic-category-content text-center">
                                    <h5 className="title">All Modules Videos</h5>
                                    <p>(Step by step)</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-span-2 max3Xl:col-span-4 maxMd:col-span-12">
                        <Link href="#">
                            <div className="educare-academic-category-item">
                                <div className="educare-academic-category-icon">
                                    <img src={errorIcon} alt="Leave Management" />
                                </div>
                                <div className="educare-academic-category-content text-center">
                                    <h5 className="title">Errors Report</h5>
                                    <p>(Solve within 24 hours)</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-span-2 max3Xl:col-span-4 maxMd:col-span-12">
                        <Link href="#">
                            <div className="educare-academic-category-item">
                                <div className="educare-academic-category-icon">
                                    <img src={feedbackIcon} alt="Leave Management" />
                                </div>
                                <div className="educare-academic-category-content text-center">
                                    <h5 className="title">Feedback/Suggestion</h5>
                                    <p>&nbsp;</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default TeacherDashboardAcademicContent;
