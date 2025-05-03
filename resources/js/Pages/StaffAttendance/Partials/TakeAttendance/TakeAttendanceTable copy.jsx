import React, { useState } from "react";
import RadioInput from "@/Components/RadioInput";
import DatePicker from "react-datepicker";
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';


const TakeAttendanceTable = ({
    data,
    setData,
    errors,
    //count start
    setPresentCount,
    setAbsentCount,
    sampleData,
    setHalfDayCount,
    setOnLeaveCount,
    setOnWeekCount,
    //count end
    dutyType,
    setDutyType,
    leaveType,
    setLeaveType,
}) => {

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        if (name === "mark_all_on_extra_duty") {
            // Update the state for "mark_all_on_extra_duty" checkbox
            newFormData = {
                ...data,
                [name]: value
            };

            // Update each student's extra duty checkbox status based on the value
            sampleData.forEach(student => {
                newFormData[`extra_duty_${student.id}`] = value;
            });
        } else {
            // For individual checkboxes, update the state as usual
            newFormData = {
                ...data,
                [name]: value
            };

            // Check if all individual extra_duty checkboxes are checked
            const allChecked = sampleData.every(student => newFormData[`extra_duty_${student.id}`]);
            newFormData.mark_all_on_extra_duty = allChecked; // Update mark_all_on_extra_duty accordingly
        }

        // Set the updated form data
        setData(newFormData);
    };

    //handle Checkbox end


    //handle radio change and set count start
    const handleRadioChange = (studentId, status) => {
        //check preview status
        const prevStatus = data[`present_status_${studentId}`]
        //set radio change data in state for check specific radio button
        setData(`present_status_${studentId}`, status)

        //present count increase if status is present
        if (status === "present") {
            setPresentCount((prevCount) => prevCount + 1);
            // condition if prevStatus is absent
            if (prevStatus === "absent") {
                setAbsentCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "halfday") {
                setHalfDayCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "onleave") {
                setOnLeaveCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "onweek") {
                setOnWeekCount((prevCount) => prevCount - 1)
            }
        }
        //absent count increase if status is absent
        else if (status === "absent") {
            setAbsentCount((prevCount) => prevCount + 1)
            if (prevStatus === "present") {
                setPresentCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "halfday") {
                setHalfDayCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "onleave") {
                setOnLeaveCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "onweek") {
                setOnWeekCount((prevCount) => prevCount - 1)
            }
        }
        //halfday count increase if status is halfday
        else if (status === "halfday") {
            setHalfDayCount((prevCount) => prevCount + 1)
            if (prevStatus === "absent") {
                setAbsentCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "present") {
                setPresentCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "onleave") {
                setOnLeaveCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "onweek") {
                setOnWeekCount((prevCount) => prevCount - 1)
            }
        }
        //onleave count increase if status is onleave
        else if (status === "onleave") {
            setOnLeaveCount((prevCount) => prevCount + 1)
            if (prevStatus === "absent") {
                setAbsentCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "halfday") {
                setHalfDayCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "present") {
                setPresentCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "onweek") {
                setOnWeekCount((prevCount) => prevCount - 1)
            }
        }
        //onweek count increase if status is onweek
        else if (status === "onweek") {
            setOnWeekCount((prevCount) => prevCount + 1)
            if (prevStatus === "absent") {
                setAbsentCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "halfday") {
                setHalfDayCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "present") {
                setPresentCount((prevCount) => prevCount - 1)
            } else if (prevStatus === "onleave") {
                setOnLeaveCount((prevCount) => prevCount - 1)
            }
        }

    }
    //handle radion change and set count end


    console.log(data);
    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <form>

                    <div className="educare-admission-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Employee Id</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>
                                    <th>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="mark_all_on_extra_duty"
                                                    name="mark_all_on_extra_duty"
                                                    checked={
                                                        data.mark_all_on_extra_duty
                                                    }
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(e.target.name, e.target.checked)
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="mark_all_on_extra_duty"
                                                    value="Mark All on extra duty"
                                                />
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleData.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.Name}</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div className="educare-toggle-checkbox-button-styles-three">
                                                    <div className="min-width-full">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name={`present_status_${student.id}`}
                                                                value="Present"
                                                                checked={
                                                                    data[`present_status_${student.id}`] === "present"
                                                                }
                                                                onChange={() =>
                                                                    handleRadioChange(
                                                                        student.id,
                                                                        "present"
                                                                    )
                                                                }
                                                                customClass={`input-hidden ${data[
                                                                    `present_status_${student.id}`
                                                                ] ===
                                                                    "present"
                                                                    ? "educare-success-btn-md-fill"
                                                                    : "educare-success-btn-md-stroke"
                                                                    }`}
                                                            />
                                                            <RadioInput
                                                                name={`present_status_${student.id}`}
                                                                value="Absent"
                                                                checked={
                                                                    data[
                                                                    `present_status_${student.id}`
                                                                    ] ===
                                                                    "absent"
                                                                }
                                                                onChange={() =>
                                                                    handleRadioChange(
                                                                        student.id,
                                                                        "absent"
                                                                    )
                                                                }
                                                                customClass={`input-hidden ${data[
                                                                    `present_status_${student.id}`
                                                                ] ===
                                                                    "absent"
                                                                    ? "educare-danger-btn-md-fill"
                                                                    : "educare-danger-btn-md-stroke"
                                                                    }`}
                                                            />

                                                            <RadioInput
                                                                name={`present_status_${student.id}`}
                                                                value="halfday"
                                                                checked={
                                                                    data[
                                                                    `present_status_${student.id}`
                                                                    ] ===
                                                                    "halfday"
                                                                }
                                                                onChange={() =>
                                                                    handleRadioChange(
                                                                        student.id,
                                                                        "halfday"
                                                                    )
                                                                }
                                                                customClass={`input-hidden ${data[
                                                                    `present_status_${student.id}`
                                                                ] ===
                                                                    "halfday"
                                                                    ? "educare-warning-btn-md-fill"
                                                                    : "educare-warning-btn-md-stroke"
                                                                    }`}
                                                            />
                                                            <RadioInput
                                                                name={`present_status_${student.id}`}
                                                                value="OnLeave"
                                                                checked={
                                                                    data[
                                                                    `present_status_${student.id}`
                                                                    ] ===
                                                                    "onleave"
                                                                }
                                                                onChange={() =>
                                                                    handleRadioChange(
                                                                        student.id,
                                                                        "onleave"
                                                                    )
                                                                }
                                                                customClass={`input-hidden ${data[
                                                                    `present_status_${student.id}`
                                                                ] ===
                                                                    "onleave"
                                                                    ? "educare-dark-btn-md-fill"
                                                                    : "educare-dark-btn-md-stroke"
                                                                    }`}
                                                            />
                                                            <RadioInput
                                                                name={`present_status_${student.id}`}
                                                                value="WeeklyOff"
                                                                checked={
                                                                    data[
                                                                    `present_status_${student.id}`
                                                                    ] ===
                                                                    "onweek"
                                                                }
                                                                onChange={() =>
                                                                    handleRadioChange(
                                                                        student.id,
                                                                        "onweek"
                                                                    )
                                                                }
                                                                customClass={`input-hidden ${data[
                                                                    `present_status_${student.id}`
                                                                ] ===
                                                                    "onweek"
                                                                    ? "educare-secondary-btn-md-fill"
                                                                    : "educare-secondary-btn-md-stroke"
                                                                    }`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                data[`present_status_${student.id}`] === "onleave" ? (
                                                    <h5 className="text-headingLight mt-1">Leave will be auto approved as per the attendance rule</h5>
                                                ) : ""
                                            }
                                        </td>
                                        <td>
                                            {
                                                data[`present_status_${student.id}`] === "present" || data[`present_status_${student.id}`] === "halfday" ? (
                                                    <div className="flex gap-2">
                                                        <div className="educare-input-field-styles min-w-[100px] max-w-[120px]">
                                                            <DatePicker
                                                                selected={
                                                                    data[`start_time_${student.id}`] && new Date(data[`start_time_${student.id}`])
                                                                }
                                                                onChange={(date) =>
                                                                    setData({
                                                                        ...data,
                                                                        [`start_time_${student.id}`]: date
                                                                    })
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
                                                                placeholderText="In time"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                        <div className="educare-input-field-styles min-w-[100px] max-w-[120px]">
                                                            <DatePicker
                                                                selected={
                                                                    data[`end_time_${student.id}`] && new Date(data[`end_time_${student.id}`])
                                                                }
                                                                onChange={(date) =>
                                                                    setData({
                                                                        ...data,
                                                                        [`end_time_${student.id}`]: date
                                                                    })
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
                                                                placeholderText="Out time"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : ""
                                            }
                                            {
                                                data[`present_status_${student.id}`] === "onleave" ? (
                                                    <div className="educare-input-field-styles max-w-[180px]">
                                                        <SelectInput
                                                            data_label="Leave Type(Leave Taken / Assigned Leave)"
                                                            data={[]}
                                                            value={
                                                                leaveType[`select_leave_${student.id}`]
                                                            }
                                                            onChange={(e) =>
                                                                setLeaveType({
                                                                    ...leaveType,
                                                                    [`select_leave_${student.id}`]: e.target.value
                                                                })
                                                            }
                                                            className="block"
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                        <td>
                                            {
                                                data[`present_status_${student.id}`] === "present" || data[`present_status_${student.id}`] === "halfday" ? (
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name={`outdoor_duty_${student.id}`}
                                                                checked={data[`outdoor_duty_${student.id}`] || false}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        e.target.name,
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`outdoor_duty_${student.id}`}
                                                                value="Outdoor Duty"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                        <td>
                                            {
                                                data[`outdoor_duty_${student.id}`] === true ? (
                                                    <div className="col-span-12 md:col-span-6">
                                                        <div className="educare-input-field-styles-px-8 max-w-[120px] mb-1 ml-1">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={dutyType[`duty_${student.id}`] || ""}
                                                                    onChange={(e) =>
                                                                        setDutyType({
                                                                            ...dutyType,
                                                                            [`duty_${student.id}`]: e.target.value
                                                                        })
                                                                    }
                                                                    className="block"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : <div></div>
                                            }
                                            {
                                                data[`present_status_${student.id}`] === "absent" || data[`present_status_${student.id}`] === "onleave" || data[`present_status_${student.id}`] === "onweek" ?
                                                    "" :
                                                    (
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document ml-1">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`extra_duty_${student.id}`}
                                                                    name={`extra_duty_${student.id}`}
                                                                    checked={
                                                                        data[`extra_duty_${student.id}`] || false
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleCheckboxSelect(e.target.name, e.target.checked)
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={`extra_duty_${student.id}`}
                                                                    value="Extra Duty"
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TakeAttendanceTable;
