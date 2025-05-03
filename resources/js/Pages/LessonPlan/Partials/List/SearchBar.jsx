import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";

const SearchBar = ({
    classrooms,
    subjects,
    lessonPlans
}) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
        subject_id: "",
        start_date: "",
        end_date: "",
    });

    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            subject_id: ""
        }));

        const form_data = {
            classroom_id: classroom_id,
            subject_id: "",
            start_date: startDate,
            end_date: endDate,
            filter_data: "subject"
        }

        router.post(route('lesson_plan.list'), form_data);
    }
    // handle classroom change end

    // handle filter data start
    const handleSearch = (e) => {
        e.preventDefault();

        const form_data = {
            classroom_id: data?.classroom_id ?? "",
            subject_id: data?.subject_id ?? "",
            start_date: data?.start_date ?? "",
            end_date: data?.end_date ?? "",
            filter_data: "lesson_plan"
        }

        setStartDate(data?.start_date);
        setEndDate(data?.end_date);

        router.post(route('lesson_plan.list'), form_data);
    }
    // handle filter data end

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <div className="educare-header-search-bar-main mb-2.5">
            <div className=" educare-header-filtar-bar-inner-main">
                <div className="educare-header-search-bar-left flex items-center gap-2">
                    <Link href='/lesson-plan/create'
                        className="educare-primary-btn-md-fill leading-10"
                    >
                        <i className='icon-PlusCircle'></i> Add Lesson Plan
                    </Link>
                </div>
                {/* <div className="educare-header-search-bar-right maxXs:flex-grow">
                    <div className="educare-header-search-bar-form educare-student-header-search-bar-form">
                        <form onSubmit="#">
                            <TextInput type="text" placeHolder="Search..." />
                            <button type="submit">
                                <i className="icon-search-interface-symbol text-[18px] text-heading"></i>
                            </button>
                        </form>
                    </div>
                </div> */}
                <div className="educare-header-filtar-bar-count mr-auto">
                    <span>Lesson Plans: {lessonPlans?.length}</span>
                </div>
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
                                transform: `translateX(-${currentIndex * 120
                                    }px)`,
                            }}
                        >
                            {/* Replace changable inputs */}
                            <div className="educare-input-field-styles">
                                <DatePicker
                                    selected={data?.start_date}
                                    onChange={(date) => setData("start_date", date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    placeholderText="Start Date"
                                    className="w-full"
                                />
                            </div>
                            <div className="educare-input-field-styles">
                                <DatePicker
                                    selected={data?.end_date}
                                    onChange={(date) => setData("end_date", date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    placeholderText="End Date"
                                    className="w-full"
                                />
                            </div>
                            <div className="educare-select-field-styles">
                                <SelectInput
                                    data_label="Class"
                                    data={classrooms}
                                    value={data.classroom_id}
                                    onChange={(e) =>
                                        handleClassroomChange(e)
                                    }
                                    type="text"
                                    className="block"
                                />
                            </div>
                            <div className="educare-select-field-styles">
                                <SelectInput
                                    data_label="Subject"
                                    data={subjects}
                                    value={data.subject_id}
                                    onChange={(e) =>
                                        setData(
                                            "subject_id",
                                            e.target.value
                                        )
                                    }
                                    type="text"
                                    className="block"
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
                    <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                        <div>
                            <button
                                type="button"
                                onClick={(e) => handleSearch(e)}
                                className="educare-secondary-btn-md-fill"
                            >
                                <i className="icon-search-interface-symbol"></i>
                            </button>
                        </div>
                        <div>
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                                as="button">
                                <Link
                                    href={route('lesson_plan.list')}
                                    className="educare-gray-btn-md-fill">
                                    <i className="icon-ArrowsClockwise"></i>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                    {/* Replace changable buttons */}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
