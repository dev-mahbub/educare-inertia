import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const ScheduleClassForm = ({
    classrooms,
    subjects,
    dayTitles
}) => {
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [repeatTillDate, setRepeatTillDate] = useState(null);
    const [repeatableDays, setRepeatableDays] = useState([]);

    const { data, setData, errors, post, reset, processing } = useForm({
        classroom_id: "",
        subject_id: "",
        start_date: "",
        start_time: "",
        end_time: "",
        live_class_url: "",
        notes: "",
        repeat_date: "",
        repeatable_days: repeatableDays
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            repeatable_days: repeatableDays
        }));
    }, [repeatableDays]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: startDate
        }));
    }, [startDate]);

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

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            repeat_date: repeatTillDate
        }));
    }, [repeatTillDate]);

    const studentDetailsData = (e) => {
        e.preventDefault();

        post(route("online_class.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    // handle checkbox select start
    const handleCheckboxChange = (value) => {
        if (repeatableDays.includes(value)) {
            setRepeatableDays(repeatableDays.filter((item) => item !== value));
        } else {
            setRepeatableDays([...repeatableDays, value]);
        }
    };
    // handle checkbox select end

    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            subject_id: ""
        }));

        const form_data = {
            classroom_id: classroom_id
        }

        router.post(route('online_class.create'), form_data);
    }
    // handle classroom change end


    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={studentDetailsData}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Schedule Class
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="classroom_id"
                                                                value="Select Class"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="classroom_id"
                                                        data_label="Class"
                                                        data={classrooms}
                                                        value={
                                                            data?.classroom_id
                                                        }
                                                        onChange={(e) =>
                                                            handleClassroomChange(e)
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.classroom_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="subject_id"
                                                                value="Select subject"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="subject_id"
                                                        data_label="Subject"
                                                        data={subjects}
                                                        value={
                                                            data?.subject_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "subject_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.subject_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="start_date"
                                                                value="Class starts on"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={startDate}
                                                        id="start_date"
                                                        name="start_date"
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
                                                        placeholderText="Date"
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
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="start_time"
                                                                value="Time start"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        id="start_time"
                                                        name="start_time"
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
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="end_time"
                                                                value="Time end"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        name="end_time"
                                                        id="end_time"
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
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="live_class_url"
                                                                value="Video conferencing link"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="live_class_url"
                                                        value={
                                                            data?.live_class_url
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "live_class_url",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="url"
                                                        className="block"
                                                        placeHolder="Add video conferencing Link (For example - Google Meet, Zoom Meeting Link)"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.live_class_url
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="notes"
                                                        value="Notes"
                                                    />
                                                    <TextareaInput
                                                        id="notes"
                                                        value={data?.notes}
                                                        onChange={(e) =>
                                                            setData(
                                                                "notes",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.notes
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="repeat_date"
                                                        value="Repeat till date"
                                                    />
                                                    <DatePicker
                                                        id="repeat_date"
                                                        name="repeat_date"
                                                        selected={
                                                            repeatTillDate
                                                        }
                                                        onChange={(date) =>
                                                            setRepeatTillDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Repeat till date"
                                                        className="w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.repeat_date
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="repeat-till-date-checkbox-list flex flex-wrap gap-5">
                                                    {(data?.repeat_date && dayTitles?.length > 0) &&
                                                        dayTitles?.map((dayTitle, index) => (
                                                            <div key={index} className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        id={dayTitle?.toLowerCase()}
                                                                        name={dayTitle?.toLowerCase()}
                                                                        value={dayTitle}
                                                                        checked={repeatableDays.includes(dayTitle)}
                                                                        onChange={() =>
                                                                            handleCheckboxChange(dayTitle)
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <InputLabel
                                                                        htmlFor={dayTitle?.toLowerCase()}
                                                                        value={dayTitle}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <InputError
                                                        message={
                                                            errors.repeatable_days
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Permanent address form end */}
                        </div>
                    </div>
                </div>
                <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
                    <PrimaryButton
                        disabled={processing}
                        className="educare-educare-primary-btn-fill"
                    >
                        Schedule
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default ScheduleClassForm;
