import React from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import DatePicker from "react-datepicker";
import PrimaryButton from "@/Components/PrimaryButton";

const DateWiseClassAttendanceReportFilter = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_department: "",
        select_all_staff_type: "",
        select_all_designation: "",
        select_all_attendance: "",
        start_date: new Date(),
        
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
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className="educare-header-filtar-bar-inner-main educare-header-filtar-medium-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: 3</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Department"
                                                data={[]}
                                                value={data.select_all_department}
                                                onChange={(e) =>
                                                    setData("select_all_department", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.select_all_department}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Staff Type"
                                                data={[]}
                                                value={data.select_all_staff_type}
                                                onChange={(e) =>
                                                    setData("select_all_staff_type", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.select_all_staff_type}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Designation"
                                                data={[]}
                                                value={data.select_all_designation}
                                                onChange={(e) =>
                                                    setData("select_all_designation", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.select_all_designation}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Attendance"
                                                data={[]}
                                                value={data.select_all_attendance}
                                                onChange={(e) =>
                                                    setData("select_all_attendance", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.select_all_attendance}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.start_date
                                                        ? new Date(
                                                            data?.start_date
                                                        )
                                                        : new Date()
                                                }
                                                onChange={(date) =>
                                                    setData("start_date", date)
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
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
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
                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-secondary-btn-md-fill whitespace-nowrap"
                                >
                                    Notify To Principal
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DateWiseClassAttendanceReportFilter;
