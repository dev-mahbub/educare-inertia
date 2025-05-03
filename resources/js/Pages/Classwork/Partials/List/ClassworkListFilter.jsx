import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const ClassworkListFilter = ({ classWorks,  classrooms, subjects }) => {
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classwork_class_id: "",
        classwork_subject_id: "",
        classwork_assigned_id: "",
        startDate: new Date(),
        endDate: new Date(),
    });

    const classworkFilterData = (e) => {
        e.preventDefault();

        post(route("classwork.list"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // handle change class start
    const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            classwork_class_id: value
        }));

        router.post(route('classwork.list'), {
            classwork_class_id: value
        });
    };

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={classworkFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {classWorks?.length}</span>
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
                                                    id="classwork_class_id"
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={
                                                        data.classwork_class_id
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeClass(e.target.value)
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.classwork_class_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classwork_subject_id"
                                                    data_label="Subject"
                                                    data={subjects}
                                                    value={
                                                        data.classwork_subject_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "classwork_subject_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.classwork_subject_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={data.startDate}
                                                    onChange={(date) =>
                                                        setData("startDate", date)
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
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={data.endDate}
                                                    onChange={(date) =>
                                                        setData("endDate", date)
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

export default ClassworkListFilter;
