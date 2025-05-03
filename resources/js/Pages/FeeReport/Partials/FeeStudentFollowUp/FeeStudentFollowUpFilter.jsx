import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const FeeStudentFollowUpFilter = ({
    classrooms = [],
    setLoading,
    setFollowUpReportsData
}) => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [params, setParams] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        from_date: fromDate,
        to_date: toDate,
        classroom_id: "",
    });

    useEffect(() => {
        setParams({
            from_date: data?.from_date ?? "",
            to_date: data?.to_date ?? "",
            classroom_id: data?.classroom_id ?? "",
        });
    }, [data]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            from_date: fromDate
        }));
    },[fromDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            to_date: toDate
        }));
    },[toDate]);

    // handle reset form and report data start
    // const handleReset = () => {
    //     reset();
    //     setFromDate(new Date())
    //     setToDate(new Date())
    //     setFollowUpReportsData([]);
    //     setLoading(false);
    // }
    // handle reset form and report data end

    // handle filter student followup reports start
    const filterStudentFollowUpReports = (e) => {
        e.preventDefault();

        setLoading(false);

        post(route('fee_report.fee_student_followup'));
    }
    // handle filter student followup reports end


    const feeStudentFollowUpFilterData = (e) => {
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
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={feeStudentFollowUpFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Student Follow Up
                                </h5>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={fromDate}
                                                onChange={(date) => setFromDate(date)}
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
                                                selected={toDate}
                                                onChange={(date) => setToDate(date)}
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
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
                                                    setData("classroom_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.classroom_id}
                                                className="mt-2"
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
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => {
                                                filterStudentFollowUpReports(e)
                                            }}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Download Excel"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <a
                                            target="_blank"
                                            href={route('export_excel.fee_student_followup_report', params)}
                                            className="educare-success-btn-md-fill"
                                        >
                                            <i className="icon-FileX"></i>
                                        </a>
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
                                            href={route('fee_report.fee_student_followup')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                        {/* <button
                                            type="button"
                                            className="educare-gray-btn-md-fill"
                                            onClick={(e) => {
                                                handleReset()
                                            }}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button> */}
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeeStudentFollowUpFilter;
