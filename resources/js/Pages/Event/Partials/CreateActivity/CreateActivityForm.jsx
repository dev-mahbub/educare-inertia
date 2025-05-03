import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { Transition } from "@headlessui/react";
import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

const CreateActivityForm = ({
    eventData
}) => {

    const [startDate, setStartDate] = useState(eventData?.start_datetime ? new Date(eventData?.start_datetime) : null);
    const [endDate, setEndDate] = useState(eventData?.end_datetime ? new Date(eventData?.end_datetime) : null)
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        title: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        description: "",
        is_group_activity: false,
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

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_time: startTime
        }));
    }, [startTime]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_time: endTime
        }));
    }, [endTime]);

    const dummyData = (e) => {
        e.preventDefault();
    };

    // handle save event start
    const handleEventActivitySave = (e) => {
        e.preventDefault();

        post(route('event.activity.save', eventData?.id), {
            onSuccess: () => {
                setStartDate(null);
                setEndDate(null);
                setStartTime(null);
                setEndTime(null);

                reset();
            }
        })
    }
    // handle save event end

    return (
        <div className="educare-event-create-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 gap-5 items-center">
                    <div className="col-span-12">
                        <div className="educare-input-field-styles flex items-center">
                            <div
                                className="mr-2"
                            >
                                <InputLabel
                                    className="!mb-0"
                                    htmlFor="title"
                                    value="Event Title:"
                                />
                            </div>
                            <h3
                                className="font-bold text-[23px]"
                            >
                                {eventData?.title}
                            </h3>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        htmlFor="title"
                                        value="Activity Title"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <TextInput
                                id="title"
                                value={
                                    data.title
                                }
                                onChange={(e) =>
                                    setData(
                                        "title",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.title
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        value="Start Date"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
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
                            <InputError
                                message={
                                    errors.start_date
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        value="End Date"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) =>
                                    setEndDate(date)
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
                            <InputError
                                message={
                                    errors.end_date
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                value="Start Time"
                            />
                            <DatePicker
                                selected={startTime}
                                onChange={(date) =>
                                    setStartTime(date)
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
                            <InputError
                                message={
                                    errors.start_time
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                value="End Time"
                            />
                            <DatePicker
                                selected={endTime}
                                onChange={(date) =>
                                    setEndTime(date)
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
                            <InputError
                                message={
                                    errors.end_time
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <TextareaInput
                                id="description"
                                value={
                                    data.description
                                }
                                onChange={(e) =>
                                    setData(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="block"
                                placeholder="Description"
                            />
                            <InputError
                                message={
                                    errors.description
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                            <div className="educare-create-school-settings-list-check width-full">
                                <Checkbox
                                    id="is_group_activity"
                                    name="is_group_activity"
                                    checked={
                                        data.is_group_activity
                                    }
                                    onChange={(e) =>
                                        setData("is_group_activity", e.target.checked)
                                    }
                                />
                            </div>
                            <div className="educare-create-school-settings-list-title width-full">
                                <InputLabel
                                    htmlFor="is_group_activity"
                                    value="Is Group Activity"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="educare-button-field-styles mt-2.5 text-end">
                <div className="educare-button-field-styles flex flex-wrap gap-4 justify-end  border-grayLight/20">
                    <PrimaryButton
                        disabled={processing}
                        className="educare-primary-btn-lg-fill"
                        type="button"
                        onClick={(e) => {
                            handleEventActivitySave(e)
                        }}
                    >
                        Save
                    </PrimaryButton>
                    <Link
                        href={route('event.details', eventData?.id)}
                        className="educare-gray-btn-lg-fill"
                    >
                        Cancel
                    </Link>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Save</p>
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default CreateActivityForm;
