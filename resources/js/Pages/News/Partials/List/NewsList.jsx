import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Swal from "sweetalert2";

const NewsList = ({
    newsLists
}) => {
    const dummyData = (e) => {
        e.preventDefault();
    };

    // handle delete news start
    const handleDeleteNews = (id) => {
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
                router.delete(route("news.destroy", id));
            }
        });
    }
    // handle delete news end

    return (
        <div className="educare-news-list-area">
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <form onSubmit={dummyData}>
                    <div className="educare-event-list-wrapper">
                        <ul>
                            {newsLists?.length > 0 &&
                                newsLists?.map((item, index) => (
                                    <li key={index}>
                                        <div className="grid grid-cols-12 items-center gap-y-[20px]">
                                            <div className="col-span-12 lg:col-span-6">
                                                <div className="educare-event-list-item">
                                                    <div className="educare-event-list-content">
                                                        <h3 className='text-[20px] font-semibold mb-1'>{item?.title}</h3>
                                                        <p>{item?.details}</p>
                                                        <p>
                                                            <span>
                                                                <strong>News Type: </strong>{item?.news_type},
                                                            </span>
                                                            <span>
                                                                <strong> Audience: </strong>{item?.audience_type}
                                                            </span>
                                                        </p>
                                                        <p
                                                            className="flex flex-wrap gap-1"
                                                        >
                                                            <span>
                                                                <strong>Created by: </strong>{item?.created_by?.first_name} {item?.created_by?.middle_name} {item?.created_by?.last_name},
                                                            </span>
                                                            <span>
                                                                <strong>Created date: </strong>{item?.created_date},
                                                            </span>
                                                            <span>
                                                                <strong>Publish date: </strong>{item?.publish_date},
                                                            </span>
                                                            <span>
                                                                <strong>Status: </strong>
                                                                <span
                                                                    className={`badge ${item?.status == 'Active' ? 'bg-success' : item?.status == 'Deleted' ? 'bg-danger' : 'bg-warning'} mr-1`}
                                                                >
                                                                    {item?.status}
                                                                </span>
                                                                <span
                                                                    className={`badge ${item?.is_published ? 'bg-success' : 'bg-warning' } mr-1`}
                                                                >
                                                                    {item?.is_published ? "Published" : "UnPublished"}
                                                                </span>
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
                                                                        href={route('news.edit', item?.id)}
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
                                                                            handleDeleteNews(item?.id)
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
                                            <div className="col-span-12 md:col-span-8 lg:col-span-3">
                                                {item?.image != null &&
                                                    <div className="educare-event-list-thumb">
                                                        <img src={item?.image?.path} alt="image" />
                                                    </div>
                                                }
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

export default NewsList;
