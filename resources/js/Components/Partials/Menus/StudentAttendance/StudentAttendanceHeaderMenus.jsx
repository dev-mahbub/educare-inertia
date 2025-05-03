import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import StudentAttendanceMobileNavs from './StudentAttendanceMobileNavs'

const StudentAttendanceHeaderMenus = ({ title }) => {

    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }

    return (
        <>
            <div className='educare-mis-report-menu-area bg-white'>
                <div className="educare-mis-report-menu">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className='icon-cap'></i>
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap  hidden sm:inline-block">
                                <ul>
                                    <li>
                                        <Link href={route('classroom_attendance.take_attendance')}>Take Attendance</Link>
                                    </li>
                                    <li>
                                        <Link href={route('classroom_attendance_report.today_attendance')}>Today Attendance</Link>
                                    </li>
                                    <li>
                                        <Link href={route('classroom_attendance_report.register_view')}>Register View</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Reports
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('classroom_attendance_report.absent_report')}>
                                                    Absent Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('classroom_attendance_report.sendsms_present_students')}>
                                                    Send SMS To All Present Students
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('classroom_attendance_report.month_report')}>
                                                    Month Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('classroom_attendance_report.back_date_report')}>
                                                    Back Date Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('classroom_attendance_report.studentwise_attendance')}>
                                                    Student Wise Attendance
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('classroom_attendance_report.datewiseclass_attendance_report')}>
                                                    Date Wise Class Attendance Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('classroom_attendance_report.classwisedaily_attendance_report')}>
                                                    Class Wise Daily Attendance Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Set Working and Bonus days
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('classroom_attendance.set_class_working')}>
                                                    Set class working and bonus day
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('classroom_attendance.set_section_working')}>
                                                    Set Section working and bonus day
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('classroom_attendance.set_student_working')}>
                                                    Set Student working and bonus day
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </div>
                            {/* Mobile Navs Activation Start */}
                            <div className="educare-sidebar-navs-btn sm:hidden inline-block">
                                <button type='button' onClick={toggleMobileNavsShow}>Menus <i className='icon-CaretDown'></i></button>
                            </div>
                            {/* Mobile Navs Activation End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Navs Component Start */}
            <StudentAttendanceMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default StudentAttendanceHeaderMenus;
