import React from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";

const BookSearchByLocationTable = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_by_book_name: "",
        search_by_author: "",
    });

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.landmarks_id) {
                //     reset("landmarks_id");
                //     landmarksInput.current.focus();
                // }
            },
        });
    };
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here
    return (
        <>
            {/* page title  */}
            <div className="educare-card-title mr-auto pb-none">
                <h5>
                    <i className="icon-ChartBar"></i>
                    Level Wise Report
                </h5>
            </div>
            {/* filter */}

            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={CommonHeaderFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: 10</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span
                                            className="educare-header-filter-prev"
                                            onClick={handlePrevClick}
                                        >
                                            <i className="icon-left-chevron"></i>
                                        </span>
                                        <div
                                            className="educare-header-filtar-bar-fields-wrap"
                                            ref={listRef}
                                            style={{
                                                transform: `translateX(-${
                                                    currentIndex * 120
                                                }px)`,
                                            }}
                                        >
                                            {/* Replace changable inputs */}
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search_by_book_name"
                                                    value={
                                                        data.search_by_book_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "search_by_book_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Search By Book"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.search_by_book_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search_by_author"
                                                    value={data.search}
                                                    onChange={(e) =>
                                                        setData(
                                                            "search_by_author",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Search By Author"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.search_by_author
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            {/* Replace changable inputs */}
                                        </div>
                                        <span
                                            className="educare-header-filter-next"
                                            onClick={handleNextClick}
                                        >
                                            <i className="icon-chevron"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    {/* Replace changable buttons */}
                                    <div>
                                        <Tooltip
                                            title="Search"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                className="educare-secondary-btn-md-fill"
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip
                                            title="Excel Sheet"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>

                                    <div>
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* table */}
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Acc No.</th>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Class</th>
                                <th>Subject</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>21244</td>
                                <td>100 facts Rocks & Minerals</td>
                                <td>Sean Callery</td>
                                <td>XI B</td>
                                <td>Math</td>
                                <td>
                                    <span className="badge warning">
                                        Issued
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>21245</td>
                                <td>The Great Gatsby</td>
                                <td>F. Scott Fitzgerald</td>
                                <td>XII A</td>
                                <td>English</td>
                                <td>
                                    <span className="badge success">
                                        Available
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>21246</td>
                                <td>Introduction to Chemistry</td>
                                <td>John Doe</td>
                                <td>X</td>
                                <td>Science</td>
                                <td>
                                    <span className="badge warning">
                                        Issued
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default BookSearchByLocationTable;
