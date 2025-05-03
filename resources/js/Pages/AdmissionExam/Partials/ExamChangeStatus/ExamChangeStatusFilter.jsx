import React from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExamChangeStatusFilter = ({ 
    examStatusArray, 
    data,
    setData,
    handleFilterAdmissionData
}) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    // const {
    //     data,
    //     setData,
    //     errors,
    //     post,
    //     reset,
    //     processing,
    //     recentlySuccessful,
    // } = useForm({
    //     search: "",
    //     from_date: fromDate,
    //     to_date: toDate,
    //     exam_status: "",
    // });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            from_date: fromDate,
        }));
    },[fromDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            to_date: toDate,
        }));
    },[toDate]);


    const handleFilterData = (e) => {
        e.preventDefault();

        if(data?.academic_year_id == "" || data?.class_name_id == "") {
            toast.error("Please select academic year and class.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                academic_year_id: data?.academic_year_id ?? "",
                class_name_id: data?.class_name_id ?? "",
                from_date : data?.from_date ?? "",
                to_date: data?.to_date ?? "",
                exam_status : data?.exam_status ?? "",
            }

            handleFilterAdmissionData(form_data);
        }
    }

    // handle reset start
    const handleReset = () => {
        setFromDate(null);
        setToDate(null);
        setData((prevData) => ({
            ...prevData,
            from_date: "",
            to_date: "",
            exam_status: "",
        }));

        if (data?.academic_year_id != "" && data?.class_name_id != "") {
            const form_data = {
                academic_year_id: data?.academic_year_id,
                class_name_id: data?.class_name_id,
            }
    
            handleFilterAdmissionData(form_data);
        }
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
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={handleFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-header-filtar-bar-count flex flex-wrap gap-2.5">
                                <div className="educare-card-title leading-none">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Students
                                    </h5>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                value={data.search}
                                                onChange={(e) => setData("search", e.target.value)}
                                                placeHolder="Search Student"
                                                type="text"
                                                className="block"
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
                                                placeholderText="From Date"
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
                                                data_label="All"
                                                data={examStatusArray}
                                                value={data.exam_status}
                                                onChange={(e) =>
                                                    setData("exam_status", e.target.value)
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
                                    <button
                                        type="button"
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                        className="educare-secondary-btn-md-fill"
                                        onClick={(e) => {
                                            handleFilterData(e)
                                        }}
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </button>
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
                                            onClick={() => {
                                                handleReset()
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
    );
};

export default ExamChangeStatusFilter;
