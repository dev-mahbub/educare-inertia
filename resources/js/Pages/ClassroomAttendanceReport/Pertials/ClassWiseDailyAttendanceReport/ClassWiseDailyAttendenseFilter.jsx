import { router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

const ClassWiseDailyAttendenseFilter = ({ attendanceCount, setLoading }) => {

    const [params, setParams] = useState({});

    const {
        data,
        setData
    } = useForm({
        select_date: new Date(),
    });

    useEffect(() => {
        setParams({
            attendance_date: data?.select_date
        });
    }, [data]);

    const handelAttendanceDate = (e) => {
        e.preventDefault();
        router.post(route('classroom_attendance_report.classwisedaily_attendance_report'), data);
        setLoading(false);
    }

    const isFutureDate = (date) => {
        // Check if the given date is in the future
        return date.getTime() < new Date().getTime();
    };


    return (
        <form>
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div>
                    <span className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total : {attendanceCount}</span>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-input-field-styles">
                        <DatePicker
                            selected={data?.select_date && new Date(data?.select_date)}
                            onChange={(date) => setData("select_date", date)}
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
                            filterDate={isFutureDate}
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
                                <button
                                    className="educare-secondary-btn-md-fill"
                                    onClick={(e) => handelAttendanceDate(e)}
                                    type="button"
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Class"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    href={route('export_excel.class_wise_daily_attendance_report', params)}
                                    target="_blank"
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </a>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="MasterClass"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    href={route('export_excel.masterclass_wise_daily_attendance_report', params)}
                                    target="_blank"
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </a>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Pdf Download"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    href={route('pdf_student.print_class_wise_daily_attendance_report', params)}
                                    target="_blank"
                                    className="educare-warning-btn-md-fill"
                                >
                                    <i className="icon-FilePdf"></i>
                                </a>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ClassWiseDailyAttendenseFilter;
