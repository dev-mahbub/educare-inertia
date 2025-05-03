import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, useForm, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";
import DatePicker from "react-datepicker";

const AssessmentListFilter = ({ assessments = "", classrooms, subjects}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        assessment_class_id: "",
        assessment_subject_id: "",
        start_date: new Date(),
        end_date: new Date(),
    });

    const assessmentFilterData = (e) => {
        e.preventDefault();
    };

    const submitAssessmentFilterData = (e) => {
        e.preventDefault();
        router.post(route('assessment.list'), data);
    }

     // handle change class start
     const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            assessment_class_id: value
        }));

        router.post(route('assessment.list'), {
            assessment_class_id: value
        });
    }
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={assessmentFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {assessments?.length}</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area extra-large-filter extra-large-filter-enquiry relative">
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
                                                    id="assessment_class_id"
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={
                                                        data.assessment_class_id
                                                    }
                                                    
                                                    onChange={(e) =>
                                                        handleChangeClass(e.target.value)
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.assessment_class_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="assessment_subject_id"
                                                    data_label="Subject"
                                                    data={subjects}
                                                    value={
                                                        data.assessment_subject_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "assessment_subject_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.assessment_subject_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={
                                                        data?.start_date &&
                                                        new Date(
                                                            data?.start_date
                                                        )
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
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={
                                                        data?.end_date &&
                                                        new Date(data?.end_date)
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
                                                type="button"
                                                onClick={submitAssessmentFilterData}
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
                                    <div>
                                        <Tooltip
                                            title="Add Assessment"
                                            placement="top"
                                            arrow
                                        >
                                            <Link
                                                href="/assessment/create"
                                                className="educare-primary-btn-md-fill whitespace-nowrap"
                                            >
                                                <i className="icon-PlusCircle"></i>{" "}
                                                Add Assessment
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

export default AssessmentListFilter;
