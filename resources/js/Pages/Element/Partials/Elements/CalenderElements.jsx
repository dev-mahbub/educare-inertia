import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import React from "react";
import DatePicker from "react-datepicker";

const CalenderElements = () => {
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
        end_date: new Date(),
        null_date: null,
        disable_future_date: new Date(),
        start_time: new Date(),
        end_time: new Date(),
        null_time: null,
    });

    const dummyData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };
    const isFutureDate = (date) => {
        // Check if the given date is in the future
        return date.getTime() < new Date().getTime();
    };

    return (
        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
            <h5 className="text-[16px] text-headingLight font-primary mb-3 font-semibold">
                Calender Style
            </h5>
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel value="Start Date" />
                            <DatePicker
                                selected={
                                    data?.start_date && new Date(data?.start_date) 
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
                                placeholderText="Start date"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel value="End Date" />
                            <DatePicker
                                selected={
                                    data?.end_date && new Date(data?.end_date) 
                                }
                                onChange={(date) =>
                                    setData("end_date", date)
                                }
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
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel value="Default Value Null" />
                            <DatePicker
                                selected={
                                    data?.null_date && new Date(data?.null_date) 
                                }
                                onChange={(date) =>
                                    setData("null_date", date)
                                }
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                                showPopperArrow={false}
                                peekNextMonth
                                dropdownMode="select"
                                isClearable
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select Date"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel value="Can't Select Future Date" />
                            <DatePicker
                                selected={data?.disable_future_date && new Date(data?.disable_future_date)}
                                onChange={(date) => setData("disable_future_date", date)}
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
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel value="Start Time" />
                            <DatePicker
                                selected={
                                    data?.start_time && new Date(data?.start_time) 
                                }
                                onChange={(date) =>
                                    setData("start_time", date)
                                }
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                                showPopperArrow={false}
                                peekNextMonth
                                dropdownMode="select"
                                isClearable
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={1}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                placeholderText="Start time"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel value="End Time" />
                            <DatePicker
                                selected={
                                    data?.end_time && new Date(data?.end_time) 
                                }
                                onChange={(date) =>
                                    setData("end_time", date)
                                }
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                                showPopperArrow={false}
                                peekNextMonth
                                dropdownMode="select"
                                isClearable
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={1}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                placeholderText="End time"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel value="Default Value Null" />
                            <DatePicker
                                selected={
                                    data?.null_time && new Date(data?.null_time) 
                                }
                                onChange={(date) =>
                                    setData("null_time", date)
                                }
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                                showPopperArrow={false}
                                peekNextMonth
                                dropdownMode="select"
                                isClearable
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={1}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                placeholderText="Select time"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CalenderElements;
