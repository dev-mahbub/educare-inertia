import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { Transition } from "@headlessui/react";
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

const EventForm = ({
    eventTypes,
    eventLevels
}) => {
    // const eventCreateTitleInput = useRef();
    // const eventCreateTypeInput = useRef();
    // const eventCreateEventInput = useRef();
    // const eventCreateBudgetInput = useRef();
    // const eventCreateVenueInput = useRef();
    // const eventCreateDetailsInput = useRef();
    // const eventCreateUploadFileInput = useRef();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    const [startTime, setStartTime] = useState(null);

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
        event_type: "",
        event_level: "",
        start_date: "",
        end_date: "",
        start_time: "",
        event_budget: "",
        location: "",
        description: "",
        is_published: false,
        event_image: "",
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

    const dummyData = (e) => {
        e.preventDefault();
    };

    // handle save event start
    const handleEventSave = (e) => {
        e.preventDefault();

        post(route('event.save'))
    }
    // handle save event end

    const handleReset = (e) => {
        e.preventDefault();

        setStartDate(null);
        setStartTime(null);
        setEndDate(null);

        reset();
    }

    return (
        <div className="educare-event-create-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <form onSubmit={dummyData}>
                    <div className="grid grid-cols-12 gap-5 items-center">
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="title"
                                            value="Title"
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
                                <InputLabel
                                    htmlFor="event_type"
                                    value="Type"
                                />
                                <SelectInput
                                    id="event_type"
                                    data_label="Type"
                                    data={eventTypes}
                                    value={
                                        data.event_type
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "event_type",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.event_type
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="event_level"
                                    value="Event Type"
                                />
                                <SelectInput
                                    id="event_level"
                                    data_label="Event Type"
                                    data={eventLevels}
                                    value={
                                        data.event_level
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "event_level",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.event_level
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
                                    htmlFor="event_budget"
                                    value="Budget of event"
                                />
                                <TextInput
                                    id="event_budget"
                                    value={
                                        data.event_budget
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "event_budget",
                                            e.target.value
                                        )
                                    }
                                    placeHolder="Event Budget"
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.event_budget
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="location"
                                    value="Venue"
                                />
                                <TextInput
                                    id="location"
                                    value={
                                        data.location
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "location",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.location
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="description"
                                    value="Event Details"
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
                                        id="is_published"
                                        name="is_published"
                                        checked={
                                            data.is_published
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "is_published",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="is_published"
                                        value="Publish Event"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel value="Event Image" />
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="event_image"
                                        type="file"
                                        name="event_image"
                                        onChange={(e) =>
                                            setData(
                                                "event_image",
                                                e.target
                                                    .files[0]
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors.event_image
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="educare-input-field-notes">
                                <h6>Note :</h6>
                                <ul>
                                    <li>
                                        1. File format- png, bmp, jpg, jpeg File Only.
                                    </li>
                                    <li>
                                        2. Maximum File Size 1Mb.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="educare-button-field-styles mt-2.5 text-end">
                <div className="educare-button-field-styles flex flex-wrap gap-4 justify-end  border-grayLight/20">
                    <PrimaryButton
                        disabled={processing}
                        className="educare-primary-btn-lg-fill"
                        type="button"
                        onClick={(e) => {
                            handleEventSave(e)
                        }}
                    >
                        Save
                    </PrimaryButton>
                    <PrimaryButton
                        disabled={processing}
                        className="educare-gray-btn-lg-fill"
                        type="button"
                        onClick={(e) => {
                            handleReset(e)
                        }}
                    >
                        Reset
                    </PrimaryButton>
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

export default EventForm;
