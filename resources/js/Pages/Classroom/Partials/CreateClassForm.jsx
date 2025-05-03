import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const CreateClassForm = ({
    classrooms,
    subjects,
    dayTitles,
    shiftTypes
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
        notes: "",
        repeat_date: "",
        repeatable_days: repeatableDays,
        shift_type: "",
        type: ""
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

    const handleClassInsert = (e) => {
        e.preventDefault();

        post(route("classroom.save_time_table"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStartDate(null);
                setStartTime(null);
                setEndTime(null);
                setRepeatTillDate(null);
                setRepeatableDays([]);
            },
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

        router.post(route('classroom.create_time_table'), form_data);
    }
    // handle classroom change end

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={handleClassInsert}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Class
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
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
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.classroom_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="grade"
                                                        value="Select a grade"
                                                    />
                                                    <SelectInput
                                                        id="grade"
                                                        data_label="Grade"
                                                        data={subject_grades}
                                                        value={data?.title}
                                                        onChange={(e) =>
                                                            setData(
                                                                "grade",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        required
                                                    />

                                                    <InputError
                                                        message={errors.grade}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div> */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="subject_id"
                                                                value="Select Subject"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="subject_id"
                                                        data_label="Subject"
                                                        data={subjects}
                                                        value={data?.title}
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
                                                                htmlFor="shift_type"
                                                                value="Select Shift"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="shift_type"
                                                        data_label="Shift"
                                                        data={shiftTypes}
                                                        value={data?.title}
                                                        onChange={(e) =>
                                                            setData(
                                                                "shift_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />

                                                    <InputError
                                                        message={errors.shift_type}
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
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="notes"
                                                        value="Notes"
                                                    />
                                                    <TextareaInput
                                                        id="notes"
                                                        value={
                                                            data?.notes
                                                        }
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
                                                            errors?.notes
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

                                            <div className="col-span-12">
                                                <div className="educare-radio-field-styles flex gap-3">
                                                    <RadioInput
                                                        name={'staff'}
                                                        value="Staff Timetable"
                                                        checked={data?.type == 'staff'}
                                                        onChange={(e) => {
                                                            setData('type', 'staff')
                                                        }}
                                                    />
                                                    <RadioInput
                                                        name={'student'}
                                                        value="Student Timetable"
                                                        checked={data?.type == 'student'}
                                                        onChange={(e) => {
                                                            setData('type', 'student')
                                                        }}
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            {/* <div className="col-span-12">
                                                <div className="repeat-till-date-checkbox-list flex flex-wrap gap-5">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="monday_id"
                                                                name="monday_id"
                                                                value="Monday"
                                                                checked={classDays?.includes(
                                                                    "Monday"
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        "Monday"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="monday_id"
                                                                value="Monday"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="tuesday_id"
                                                                name="tuesday_id"
                                                                value="Tuesday"
                                                                checked={classDays?.includes(
                                                                    "Tuesday"
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        "Tuesday"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="tuesday_id"
                                                                value="Tuesday"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="wednesday_id"
                                                                name="wednesday_id"
                                                                value="Wednesday"
                                                                checked={classDays?.includes(
                                                                    "Wednesday"
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        "Wednesday"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="wednesday_id"
                                                                value="Wednesday"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="thursday_id"
                                                                name="thursday_id"
                                                                value="Thursday"
                                                                checked={classDays?.includes(
                                                                    "Thursday"
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        "Thursday"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="thursday_id"
                                                                value="Thursday"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="friday_id"
                                                                name="friday_id"
                                                                value="Friday"
                                                                checked={classDays?.includes(
                                                                    "Friday"
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        "Friday"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="friday_id"
                                                                value="Friday"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="saturday_id"
                                                                name="saturday_id"
                                                                value="Saturday"
                                                                checked={classDays?.includes(
                                                                    "Saturday"
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        "Saturday"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="saturday_id"
                                                                value="Saturday"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="sunday_id"
                                                                name="sunday_id"
                                                                value="Sunday"
                                                                checked={classDays?.includes(
                                                                    "Sunday"
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        "Sunday"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="sunday_id"
                                                                value="Sunday"
                                                            />
                                                        </div>
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors?.classDays
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div> */}
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
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default CreateClassForm;
