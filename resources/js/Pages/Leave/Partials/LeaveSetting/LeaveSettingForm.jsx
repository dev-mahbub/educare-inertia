import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

const LeaveSettingForm = ({
    leaveSetting
}) => {

    const { data, setData, errors, post, reset, processing } = useForm({
        is_auto_approve_leave_enabled: false,
        is_half_day_leave_enabled: false,
        rule_one_in_time: "",
        rule_two_total_hour: "",
        is_rule_one_in_time_enabled: false,
        is_rule_two_total_hour_enabled: false,
        is_saturday_exceptional: false,
        is_sunday_exceptional: false,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            is_auto_approve_leave_enabled: leaveSetting?.is_auto_approve_leave_enabled ?? false,
            is_half_day_leave_enabled: leaveSetting?.is_half_day_leave_enabled ?? false,
            rule_one_in_time: leaveSetting?.rule_one_in_time ? convertTimeToDate(leaveSetting.rule_one_in_time) : "",
            rule_two_total_hour: leaveSetting?.rule_two_total_hour ?? "",
            is_rule_one_in_time_enabled: leaveSetting?.is_rule_one_in_time_enabled ?? false,
            is_rule_two_total_hour_enabled: leaveSetting?.is_rule_two_total_hour_enabled ?? false,
            is_saturday_exceptional: leaveSetting?.is_saturday_exceptional ?? false,
            is_sunday_exceptional: leaveSetting?.is_sunday_exceptional ?? false,
        }));
    }, [leaveSetting]);

    const handleCheckboxChange = (name, value) => {
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLeaveSetting = (e) => {
        e.preventDefault();

        post(route('leave.setting.save'), {
            onSuccess: () => {

            },
            onError: () => {

            }
        });
    };

    // helper method to convert time to date start
    function convertTimeToDate(timeString) {
        const [hours, minutes, seconds] = timeString.split(':');
        const date = new Date();

        date.setHours(hours, minutes, seconds || 0);

        return date;
    }
    // helper method to convert time to date end


    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-GridFour"></i>
                    Leave Settings
                </h5>
            </div>
            <form onSubmit={handleLeaveSetting}>
                {/* Auto Leave Approval Settings */}
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-title">
                            <h5>
                                <i className="icon-settting"></i>
                                Auto Leave Approval Settings
                            </h5>
                        </div>
                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Auto approve Leaves</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-stylesr">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="is_auto_approve_leave_enabled"
                                                                    value="On"
                                                                    checked={data.is_auto_approve_leave_enabled == true}
                                                                    onChange={() => setData("is_auto_approve_leave_enabled", true)}
                                                                />
                                                                <RadioInput
                                                                    name="is_auto_approve_leave_enabled"
                                                                    value="Off"
                                                                    checked={data.is_auto_approve_leave_enabled == false}
                                                                    onChange={() => setData("is_auto_approve_leave_enabled", false)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Half Day Leave Settings */}
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-title">
                            <h5>
                                <i className="icon-settting"></i>
                                Half Day Leave Settings
                            </h5>
                        </div>
                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Calculate Half Day</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-stylesr">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="is_half_day_leave_enabled"
                                                                    value="On"
                                                                    checked={data.is_half_day_leave_enabled == true}
                                                                    onChange={() => setData("is_half_day_leave_enabled", true)}
                                                                />
                                                                <RadioInput
                                                                    name="is_half_day_leave_enabled"
                                                                    value="Off"
                                                                    checked={data.is_half_day_leave_enabled == false}
                                                                    onChange={() => setData("is_half_day_leave_enabled", false)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enable half day checkbox */}
                                        {data.is_half_day_leave_enabled == true && (
                                            <>
                                                <div className="col-span-12">
                                                    <div className="grid grid-cols-12 gap-5">
                                                        <div className="lg:col-span-8 col-span-12">
                                                            <div className="flex flex-wrap gap-3">
                                                                <div>
                                                                    <Checkbox
                                                                        id="is_rule_one_in_time_enabled"
                                                                        name="is_rule_one_in_time_enabled"
                                                                        checked={data.is_rule_one_in_time_enabled}
                                                                        onChange={(e) => handleCheckboxChange("is_rule_one_in_time_enabled", e.target.checked ? true : false)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p>
                                                                        <span className="font-semibold">Rule 1:</span>{" "}
                                                                        Attendance will be marked as{" "}
                                                                        <span className="font-semibold">"Half Day"</span> after the
                                                                        entered time
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="lg:col-span-4 col-span-12">
                                                            {data.is_rule_one_in_time_enabled == true && (
                                                                <div className="educare-input-field-styles">
                                                                    <DatePicker
                                                                        selected={data?.rule_one_in_time}
                                                                        // selected={data?.rule_one_in_time && new Date(data?.rule_one_in_time)}
                                                                        onChange={(date) => setData("rule_one_in_time", date)}
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
                                                                        placeholderText="Entered time"
                                                                        className="w-full"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-12">
                                                    <div className="grid grid-cols-12 gap-5">
                                                        <div className="lg:col-span-8 col-span-12">
                                                            <div className="flex flex-wrap gap-3">
                                                                <div>
                                                                    <Checkbox
                                                                        id="is_rule_two_total_hour_enabled"
                                                                        name="is_rule_two_total_hour_enabled"
                                                                        checked={data.is_rule_two_total_hour_enabled}
                                                                        onChange={(e) => handleCheckboxChange("is_rule_two_total_hour_enabled", e.target.checked ? true : false)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p>
                                                                        <span className="font-semibold">Rule 2:</span>{" "}
                                                                        Attendance will be marked as{" "}
                                                                        <span className="font-semibold">"Half Day"</span> if not
                                                                        completed entered hours
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="lg:col-span-4 col-span-12">
                                                            {data.is_rule_two_total_hour_enabled == true && (
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="rule_two_total_hour"
                                                                        value={data.rule_two_total_hour}
                                                                        placeHolder="Total Hours"
                                                                        onChange={(e) => setData("rule_two_total_hour", e.target.value)}
                                                                        className="block"
                                                                    />
                                                                    <InputError message={errors.rule_two_total_hour} className="mt-2" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {(data.is_rule_one_in_time_enabled == true || data.is_rule_two_total_hour_enabled == true) && (
                                            <>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="is_saturday_exceptional"
                                                                name="is_saturday_exceptional"
                                                                checked={data.is_saturday_exceptional}
                                                                onChange={(e) => handleCheckboxChange("is_saturday_exceptional", e.target.checked ? true : false)}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel htmlFor="is_saturday_exceptional" value="Saturday" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="is_sunday_exceptional"
                                                                name="is_sunday_exceptional"
                                                                checked={data.is_sunday_exceptional}
                                                                onChange={(e) => handleCheckboxChange("is_sunday_exceptional", e.target.checked ? true : false)}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel htmlFor="is_sunday_exceptional" value="Sunday" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 mt-5">
                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                        <PrimaryButton
                            className="educare-primary-btn-lg-fill"
                            type="submit"
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </>
    );
};

export default LeaveSettingForm;
