import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Swal from "sweetalert2";

const PageList = ({
    lists
}) => {

    // handle delete page start
    const handleDeletePage = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("page.destroy", id), {
                    preserveScroll: true,
                });
            }
        });
    }
    // handle delete page end

    return (
        <div className="educare-news-list-area">
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <div className="educare-event-list-wrapper">
                    <ul>
                        {lists?.length > 0 &&
                            lists?.map((item, index) => (
                                <li key={index}>
                                    <div className="grid grid-cols-12 items-center gap-y-[20px]">
                                        <div className="col-span-12 md:col-span-8 lg:col-span-2">
                                            {item?.image != null &&
                                                <div className="educare-event-list-thumb max-w-28">
                                                    <img src={item?.image} alt="image" />
                                                </div>
                                            }
                                        </div>
                                        <div className="col-span-12 lg:col-span-7">
                                            <div className="educare-event-list-item">
                                                <div className="educare-event-list-content">
                                                    <h3 className='text-[20px] font-semibold mb-1'>{item?.title}</h3>
                                                    <p
                                                        className="flex flex-wrap gap-1"
                                                    >
                                                        <span>
                                                            <strong>Page Type: </strong>{item?.page_type},
                                                        </span>
                                                        
                                                        <span>
                                                            <strong>Status: </strong>
                                                            { item?.status == 'Active' ? (
                                                                <span className="badge bg-success mr-1">Active</span>
                                                            ) : item?.status == 'Deleted' ? (
                                                                <span className="badge bg-danger mr-1">Deleted</span>
                                                            ) : (
                                                                <span className="badge bg-warning mr-1">Inactive</span>
                                                            ) }
                                                        </span>
                                                    </p>
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
                                                                    href={route('page.edit', item?.id)}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
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
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={() => {
                                                                        handleDeletePage(item?.id)
                                                                    }}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PageList;
