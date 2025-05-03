import { Link } from '@inertiajs/react';
import React from 'react';

const UpdateStudentMenu = ({title}) => {
    return (
        <div className='educare-mis-report-menu-area bg-white'>
            <div className="educare-mis-report-menu flex-wrap">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className='icon-cap'></i>
                        <h4>{title}</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className="educare-mis-report-category-wrap">
                            <ul>
                                <li>
                                    <Link href={route('import.student_create')}>Import Student</Link>
                                </li>
                                <li>
                                    <Link href={route('import.student_update')}>Update Student</Link>
                                </li>
                                <li>
                                    <Link href={route('import.staff_create')}>Import Teacher</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStudentMenu;