import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';

const SchoolShiftMenu = ({title}) => {
    return (
        <div className='educare-mis-report-menu-area bg-white'>
            <div className="educare-mis-report-menu flex-wrap">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className="icon-calender"></i>
                        <h4>{title}</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className='educare-mis-report-category-wrap'>
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
                                            <Dropdown.Link href={route('school_shift.list')}>
                                                Create Shift
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('school_period.create')}
                                            >
                                                Create School Period
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('classroom_period.create')}
                                            >
                                                Create Class Period
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Link  href={route('timetable.create')}>Create Timetable</Link>
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
                                            <Dropdown.Link href={route('timetable.classroom_timetable')}>
                                                View Class Time Table
                                            </Dropdown.Link>
                                            {/* <Dropdown.Link href={route('teacher.view_class_timetable')}>
                                                View Class Time Table
                                            </Dropdown.Link> */}
                                            <Dropdown.Link
                                                href={route('timetable.teacher_timetable')}
                                            >
                                                View Teacher Time Table
                                            </Dropdown.Link>
                                            {/* <Dropdown.Link
                                                href={route('teacher.view_teacher_timetable')}
                                            >
                                                View Teacher Time Table
                                            </Dropdown.Link> */}

                                            {/* do not remove */}
                                            {/* <Dropdown.Link
                                                href={route('timetable.teacher_allocation')}
                                            >
                                                Allocation Report
                                            </Dropdown.Link> */}
                                            <Dropdown.Link
                                                href={route('timetable.vacant_teacher')}
                                            >
                                                Vacant Teachers
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Link href={route('timetable.allotment')}>Today Allotment</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolShiftMenu;
