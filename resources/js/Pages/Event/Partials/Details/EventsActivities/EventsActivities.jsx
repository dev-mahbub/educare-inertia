import { Link } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const EventsActivities = ({
    eventData
}) => {

    const createRoute = route('event.activity.create', eventData?.id);

    return (
        <>
            <div className='flex justify-end mb-4 '>
                <Link
                    href={createRoute}
                    className="educare-primary-btn-md-fill"
                >
                    <i className='icon-event'></i> Create Activity For Events
                </Link>
            </div>
            <div>
                {eventData?.event_activities?.length > 0 &&
                    eventData?.event_activities.map((item, index) => (
                        <div key={index} className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className='flex items-center justify-center sm:justify-between gap-5 flex-wrap'>
                                <div className="events-info">
                                    <h2 className='text-[22px] font-semibold text-heading'>{item?.title}</h2>
                                    <p className='text-headingLight'>
                                        <span className='font-semibold'>Duration :    </span>
                                        ( {item?.start_date} to {item?.end_date} )
                                    </p>
                                </div>
                                <div className='sm:inline-block md:flex flex-wrap items-end justify-center gap-2 educare-filter-action-btn'>
                                    <div>
                                        <Tooltip
                                            title="Add Participants for Activity"
                                            placement="top"
                                            arrow
                                        >
                                            <Link
                                                className="educare-secondary-btn-md-fill"
                                                href={route('event.activity.add_participant', { eventId: eventData?.id, activityId: item?.id })}
                                            >
                                                <i className="icon-UsersThree"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip
                                            title="Edit Event Activity"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                className="educare-success-btn-md-fill"
                                                href={route('event.activity.edit', { eventId: eventData?.id, id: item?.id })}
                                            >
                                                <i className="icon-NotePencil"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>

                                    <div>
                                        <Tooltip
                                            title="Edit Event Activity Winner"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                className="educare-primary-btn-md-fill"
                                                href={route('event.activity.add_winner', { eventId: eventData?.id, activityId: item?.id })}
                                            >
                                                <i className="icon-Trophy"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default EventsActivities;
