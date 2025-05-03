import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import StaffAttendanceMobileNavs from './StaffAttendanceMobileNavs'

const StaffAttendanceHeaderMenus = ({ title }) => {

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
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                                <ul>
                                    <li>
                                        <Link href={route('staff_attendance.take_attendance')}>Take Attendance</Link>
                                    </li>
                                    <li>
                                        <Link href={route('staff_attendance.register_view')}>Register View</Link>
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
                                                <Dropdown.Link href={route('staff_attendance_report.day_wise')}>
                                                    Day Wise Staff Attendance Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('staff_attendance_report.staff_wise')}>
                                                    Staff Wise Attendance Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('staff_attendance_report.month_wise')}>
                                                    Month Wise Attendance Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('staff_attendance_report.extra_day')}>
                                                    Extra Day Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('staff_attendance_report.outdoor')}>
                                                    Outdoor Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('staff_attendance_report.absent')}>
                                                    Staff Absent Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('staff_attendance_report.monthly_work_duration')}>
                                                    Monthly Work Duration Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('staff_attendance.update_biometric_code')}>Update Biometric Code</Link>
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
            <StaffAttendanceMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default StaffAttendanceHeaderMenus;
