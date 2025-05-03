import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export default function EventListFilter({
    className = "",
    eventStatusArr,
    eventTypes,
    academicYears,
    events
 }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // const allEventInput = useRef();
    // const eventTypeInput = useRef();
    // const admissionSearchInput = useRef();
    // const startDateInput = useRef();
    // const endDateInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        event_status: "",
        event_type: "",
        start_date: "",
        end_date: "",
        academic_year_id: "",
        search: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: startDate
        }));
    }, [startDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_date: endDate
        }));
    }, [endDate]);

    // handle filter event data start
    const handleFilterEventData = (e) => {
        e.preventDefault();

        const form_data = {
            event_status: data?.event_status,
            event_type: data?.event_type,
            start_date: data?.start_date,
            end_date: data?.end_date,
            academic_year_id: data?.academic_year_id,
        }

        router.post(route('event.list'), form_data);
    }
    // handle filter event data end

    const eventListFilterData = (e) => {
        e.preventDefault();
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
        <>

            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={eventListFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {events?.length}</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            {/* Replace changable inputs */}
                                            <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="event_status"
                                            data_label="All Event"
                                            data={eventStatusArr}
                                            value={data.event_status}
                                            onChange={(e) =>
                                                setData("event_status", e.target.value)
                                            }
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.event_status}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="event_type"
                                            data_label="Event Type"
                                            data={eventTypes}
                                            value={data.event_type}
                                            onChange={(e) =>
                                                setData(
                                                    "event_type",
                                                    e.target.value
                                                )
                                            }
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.event_type}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="educare-input-field-styles">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
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
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
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
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="academic_year_id"
                                            data_label="All Event"
                                            data={academicYears}
                                            value={data.academic_year_id}
                                            onChange={(e) =>
                                                setData(
                                                    "academic_year_id",
                                                    e.target.value
                                                )
                                            }
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.academic_year_id}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* <div className="educare-input-field-styles">
                                        <TextInput
                                            id="search"
                                            ref={admissionSearchInput}
                                            value={data.search}
                                            onChange={(e) =>
                                                setData(
                                                    "search",
                                                    e.target.value
                                                )
                                            }
                                            placeHolder="Search"
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.search}
                                            className="mt-2"
                                        />
                                    </div> */}
                                            {/* Replace changable inputs */}
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
                                            <button
                                                type="button"
                                                className="educare-secondary-btn-md-fill"
                                                onClick={(e) => {
                                                    handleFilterEventData(e)
                                                }}
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
                                                href={route('event.list')}
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
}
