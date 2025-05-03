import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import DatePicker from "react-datepicker";
import React from 'react';

const StaffAbsentReportFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        start_date: new Date(),
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
            <div>
                <div className="educare-card-title pb-none mb-2.5">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Staff Absent Report
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                    <div>
                        <span className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA 
                        whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total Count: 3</span>
                    </div>
                    <div className='flex flex-wrap gap-2.5 items-center'>
                        <div className="educare-select-field-styles">
                            <DatePicker
                                selected={
                                    data?.start_date
                                        ? new Date(
                                            data?.start_date
                                        )
                                        : new Date()
                                }
                                onChange={(date) =>
                                    setData("start_date", date)
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
                            <div>
                                <Tooltip
                                    title="Download"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default StaffAbsentReportFilter;