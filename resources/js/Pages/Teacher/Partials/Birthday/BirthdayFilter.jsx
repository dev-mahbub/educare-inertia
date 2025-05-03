import React, { useEffect, useRef, useState } from "react";
import TertiaryButton from "@/Components/TertiaryButton";
import SuccessButton from "@/Components/SuccessButton";
import DatePicker from "react-datepicker";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

export default function BirthdayFilter({ className = "", handleNotificationPopup, handleSmsNotificationPopup}) {
    const [startDate, setStartDate] = useState(new Date());

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        birth_date: '',
    });

    const BirthdayFilterData = (e) => {
        e.preventDefault();

    };

    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            birth_date: startDate,
        }))
    }, [startDate])

    //handle search Teacher
    const handleSearchTeacher = () => {
        const form_data = {
            birth_date: data?.birth_date
        }
        router.post(route('teacher.birthday_list'), form_data, {
            preserveScroll: true,
            onSuccess: () => { },
            onError: (errors) => { }
        })
    }


    return (
        <div className="educare-student-birthday-filter-area z-[4] relative">
            <div className="mb-3 educare-filter-bar">
                <div className="educare-default-filter">
                    <form onSubmit={BirthdayFilterData}>
                        <div className="educare-student-birthday-filter-title">
                            <h5 className="text-[18px] font-semibold text-headingLight">
                                Send Birthday Wishes To Student
                            </h5>
                        </div>
                        <div className="flex items-center flex-wrap gap-x-5 gap-y-2">
                            <div className="educare-admission-filter-bar-filter-fields-wrap relative">
                                <div className="educare-birthday-filter-fields flex flex-wrap items-center gap-2">
                                    <TertiaryButton
                                        // disabled={processing}
                                        className="educare-tertiary-btn-md-fill"
                                    >
                                        <Link href={route('student.birthday_list')}>
                                            Student Birthday
                                        </Link>
                                    </TertiaryButton>
                                    <div className="educare-input-field-styles">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                                setStartDate(date)
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
                                    <SuccessButton
                                        className="educare-success-btn-md-fill"
                                        onClick={() => handleNotificationPopup()}
                                    >
                                        <i className="icon-BellRinging"></i>{" "}
                                        send notification
                                    </SuccessButton>
                                    <SuccessButton
                                        className="educare-success-btn-md-fill"
                                        onClick={() => handleSmsNotificationPopup()}
                                    >
                                        <i className="icon-ChatCircleDots"></i>{" "}
                                        Send SMS
                                    </SuccessButton>
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-2 educare-filter-action-btn'>
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            onClick={handleSearchTeacher}
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
                                        <Link
                                        href={route('teacher.birthday_list')}
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
}
