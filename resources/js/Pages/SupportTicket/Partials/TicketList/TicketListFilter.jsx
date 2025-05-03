import React from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";

const TicketListFilter = ({supportTickets, teachers, contactReasons, status}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        assign_to: "",
        month: "",
        start_date: "",
        end_date: "",
        request_type: "",
        solution_status: "",
    });

    teachers = teachers.map((teacher) => ({
        id: teacher?.id,
        title: `${teacher?.first_name} ${teacher?.middle_name} ${teacher?.last_name}`,
    }));

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
        post(route("support_ticket.list"), {
            preserveScroll: true,
            preserveState: true,

        });
    };

    let months = [
        { id: 1, title: "Jan" },
        { id: 2, title: "Feb" },
        { id: 3, title: "Mar" },
        { id: 4, title: "Apr" },
        { id: 5, title: "May" },
        { id: 6, title: "Jun" },
        { id: 7, title: "Jul" },
        { id: 8, title: "Aug" },
        { id: 9, title: "Sep" },
        { id: 10, title: "Oct" },
        { id: 11, title: "Nov" },
        { id: 12, title: "Dec" },
    ]
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <>
           
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Parent Requests
                </h5>
            </div>
            <div className="educare-header-filtar-bar-area z-[4] relative mb-2.5">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={CommonHeaderFilterData}>
                            <div className="educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total Request: {supportTickets?.length}</span>
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
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="assign_to"
                                                    data_label="Assign"
                                                    data={teachers}
                                                    value={data.assign_to}
                                                    onChange={(e) =>
                                                        setData(
                                                            "assign_to",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.assign_to}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="month"
                                                    data_label="Month"
                                                    data={months}
                                                    value={data.month}
                                                    onChange={(e) =>
                                                        setData(
                                                            "month",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.month}
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
                                                    placeholderText="Start date"
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

                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="request_type"
                                                    data_label="Request Type"
                                                    data={contactReasons}
                                                    value={data.request_type}
                                                    onChange={(e) =>
                                                        setData(
                                                            "request_type",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.request_type
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="solution_status"
                                                    data_label="Pending And Progress"
                                                    data={status}
                                                    value={
                                                        data.solution_status
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "solution_status",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.solution_status
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
                                            <button
                                                type="submit"
                                                className="educare-secondary-btn-md-fill"
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
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

export default TicketListFilter;
