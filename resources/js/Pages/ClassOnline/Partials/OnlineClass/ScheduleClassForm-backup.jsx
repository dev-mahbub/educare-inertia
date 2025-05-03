import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import DatePicker from "react-datepicker";

const ScheduleClassForm = ({
    subject_titles,
    subject_grades,
    classNames,
    classrooms,
    subjects,
    dayTitles
}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [repeatTillDate, setRepeatTillDate] = useState(new Date());
    const [classDays, setClassDays] = useState([]);

    const handleCheckboxChange = (value) => {
        if (classDays.includes(value)) {
            setClassDays(classDays.filter((item) => item !== value));
        } else {
            setClassDays([...classDays, value]);
        }
    };

    const { data, setData, errors, post, reset, processing } = useForm({
        subject_id: "",
        class_name_id: "",
        start_date_at: "",
        end_date_at: "",
        start_time_at: "",
        end_time_at: "",
        live_class_url: "",
        class_notes: "",
        repeatable_days: classDays,
        grade: "",
    });

    const studentDetailsData = (e) => {
        e.preventDefault();

        data.start_date_at = startDate;
        data.end_date_at = repeatTillDate;
        data.start_time_at = startTime;
        data.end_time_at = startDate;
        data.repeatable_days = classDays;

        post(route("online_class.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

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
                                                    <InputLabel
                                                        htmlFor="class_name_id"
                                                        value="Select class name"
                                                    />
                                                    <SelectInput
                                                        id="class_name_id"
                                                        data_label="class name"
                                                        data={classNames}
                                                        value={
                                                            data?.class_name_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "class_name_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.class_name_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="grade"
                                                        value="Select grade"
                                                    />
                                                    <SelectInput
                                                        id="grade"
                                                        data_label="Grade"
                                                        data={subject_grades}
                                                        value={
                                                            subject_grades.title
                                                        }
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
                                            </div>
                                            <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="subject_id"
                                                        value="Select subject"
                                                    />
                                                    <SelectInput
                                                        id="subject_id"
                                                        data_label="Subject"
                                                        data={subject_titles}
                                                        value={
                                                            subject_titles.title
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
                                                    <InputLabel
                                                        htmlFor="start_date_at"
                                                        value="Class starts on"
                                                    />
                                                    <DatePicker
                                                        selected={startDate}
                                                        id="start_date_at"
                                                        name="start_date_at"
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
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="start_time_at"
                                                        value="Time start"
                                                    />
                                                    <DatePicker
                                                        id="start_time_at"
                                                        name="start_time_at"
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
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="end_time_at"
                                                        value="Time end"
                                                    />
                                                    <DatePicker
                                                        name="end_time_at"
                                                        id="end_time_at"
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
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="live_class_url"
                                                        value="Video conferencing link"
                                                    />
                                                    <TextInput
                                                        id="live_class_url"
                                                        value={
                                                            data.live_class_url
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
                                                            errors.video_conferencing_link
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="class_notes"
                                                        value="Notes"
                                                    />
                                                    <TextareaInput
                                                        id="class_notes"
                                                        value={data.class_notes}
                                                        onChange={(e) =>
                                                            setData(
                                                                "class_notes",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.class_notes
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="end_date_at"
                                                        value="Repeat till date"
                                                    />
                                                    <DatePicker
                                                        id="end_date_at"
                                                        name="end_date_at"
                                                        selected={
                                                            repeatTillDate
                                                        }
                                                        onChange={(date) =>
                                                            setRepeatTillDate(
                                                                date
                                                            )
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
                                                            errors.end_date_at
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="repeat-till-date-checkbox-list flex flex-wrap gap-5">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="monday_id"
                                                                name="monday_id"
                                                                value="Monday"
                                                                checked={classDays.includes(
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
                                                                checked={classDays.includes(
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
                                                                checked={classDays.includes(
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
                                                                checked={classDays.includes(
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
                                                                checked={classDays.includes(
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
                                                                checked={classDays.includes(
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
                                                                checked={classDays.includes(
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
