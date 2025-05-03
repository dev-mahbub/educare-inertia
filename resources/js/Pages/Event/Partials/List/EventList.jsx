import Dropdown from '@/Components/Dropdown';
import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';

const InputElements = ({
    events
}) => {
    const dummyData = (e) => {
        e.preventDefault();
    };

    // handle delete event start
    const handleDeleteEvent = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('event.destroy', id));
            }
        });
    }
    // handle delete event end

    return (
        <div className="educare-event-list-area">
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <form onSubmit={dummyData}>
                    <div className="educare-event-list-wrapper">
                        <ul>
                            {events?.length > 0 &&
                                events?.map((item, index) => (
                                    <li key={index}>
                                        <div className="grid grid-cols-12 items-center gap-y-[20px]">
                                            <div className="col-span-12 lg:col-span-6">
                                                <div className="educare-event-list-item">
                                                    <div className="educare-event-list-content">
                                                        <h3 className='text-[20px] font-semibold mb-1'>{item?.title}</h3>
                                                        <p>{item?.description}</p>
                                                        <p><strong>Event Level </strong>: {item?.event_level}, <strong>Venue</strong> : {item?.location} , <strong>Event Type</strong> : {item?.event_type}</p>
                                                        <p>
                                                            {item?.is_published == true &&
                                                                <span
                                                                    className="mr-1 badge bg-success"
                                                                >
                                                                    Published
                                                                </span>
                                                            }
                                                            <strong>Duration  </strong>: ( {item?.start_date} - {item?.end_date} ) Event Start Time : {item?.start_time} Created on : {item?.created_on}
                                                        </p>
                                                        {/* <p>Event Image</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                                <div className="educare-event-list-content-action-button">
                                                    <div className="educare-button-action-field-wrapper">
                                                        <div className='educare-list-action-btn flex lg:justify-center flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <Link
                                                                        href={route('event.edit', item?.id)}
                                                                        className="educare-warning-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Event Details"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <Link
                                                                        href={route('event.details', item?.id)}
                                                                        className="educare-tertiary-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-eye"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Delete"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => {
                                                                            handleDeleteEvent(item?.id)
                                                                        }}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                            <div className='relative'>
                                                                <Dropdown>
                                                                    <Dropdown.Trigger>
                                                                        <div className="educare-dropdown-menu">
                                                                            <button type="button" className="educare-dark-btn-sm-fill">
                                                                                <i className="icon-DotsThreeOutlineVertical"></i>
                                                                            </button>
                                                                        </div>
                                                                    </Dropdown.Trigger>
                                                                    <Dropdown.Content>
                                                                        <Dropdown.Link
                                                                            href={route('event.preview', item?.id)}
                                                                        >
                                                                            <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                            Event Preview
                                                                        </Dropdown.Link>
                                                                        {/* <Dropdown.Link href="#">
                                                                            <i className="icon-printer text-[20px] text-supportingA mr-1"></i>{" "}
                                                                            Print
                                                                        </Dropdown.Link>
                                                                        <button type="button">
                                                                            <i className="icon-Notebook text-[20px] text-supportingA mr-1"></i>{" "}
                                                                            Notes
                                                                        </button> */}
                                                                    </Dropdown.Content>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-8 lg:col-span-3">
                                                <div className="educare-event-list-thumb">
                                                    {item?.image != null &&
                                                        <img src={item?.image?.path} alt="event-image" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InputElements;
