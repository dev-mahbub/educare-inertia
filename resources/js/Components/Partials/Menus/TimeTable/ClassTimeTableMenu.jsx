import { Link } from '@inertiajs/react';

const ClassTimeTableMenu = () => {
    return (
        <div className='bg-white'>
            <div className='educare-mis-report-menu-area'>
                <div className="educare-mis-report-menu">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className='icon-cap'></i>
                            <h4>Time Table</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap">
                                <ul>
                                    <li>
                                        {/* <Link href={route('teacher.view_class_timetable')}>View Class Time Table</Link> */}
                                        <Link href={route('timetable.classroom_timetable')}>View Class Time Table</Link>
                                    </li>
                                    <li>
                                        <Link href={route('timetable.teacher_timetable')}>View Teacher Time Table</Link>
                                        {/* <Link href={route('teacher.view_teacher_timetable')}>View Teacher Time Table</Link> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassTimeTableMenu;

