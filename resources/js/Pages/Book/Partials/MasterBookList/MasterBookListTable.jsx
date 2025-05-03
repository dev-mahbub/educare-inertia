import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import MasterBookListPopUp from "./MasterBookListPopUp";
import MasterBookListChangeStatusPopUp from "./MasterBookListChangeStatusPopUp";
import moment from "moment";
import Loader from "@/Components/Loader";

const MasterBookListTable = ({
    bookListData = [],
    loading,
    setLoading,
}) => {
    const [changeStatus, setChangeStatus] = useState(false);
    const [listPopup, setListPopup] = useState(false);
    const [accNoData, setAccNoData] = useState([]);
    const [activeItem, setActiveItem] = useState('');

    const handleListPopupClick = (e, id, book_title = null, author = null, publisher_name = null, book_acc_nos) => {
        e.preventDefault();
        setListPopup(!listPopup);
        setAccNoData({ id, book_title, author, publisher_name, book_acc_nos });
        setActiveItem(id);
    };

    const handleChangeStatusClick = (e, id, book_title = null, author = null, publisher_name = null, book_acc_nos) => {
        e.preventDefault();
        setChangeStatus(!changeStatus);
        setAccNoData({ id, book_title, author, publisher_name, book_acc_nos });
        setActiveItem(id);
    };

    const handleEdit = (e, id) => {
        e.preventDefault();
        router.post(route('book.inhouse_edit'), { book_item_id: id });
    }

    useEffect(() => {
        setLoading(false);
    }, [bookListData])

    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>Author</th>
                                <th>Publisher</th>
                                <th>Date Of Purchase</th>
                                <th>Pages</th>
                                <th>SF</th>
                                <th>Class</th>
                                <th>Category</th>
                                <th>Total Copy</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Loader></Loader>
                        ) : (
                            <tbody>
                                {bookListData?.length > 0 ? (
                                    bookListData?.map((item, index) => (
                                        <tr className={activeItem === item?.id ? 'educare-table-row-active' : ''} key={index}>
                                            <td>{item?.book_title}</td>
                                            <td>{item?.author}</td>
                                            <td>{item?.publisher_name}</td>
                                            <td>{moment(item?.purchasing_date_at).format("MMM DD, YYYY")}</td>
                                            <td>{item?.no_of_pages}</td>
                                            <td>need to update</td>
                                            <td>{item?.class_name?.title}</td>
                                            <td>{item?.category?.title}</td>
                                            <td>
                                                <button
                                                    onClick={(e) =>
                                                        handleListPopupClick(e, item?.id, item?.book_title, item?.author, item?.publisher_name, item?.book_acc_nos)
                                                    }
                                                    className="font-semibold text-primary"
                                                >
                                                    {item?.book_acc_nos?.length}
                                                </button>
                                            </td>
                                            <td>
                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Edit"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                onClick={(e) => handleEdit(e, item?.id)}
                                                                className="educare-warning-btn-md-fill"
                                                            >
                                                                <i className="icon-editing"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>

                                                    <div>
                                                        <Tooltip
                                                            title="change Status"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                onClick={(e) =>
                                                                    handleChangeStatusClick(e, item?.id, item?.book_title, item?.author, item?.publisher_name, item?.book_acc_nos)
                                                                }
                                                                type="button"
                                                                className="educare-primary-btn-md-fill"
                                                            >
                                                                <i className="icon-Notebook"></i>
                                                                change status
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="12">
                                            Data not found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        )}

                    </table>
                </div>
            </div>

            <MasterBookListPopUp
                listPopup={listPopup}
                setListPopup={setListPopup}
                accNoData={accNoData}
            />
            <MasterBookListChangeStatusPopUp
                changeStatus={changeStatus}
                accNoData={accNoData}
                setChangeStatus={setChangeStatus}
            />
        </>
    );
};

export default MasterBookListTable;
