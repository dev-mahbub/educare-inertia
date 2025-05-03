import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const RegisterViewFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_month: "",
        select_year: "",
    });
    const headerTopData = (e) => {
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
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={headerTopData}>
                        <div className="educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: 3</span>
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
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="select_month"
                                                data_label="Month"
                                                data={[]}
                                                value={data.select_month}
                                                onChange={(e) =>
                                                    setData(
                                                        "select_month",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.select_month}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="staff_type"
                                                data_label="Staff"
                                                data={[]}
                                                value={data.staff_type}
                                                onChange={(e) =>
                                                    setData(
                                                        "staff_type",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.staff_type}
                                                className="mt-2"
                                            />
                                        </div>
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
                                        title="Download Register View in Excel"
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
                                        title="Download Register View with time in Excel"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-dark-btn-md-fill"
                                        >
                                            <i className="icon-FileX"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterViewFilter;
