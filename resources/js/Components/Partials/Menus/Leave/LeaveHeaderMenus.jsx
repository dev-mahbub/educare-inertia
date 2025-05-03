import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import LeaveMobileNavs from './LeaveMobileNavs';

const LeaveHeaderMenus = ({ title, pendingLeaveCount }) => {
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
                        <div className="educare-mis-report-category fix-height-menu-button">
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                                <ul>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Masters
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('leave.type')}>
                                                    Leave Type
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave.allocation')}>
                                                    Leave Allocation
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave.approvers')}>
                                                    Leave Approvers
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave.staff_leave_setting')}>
                                                    Staff Leave Setting
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave.staff_leave_setting_changes_history')}>
                                                    Staff Leave Setting Changes History
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave.setting')}>
                                                    Leave Setting
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave.setting_changes_history')}>
                                                    Leave Setting Changes History
                                                </Dropdown.Link>

                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('leave.direct')}>Direct Leave</Link>
                                    </li>
                                    <li>
                                        <Link href={route('leave.request')}>Request Leave</Link>
                                    </li>
                                    <li>
                                        {/* <Link href={route('leave.manage_leave_request')}>Manage Leave Request</Link> */}
                                        <Link href={route('leave.manage_leave_request')}>
                                            Manage Leave Request
                                            <span
                                                className='ml-2 badge bg-danger'
                                            >
                                                {pendingLeaveCount}
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('leave.adjust')}>Adjust Leave</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Report
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('leave_report.staff_onleave_today')}>
                                                    Staff OnLeave Today
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.staff_wise')}>
                                                    Staff Wise Leave Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.month_wise')}>
                                                    Month Wise Leave Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.staff_wise_month')}>
                                                    Staff Wise Month Leave Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.type_wise_month')}>
                                                    Leave Type Wise Month Leave Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.staff_wise_summary')}>
                                                    Staff Wise Leave Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.staff_wise_attendance')}>
                                                    Staff Wise Attendance Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.month_wise_attendance')}>
                                                    Month Wise Attendance Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.extra_day')}>
                                                    Extra Day Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.outdoor')}>
                                                    Outdoor Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('leave_report.register_view')}>
                                                    Register View Report
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
            <LeaveMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default LeaveHeaderMenus;
