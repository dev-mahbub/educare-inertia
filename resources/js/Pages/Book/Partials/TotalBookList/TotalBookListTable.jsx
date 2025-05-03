import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import BookEntryDamageLostPopup from "./BookEntryDamageLostPopup/BookEntryDamageLostPopup";
import BookAccNoPopup from "./BookAccNoPopup";
import Loader from "@/Components/Loader";
import moment from "moment";

const TotalBookListTable = ({
    totalBookList = [],
    bookTypeStatus,
    bookTypeUser,
    classrooms,
    students,
    teacherData,
    loading,
    setLoading,
}) => {

    const [singlePopup, setSinglePopup] = useState(false);
    const [bookAccPopup, setBookAccPopup] = useState(false);
    const [bookData, setBookData] = useState([]);
    const [bookAccData, setBookAccData] = useState([]);

    const handleSinglePopupClick = (e, id, book_title, author, publisher_name, item) => {
        e.preventDefault();
        setBookData({ id, book_title, author, publisher_name, item });
        setSinglePopup(!singlePopup);
    };

    const handleBookAccPopup = (e, id, book_title, author, publisher_name, acc_no, price) => {
        e.preventDefault();
        setBookAccData({ id, book_title, author, publisher_name, acc_no, price });
        setBookAccPopup(!bookAccPopup);
    };

    useEffect(() => {
        setLoading(false);
    }, [totalBookList]);

    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>AccNo</th>
                                <th>Book Title</th>
                                <th>Author</th>
                                <th>Publisher</th>
                                <th>Class</th>
                                <th>Date Of Purchase</th>
                                <th>Pages</th>
                                <th>SF</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Loader></Loader>
                        ) : (
                            <tbody>
                                {totalBookList?.length > 0 ? (
                                    totalBookList?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.acc_no}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <h5 className="text-headingLight">{item?.book_item?.book_title}</h5>
                                                    <span className={`badge ${item?.status === 'Active' ? 'success' : 'danger'}`}>{item?.status}</span>
                                                    {
                                                        item?.book_type_status ? <span className="badge danger">{item?.book_type_status}</span> : ''
                                                    }
                                                </div>
                                            </td>
                                            <td>{item?.book_item?.author}</td>
                                            <td>{item?.book_item?.publisher_name}</td>
                                            <td>{item?.book_item?.class_name?.title}</td>
                                            <td>{moment(item?.purchasing_date_at).format("DD MMM, YYYY")}</td>
                                            <td>{item?.book_item?.no_of_pages}</td>
                                            <td>need to update</td>
                                            <td>{item?.price ? item?.price : item?.book_item?.price}</td>
                                            <td>{item?.book_item?.category?.title}</td>
                                            <td>
                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Edit"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <Link
                                                                href="#"
                                                                className="educare-warning-btn-sm-fill"
                                                            >
                                                                <i className="icon-editing"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="View"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-tertiary-btn-sm-fill"
                                                            >
                                                                <i className="icon-eye"></i>
                                                            </button>
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
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="relative">
                                                        <Dropdown>
                                                            <Dropdown.Trigger>
                                                                <div className="educare-dropdown-menu">
                                                                    <button
                                                                        type="button"
                                                                        className="educare-dark-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-DotsThreeOutlineVertical"></i>
                                                                    </button>
                                                                </div>
                                                            </Dropdown.Trigger>
                                                            <Dropdown.Content>
                                                                <button
                                                                    onClick={(e) => handleSinglePopupClick(e, item?.id, item?.book_item?.book_title, item?.book_item?.author, item?.book_item?.publisher_name, item)}
                                                                >
                                                                    <i className="icon-Books text-[20px] text-supportingA mr-1"></i>{" "}
                                                                    Damage/Lost Book Entry
                                                                </button>
                                                                <Dropdown.Link href="#">
                                                                    <i className="icon-MapPin text-[20px] text-supportingA mr-1"></i>{" "}
                                                                    View Location
                                                                </Dropdown.Link>
                                                                <Dropdown.Link href="https://educare-inertia.test/library/book/report/student-book-wise">
                                                                    <i className="icon-eye text-[20px] text-supportingA mr-1"></i>{" "}
                                                                    View Book Wise Report
                                                                </Dropdown.Link>
                                                                <Dropdown.Link
                                                                    type="button"
                                                                    onClick={(e) => handleBookAccPopup(e, item?.id, item?.book_item?.book_title, item?.book_item?.author, item?.book_item?.publisher_name, item?.acc_no, item?.price)}
                                                                >
                                                                    <i className="icon-NotePencil text-[20px] text-supportingA mr-1"></i>
                                                                    Update Account No./Price
                                                                </Dropdown.Link>
                                                            </Dropdown.Content>
                                                        </Dropdown>
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
            <BookEntryDamageLostPopup
                bookTypeStatus={bookTypeStatus}
                bookTypeUser={bookTypeUser}
                classrooms={classrooms}
                students={students}
                teacherData={teacherData}
                singlePopup={singlePopup}
                setSinglePopup={setSinglePopup}
                bookData={bookData}
            />
            <BookAccNoPopup
                bookAccPopup={bookAccPopup}
                setBookAccPopup={setBookAccPopup}
                bookAccData={bookAccData}
            />
        </>
    );
};

export default TotalBookListTable;
