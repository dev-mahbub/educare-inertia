import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import StudentDetailMobileNavs from './StudentDetailMobileNavs'

const StudentDetailMenus = ({ title }) => {

    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }

    return (
        <>
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
                                        <Link
                                            href="#"
                                        >
                                            Notes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Subject Marks
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Subject Wise Percentage
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Student Fees
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Attendance Report
                                        </Link>
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
            <StudentDetailMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default StudentDetailMenus;

