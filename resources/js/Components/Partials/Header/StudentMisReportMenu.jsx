import React from 'react';
import { Link } from '@inertiajs/react';

const StudentMisReportMenu = ({title}) => {
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
                        <div className="educare-mis-report-category-wrap">
                            <ul>
                                <li>
                                    <Link
                                        href="#"
                                    >
                                        Online Exam
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        Classroom
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentMisReportMenu;
