import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";

const MonthlyWorkDurationReportFilter = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        staff_type: "",
    });
    const headerTopData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.landmarks_id) {
                //     reset("landmarks_id");
                //     landmarksInput.current.focus();
                // }
            },
        });
    };

    return (
        <form onSubmit={headerTopData}>
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Monthly Work Duration Report
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
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
                            className="w-full"
                        />
                    </div>
                    <div className="col-span-12 md:col-span-6">
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
                                placeholderText="End Date"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className='educare-filter-action-btn flex flex-wrap gap-2'>

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
                    </div>
                </div>
            </div>
        </form>
    );
};

export default MonthlyWorkDurationReportFilter;