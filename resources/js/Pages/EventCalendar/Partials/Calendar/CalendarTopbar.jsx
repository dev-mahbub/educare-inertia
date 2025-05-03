import { Link } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const CalendarTopbar = () => {
    const isStudentRoute = window.location.pathname.includes('/student');

    return (
        <>
            <div className='mb-5'>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-calendar"></i>
                            Academic Calendar
                        </h5>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2 flex-wrap">
                        <div>
                            <Tooltip
                                title="Exams"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-primary-btn-md-fill"
                                >
                                    Exams
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Events"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-warning-btn-md-fill"
                                >
                                    Events
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Holidays"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-danger-btn-md-fill"
                                >
                                    Holidays
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="List View"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link href={route(isStudentRoute ? 'student_event_calendar.list' : 'event_calendar.list')} type='button'
                                    className="educare-gray-btn-md-fill"
                                >
                                    <i className="icon-ListBullets"></i>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CalendarTopbar;
