import { Link } from "@inertiajs/react";
import React, { useState } from "react";

const TeacherReportTitleMenu = ({ title }) => {
     {/* Toggle Mobile Navs function Start */ }
     const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
     const toggleMobileNavsShow = () => {
         setIsMobileNavsShow(!isMobileNavsShow);
     };
     {/* Toggle Mobile Navs function End */ }
    return (
        <div className="educare-mis-report-menu-area">
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className="icon-details text-white"></i>
                        <h4>{title}</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                            <ul>
                                <li>
                                    <Link href={route('teacher_report.class_report')}>Class Report</Link>
                                </li>
                                <li>
                                    <Link href={route('teacher_report.class_summary_report')}>Class Summary Report</Link>
                                </li>
                                <li>
                                    <Link href={route('teacher_report.student_teacher_report')}>Student Teacher Report</Link>
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
    );
};

export default TeacherReportTitleMenu;
