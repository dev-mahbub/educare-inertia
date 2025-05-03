import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const AdmissionExamSummaryFilter = ({
    selectedStatus = "",
    boarding,
    registrations,
    data,
    setData,
    reset
}) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            from_date: fromDate
        }));
    }, [fromDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            to_date: toDate
        }));
    }, [toDate]);


    const AdmissionExamSummaryFilterData = (e) => {
        e.preventDefault();
    };

    // handle search start
    const handleSearch = (e) => {
        e.preventDefault();

        const form_data = {
            exam_status: selectedStatus,
            search:data?.search,
            boarding_type:data?.boarding_type,
            from_date: data?.from_date,
            to_date: data?.to_date,
        }

        router.post(route('admission_exam.exam_summary'), form_data);
    }
    // handle search end

    // handle reset start
    const handleReset = (e) => {
        e.preventDefault();

        setFromDate(null);
        setToDate(null);
        reset();

        const form_data = {
            exam_status: selectedStatus,
        }

        router.post(route('admission_exam.exam_summary'), form_data);
    }
    // handle reset end

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <>

            <div className='educare-header-filtar-bar-area z-[4] relative mt-5 mb-2'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={AdmissionExamSummaryFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main items-center">
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <div className="educare-header-filtar-bar-count mr-auto">
                                        <span>Total: {Object.keys(registrations)?.length ?? 0}</span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.search
                                                    }
                                                    onChange={(e) => setData("search", e.target.value)}
                                                    className="block"
                                                    placeHolder="Search Admission"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={fromDate}
                                                    onChange={(date) => {
                                                        setFromDate(date)
                                                    }}
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="From date"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={toDate}
                                                    onChange={(date) => {
                                                        setToDate(date)
                                                    }}
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="To Date"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Boarding Type"
                                                    data={boarding}
                                                    value={data.boarding_type}
                                                    onChange={(e) =>
                                                        setData("boarding_type", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                            </div>

                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    <div>
                                        <Tooltip
                                            title="Search"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    handleSearch(e)
                                                }}
                                                href="#"
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
                                            <button
                                               type="button"
                                                className="educare-gray-btn-md-fill"
                                                onClick={(e) => {
                                                    handleReset(e);
                                                }}
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdmissionExamSummaryFilter;
