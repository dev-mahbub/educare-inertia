import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
const DailyAdmissionReportFilter = ({
    academicYears,
    setParams
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
        student_search: "",
        start_date: startDate,
        end_date: endDate,
        academic_year_id: "",
    });

    useEffect(() => {
        setParams({
            student_search: data?.student_search ?? "",
            start_date: data?.start_date ?? "",
            end_date: data?.end_date ?? "",
            academic_year_id: data?.academic_year_id ?? "",
        })
    }, [data])

    useEffect(() => {
        setData('start_date', startDate)
    }, [startDate])

    useEffect(() => {
        setData('end_date', endDate)
    }, [endDate])



    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };

    // handle filter data start
    const handleFilterDailyAdmissionReport = (e) => {
        e.preventDefault();

        router.post(route('admission_registration_report.daily_admission'), data);
    }
    // handle filter data end

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData} className="mb-2.5">
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                {/* <span>Total: {getDailyAdmission.lenght}</span> */}
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
                                                id="student_search"
                                                value={data.search}
                                                onChange={(e) =>
                                                    setData(
                                                        "student_search",
                                                        e.target.value
                                                    )
                                                }
                                                placeHolder="Search"
                                                type="text"
                                                className="block"
                                            />
                                        </div>

                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="select_year"
                                                data_label="Academic Year"
                                                data={academicYears}
                                                onChange={(e) =>{
                                                    setData('academic_year_id', e.target.value);
                                                }
                                                }

                                            />
                                        </div>

                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => {
                                                    setStartDate(date)
                                                }
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

                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => {
                                                    setEndDate(date)
                                                }
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
                                        <button
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => {
                                                handleFilterDailyAdmissionReport(e)
                                            }}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>

                                {/* <div>
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
                                </div> */}
                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DailyAdmissionReportFilter;
