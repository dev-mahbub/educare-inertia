import DatePicker from "react-datepicker";
import React from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";

const AlumniPaymentFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        start_date: "",
        end_date: "",
        search_payment: "",
        alumni_type: "",
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
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Alumni Payment
                </h5>
            </div>
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
                                                    id="search_payment"
                                                    value={data.search_payment}
                                                    onChange={(e) =>
                                                        setData(
                                                            "search_payment",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Search Payment"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.search_payment
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="alumni_type"
                                                    data_label="Alumni Type"
                                                    data={[]}
                                                    value={data.alumni_type}
                                                    onChange={(e) =>
                                                        setData(
                                                            "alumni_type",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.alumni_type}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="educare-select-field-styles">
                                                <DatePicker
                                                    selected={
                                                        data?.start_date
                                                            ? new Date(
                                                                  data?.start_date
                                                              )
                                                            : new Date()
                                                    }
                                                    onChange={(date) =>
                                                        setData(
                                                            "start_date",
                                                            date
                                                        )
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="End date"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <DatePicker
                                                    selected={
                                                        data?.end_date
                                                            ? new Date(
                                                                  data?.end_date
                                                              )
                                                            : new Date()
                                                    }
                                                    onChange={(date) =>
                                                        setData(
                                                            "end_date",
                                                            date
                                                        )
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="End date"
                                                    className="w-full"
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
        </>
    );
};

export default AlumniPaymentFilter;
