import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React, { useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import useScrollableFilterBar from "@/Utils/FilterArrow";

const HomeworkListFilter = ({ homeWorks = '' }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const homeworkClassInput = useRef();
    const homeworkSubjectInput = useRef();
    const homeworkAssignedInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        homework_class_id: "",
        homework_subject_id: "",
        homework_assigned_id: "",
    });

    const homeworkFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.homework_class_id) {
                    reset("homework_class_id");
                    homeworkClassInput.current.focus();
                }
            },
        });
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
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={homeworkFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main minMaxXl:flex-wrap minMaxXl:justify-end minMax2Xl:flex-wrap minMax2Xl:justify-end  minMax3Xl:flex-wrap minMax3Xl:justify-end">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {homeWorks?.length}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Class"
                                                data={[]}
                                                ref={homeworkClassInput}
                                                value={data.homework_class_id}
                                                onChange={(e) =>
                                                    setData("homework_class_id", e.target.value)
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.homework_class_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Subject"
                                                data={[]}
                                                ref={homeworkSubjectInput}
                                                value={data.homework_subject_id}
                                                onChange={(e) =>
                                                    setData("homework_subject_id", e.target.value)
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.homework_subject_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Assigned"
                                                data={[]}
                                                ref={homeworkAssignedInput}
                                                value={data.status}
                                                onChange={(e) =>
                                                    setData("homework_assigned_id", e.target.value)
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.homework_assigned_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select" isClearable placeholderText="Start date" />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select" 
                                                isClearable 
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Start date" />
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
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomeworkListFilter;
