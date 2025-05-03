import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegistrationExamReportFilter = ({
    statusArray,
    academicYears,
    classNames,
    academicYearId,
    registrationExamReport
}) => {

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        registration_status: "",
        from_date: fromDate,
        to_date: toDate,
        academic_year_id: academicYearId ?? "",
        class_name_id: "",
    });

    useEffect(() => {
        setData('from_date', fromDate)
    },[fromDate]);

    useEffect(() => {
        setData('to_date', toDate)
    },[toDate]);

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();

    };

    // handle academic year change start
    const handleAacademicYearChange = (e) => {
        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id: academic_year_id,
            class_name_id: ""
        }));

        const form_data = {
            academic_year_id: academic_year_id
        }

        router.post(route('admission_exam.registration_exam_report'), form_data);
    }
    // handle academic year change end

    // handle search start
    const handlesearch = (e) => {
        e.preventDefault();

        if(data?.academic_year_id == "" || data?.class_name_id == "") {
            toast.error("Please select academic year and class.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else  {
            router.post(route('admission_exam.registration_exam_report'), data);
        }
    }
    // handle search end

    // handle download excel start
    const handleDownlodExcel = (e) => {
        e.preventDefault();

        if (data?.academic_year_id == "" || data?.class_name_id == "") {
            toast.error("Please select academic year and class.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const params = {
                registration_status: data?.registration_status ?? "",
                from_date: data?.from_date ?? "",
                to_date: data?.to_date ?? "",
                academic_year_id: data?.academic_year_id ?? "",
                class_name_id: data?.class_name_id ?? "",
            }

            const url = route('export_excel.registration_exam_report', params);

            window.open(url);
        }
    }
    // handle download excel end


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
                                <span>Total: {Object.keys(registrationExamReport)?.length}</span>
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
                                            <DatePicker
                                                selected={fromDate}
                                                onChange={(date) =>
                                                    setFromDate(date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="From Date"
                                                className="w-full"
                                            />

                                        </div>

                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={toDate}
                                                onChange={(date) =>
                                                    setToDate(date)
                                                }
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
                                                id="registration_status"
                                                data_label="Status"
                                                data={statusArray}
                                                value={data.registration_status}
                                                onChange={(e) =>
                                                    setData(
                                                        "registration_status",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.registration_status}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="educare-input-field-styles">
                                        <SelectInput
                                                    data_label="Select Year"
                                                    data={academicYears}
                                                    value={data.academic_year_id}
                                                    onChange={(e) =>
                                                        handleAacademicYearChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.academic_year_id}
                                                    className="mt-2"
                                                />
                                        </div>


                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="class_name_id"
                                                data_label="Class"
                                                data={classNames}
                                                value={data.class_name_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "class_name_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.class_name_id}
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
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => {
                                                handlesearch(e)
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
                                            href={route('admission_exam.registration_exam_report')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>

                                {Object.keys(registrationExamReport)?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                type="button"
                                                className="educare-success-btn-md-fill"
                                                onClick={(e) => {
                                                    handleDownlodExcel(e)
                                                }}
                                            >
                                                <i className="icon-FileX"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                }
                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationExamReportFilter;
