import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";

const SearchBar = ({
    setLessonPlanData,
    setSelectedKey
}) => {

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
    });

    // handle filter data start
    const handleSearch = (e) => {
        e.preventDefault();

        setSelectedKey(null);
        setLessonPlanData([]);

        const form_data = {
            start_date: data?.start_date ?? "",
            end_date: data?.end_date ?? "",
        }

        router.post(route('lesson_plan.teacher_wise_report'), form_data);
    }
    // handle filter data end

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <div className="educare-header-search-bar-main mb-2.5">
            <div className=" educare-header-filtar-bar-inner-main">
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
                                    href={route('lesson_plan.teacher_wise_report')}
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
