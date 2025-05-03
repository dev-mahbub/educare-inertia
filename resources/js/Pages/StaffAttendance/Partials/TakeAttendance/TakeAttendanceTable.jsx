import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import RadioInput from "@/Components/RadioInput";
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { concatName } from '@/Hooks/GlobalFunction';
import DatePicker from "react-datepicker";


const TakeAttendanceTable = ({
    data,
    setData,
    errors,
    //count start
    setPresentCount,
    setAbsentCount,
    allStaff,
    setHalfDayCount,
    setOnLeaveCount,
    setOnWeekCount,
    //count end
    // dutyType,
    // setDutyType,
    // leaveType,
    // setLeaveType,
    staffAttendance,
    leaveTypes,
    dayTypes
}) => {

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        // let newFormData;

        // if (name === "mark_all_on_extra_duty") {
        //     // Update the state for "mark_all_on_extra_duty" checkbox
        //     newFormData = {
        //         ...data,
        //         [name]: value
        //     };

        //     // Update each staff's extra duty checkbox status based on the value
        //     allStaff.forEach(staff => {
        //         newFormData[`extra_duty_${staff.id}`] = value;
        //     });
        // } else {
        //     // For individual checkboxes, update the state as usual
        //     newFormData = {
        //         ...data,
        //         [name]: value
        //     };

        //     // Check if all individual extra_duty checkboxes are checked
        //     const allChecked = allStaff.every(staff => newFormData[`extra_duty_${staff.id}`]);
        //     newFormData.mark_all_on_extra_duty = allChecked; // Update mark_all_on_extra_duty accordingly
        // }

        // // Set the updated form data
        // setData(newFormData);

        const updatedSelectedStaffs = allStaff?.map((staff) => {
            const selectedStaff = data?.selected_staff.find((item) => item != null && item?.staff_id == staff?.id);

            if (selectedStaff != null) {
                return {
                    ...selectedStaff,
                    is_extra_duty: selectedStaff?.is_disabled == false ? value : selectedStaff?.is_extra_duty
                }
            } else {
                return {
                    staff_id: staff?.id,
                    attendance_status: "",
                    is_absent: false,
                    is_halfday: false,
                    is_leave: false,
                    is_present: false,
                    is_weekly_off: false,
                    in_time: "",
                    out_time: "",
                    leave_type: "",
                    leave_type_id: "",
                    is_outdoor_duty: false,
                    is_extra_duty: value,
                    duty_type: "",
                    day_type: "",
                    is_disabled: false
                }
            }
        });

        setData((prevData) => ({
            ...prevData,
            selected_staff: updatedSelectedStaffs
        }));
    };

    //handle Checkbox end


    //handle radio change and set count start
    const handleRadioChange = (staffId, status) => {
        const selected_staff = data?.selected_staff?.find(staff => staff != null && staff?.staff_id == staffId);

        if (selected_staff != null && selected_staff?.is_disabled == false) {
            //check preview status
            const prevStatus = selected_staff?.attendance_status;

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
    }
    //handle radion change and set count end

    // handle change attendance form data start
    const handleChangeAttendanceFormData = (id, name, value) => {
        const updatedData = { ...data };

        let updatedSelectedStaff = [];

        const selectedStaff = updatedData.selected_staff.find((staff) => staff != null && staff.staff_id == id);

        const newData = {
            in_time: "",
            out_time: "",
            leave_type: "",
            leave_type_id: name == 'leave_type' ? leaveTypes?.find(item => item?.id == value)?.leave_type_id : "",
            is_outdoor_duty: false,
            is_extra_duty: false,
            duty_type: "",
            day_type: ""
        }

        if (selectedStaff != null) {
            updatedSelectedStaff = updatedData?.selected_staff?.map((staff) => {
                if (staff != null && staff?.staff_id == id && staff?.is_disabled == false) {
                    let leaveTypeId = "";

                    if (name == 'leave_type') {
                        leaveTypeId = leaveTypes?.find(item => item?.id == value)?.leave_type_id;
                    }
                    else if (staff?.attendance_status == 'onleave')  {
                        leaveTypeId = leaveTypes?.find(item => item?.id == staff?.leave_type)?.leave_type_id;
                    }

                    return {
                        ...newData,
                        ...staff,
                        is_outdoor_duty: staff?.is_outdoor_duty ?? false,
                        is_extra_duty: staff?.is_extra_duty ?? false,
                        leave_type_id: leaveTypeId,
                        [name] : value,
                    }
                } else {
                    return staff
                }
            });
        } else {
            updatedSelectedStaff = [...updatedData?.selected_staff, {
                staff_id: id,
                attendance_status: "",
                is_present: false,
                is_absent: false,
                is_halfday: false,
                is_leave: false,
                is_weekly_off: false,
                is_disabled: false,
                ...newData,
                [name]: value,
            }]
        }

        // Set the updated data in the state
        setData((prevData) => ({
            ...prevData,
            selected_staff: updatedSelectedStaff
        }));
    }
    // handle change attendance form data end


    const handleSelectedStaff = (
        id,
        index,
        status,
        is_present = false,
        is_absent = false,
        is_halfday = false,
        is_leave = false,
        is_weekly_off = false,
    ) => {
        const isSelected = data?.selected_staff.some((staff) => staff.staff_id == id && staff.attendance_status == status);
        const updatedData = { ...data };

        // Update the selected students list
        // const updatedSelectedStaff = isSelected
        //     ? updatedData.selected_staff.filter((staff) => staff.staff_id !== id && staff.attendance_status !== status)
        //     : [
        //         ...updatedData.selected_staff[index] = {
        //             staff_id: id,
        //             attendance_status: status,
        //             is_present: is_present,
        //             is_absent: is_absent,
        //             is_halfday: is_halfday,
        //             is_leave: is_leave,
        //             is_weekly_off: is_weekly_off,
        //             // present_info: {},
        //         },
        //     ];

        let updatedSelectedStaff = [];

        const selectedStaff = updatedData.selected_staff.find((staff) => staff != null && staff.staff_id == id);

        if (isSelected) {
            if (selectedStaff?.is_disabled == false) {
                updatedSelectedStaff = updatedData.selected_staff.filter((staff) => staff != null && staff.staff_id != id && staff.attendance_status != status);
            }
        } else if (selectedStaff != null) {
            updatedSelectedStaff = updatedData?.selected_staff?.map((staff) => {
                if (staff != null && staff?.staff_id == id && staff?.is_disabled == false) {
                    return {
                        ...staff,
                        staff_id: id,
                        attendance_status: status,
                        is_present: is_present,
                        is_absent: is_absent,
                        is_halfday: is_halfday,
                        is_leave: is_leave,
                        is_weekly_off: is_weekly_off,
                        is_outdoor_duty: status == 'present' || status == 'halfday' ? staff?.is_outdoor_duty : false,
                        is_extra_duty: status == 'present' || status == 'halfday' ? staff?.is_extra_duty : false,
                        duty_type: status == 'present' || status == 'halfday' ? staff?.duty_type : "",
                    }
                } else {
                    return staff
                }
            })
        } else {
            updatedSelectedStaff = [...updatedData?.selected_staff, {
                staff_id: id,
                attendance_status: status,
                is_present: is_present,
                is_absent: is_absent,
                is_halfday: is_halfday,
                is_leave: is_leave,
                is_weekly_off: is_weekly_off,
                in_time: "",
                out_time: "",
                leave_type: "",
                leave_type_id: "",
                is_outdoor_duty: false,
                is_extra_duty: false,
                duty_type: "",
                is_disabled: false,
                day_type: ""
            }]
        }

        // Set the updated data in the state
        setData((prevData) => ({
            ...prevData,
            selected_staff: updatedSelectedStaff
        }));
    };

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
                                                        data?.selected_staff?.filter(item => item?.is_disabled == false)?.some(item => item?.is_extra_duty == false) != true && data?.selected_staff?.length == allStaff?.length
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
                                {allStaff.map((staff, index) => (
                                    <tr key={index}>
                                        <td>{staff.employee_id}</td>
                                        <td>{concatName(staff?.first_name, staff?.middle_name, staff?.last_name)}</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div className="educare-toggle-checkbox-button-styles-three">
                                                    <div className="min-width-full">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name={`present_status_${staff.id}`}
                                                                value="Present"
                                                                // checked={
                                                                //     data[`present_status_${staff.id}`] === "present"
                                                                // }
                                                                checked={
                                                                    data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "present"
                                                                }
                                                                onChange={(e) => {
                                                                    handleRadioChange(staff.id, "present")
                                                                    handleSelectedStaff(staff.id, index, "present", true, false, false, false, false);
                                                                    // id, index, is_present, is_absent, is_halfday, is_leave, is_weekly_off
                                                                }
                                                                }
                                                                customClass={`input-hidden ${data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "present"
                                                                    ? "educare-success-btn-md-fill"
                                                                    : "educare-success-btn-md-stroke"
                                                                    }`}
                                                                // customClass={`input-hidden ${data[
                                                                //     `present_status_${staff.id}`
                                                                // ] ===
                                                                //     "present"
                                                                //     ? "educare-success-btn-md-fill"
                                                                //     : "educare-success-btn-md-stroke"
                                                                //     }`}
                                                                disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                            />
                                                            <RadioInput
                                                                name={`present_status_${staff.id}`}
                                                                value="Absent"
                                                                // checked={
                                                                //     data[
                                                                //     `present_status_${staff.id}`
                                                                //     ] ===
                                                                //     "absent"
                                                                // }
                                                                checked={
                                                                    data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "absent"
                                                                }
                                                                onChange={(e) => {
                                                                    handleRadioChange(staff.id, "absent")
                                                                    handleSelectedStaff(staff.id, index, "absent", false, true, false, false, false);
                                                                    // id, index, is_present, is_absent, is_halfday, is_leave, is_weekly_off
                                                                }
                                                                }
                                                                customClass={`input-hidden ${data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "absent"
                                                                    ? "educare-danger-btn-md-fill"
                                                                    : "educare-danger-btn-md-stroke"
                                                                    }`}
                                                                // customClass={`input-hidden ${data[
                                                                //     `present_status_${staff.id}`
                                                                // ] ===
                                                                //     "absent"
                                                                //     ? "educare-danger-btn-md-fill"
                                                                //     : "educare-danger-btn-md-stroke"
                                                                //     }`}
                                                                disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                            />

                                                            <RadioInput
                                                                name={`present_status_${staff.id}`}
                                                                value="halfday"
                                                                // checked={
                                                                //     data[
                                                                //     `present_status_${staff.id}`
                                                                //     ] ===
                                                                //     "halfday"
                                                                // }
                                                                checked={
                                                                    data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status ==
                                                                    "halfday"
                                                                }
                                                                onChange={(e) => {
                                                                    handleRadioChange(staff.id, "halfday")
                                                                    handleSelectedStaff(staff.id, index, "halfday", false, false, true, false, false);
                                                                    // id, index, is_present, is_absent, is_halfday, is_leave, is_weekly_off
                                                                }
                                                                }
                                                                customClass={`input-hidden ${data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status ==
                                                                    "halfday"
                                                                    ? "educare-warning-btn-md-fill"
                                                                    : "educare-warning-btn-md-stroke"
                                                                    }`}
                                                                // customClass={`input-hidden ${data[
                                                                //     `present_status_${staff.id}`
                                                                // ] ===
                                                                //     "halfday"
                                                                //     ? "educare-warning-btn-md-fill"
                                                                //     : "educare-warning-btn-md-stroke"
                                                                //     }`}
                                                                disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                            />
                                                            <RadioInput
                                                                name={`present_status_${staff.id}`}
                                                                value="OnLeave"
                                                                checked={
                                                                    data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "onleave"
                                                                }
                                                                // checked={
                                                                //     data[
                                                                //     `present_status_${staff.id}`
                                                                //     ] ===
                                                                //     "onleave"
                                                                // }
                                                                onChange={(e) => {
                                                                    handleRadioChange(staff.id, "onleave")
                                                                    handleSelectedStaff(staff.id, index, "onleave", false, false, false, true, false);
                                                                    // id, index, is_present, is_absent, is_halfday, is_leave, is_weekly_off
                                                                }
                                                                }
                                                                customClass={`input-hidden ${data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "onleave"
                                                                    ? "educare-dark-btn-md-fill"
                                                                    : "educare-dark-btn-md-stroke"
                                                                    }`}
                                                                // customClass={`input-hidden ${data[
                                                                //     `present_status_${staff.id}`
                                                                // ] ===
                                                                //     "onleave"
                                                                //     ? "educare-dark-btn-md-fill"
                                                                //     : "educare-dark-btn-md-stroke"
                                                                //     }`}
                                                                disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                            />
                                                            <RadioInput
                                                                name={`present_status_${staff.id}`}
                                                                value="WeeklyOff"
                                                                // checked={
                                                                //     data[
                                                                //     `present_status_${staff.id}`
                                                                //     ] ===
                                                                //     "onweek"
                                                                // }
                                                                checked={
                                                                    data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status ==
                                                                    "onweek"
                                                                }
                                                                // onChange={() =>
                                                                //     handleRadioChange(
                                                                //         staff.id,
                                                                //         "onweek"
                                                                //     )
                                                                // }
                                                                onChange={(e) => {
                                                                    handleRadioChange(staff.id, "onweek")
                                                                    handleSelectedStaff(staff.id, index, "onweek", false, false, false, false, true);
                                                                    // id, index, is_present, is_absent, is_halfday, is_leave, is_weekly_off
                                                                }
                                                                }
                                                                customClass={`input-hidden ${data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status ==
                                                                    "onweek"
                                                                    ? "educare-secondary-btn-md-fill"
                                                                    : "educare-secondary-btn-md-stroke"
                                                                    }`}
                                                                // customClass={`input-hidden ${data[
                                                                //     `present_status_${staff.id}`
                                                                // ] ===
                                                                //     "onweek"
                                                                //     ? "educare-secondary-btn-md-fill"
                                                                //     : "educare-secondary-btn-md-stroke"
                                                                //     }`}
                                                                disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true &&
                                                    data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status === "onleave" ? (
                                                    <h5 className="text-danger mt-1">You can't change attendance of this staff as leave is approved</h5>
                                                ) : ""
                                            }

                                            {
                                                data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == false &&
                                                data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status === "onleave" ? (
                                                    <h5 className="text-headingLight mt-1">Leave will be auto approved as per the attendance rule</h5>
                                                ) : ""
                                            }
                                        </td>
                                        <td>
                                            {
                                                data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status === "present" || data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status === "halfday" ? (
                                                    <div className="flex gap-2">
                                                        <div className="educare-input-field-styles min-w-[100px] max-w-[120px]">
                                                            <DatePicker
                                                                selected={
                                                                    data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.in_time && new Date(data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.in_time)
                                                                }
                                                                onChange={(date) =>
                                                                    // setData({
                                                                    //     ...data,
                                                                    //     [`start_time_${staff.id}`]: date
                                                                    // })

                                                                    handleChangeAttendanceFormData(staff.id, 'in_time', date)
                                                                }
                                                                // onChange={(startTime) => {
                                                                //     handleRadioChange(staff.id, "onweek")
                                                                //     handleSelectedStaff(staff.id, index, "onweek", false, false, false, false, true, startTime);
                                                                //     // id, index, is_present, is_absent, is_halfday, is_leave, is_weekly_off
                                                                // }}
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
                                                                disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                            />
                                                        </div>
                                                        <div className="educare-input-field-styles min-w-[100px] max-w-[120px]">
                                                            <DatePicker
                                                                selected={
                                                                    data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.out_time && new Date(data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.out_time)
                                                                }
                                                                onChange={(date) =>
                                                                    // setData({
                                                                    //     ...data,
                                                                    //     [`end_time_${staff.id}`]: date
                                                                    // })
                                                                    handleChangeAttendanceFormData(staff.id, 'out_time', date)
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
                                                                disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : ""
                                            }
                                            {
                                                data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "onleave" ? (
                                                    <div className="educare-input-field-styles max-w-[180px]">
                                                        <SelectInput
                                                            data_label="Leave Type(Leave Taken / Assigned Leave)"
                                                            data={leaveTypes}
                                                            value={
                                                                data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.leave_type
                                                            }
                                                            onChange={(e) =>
                                                                // setLeaveType({
                                                                //     ...leaveType,
                                                                //     [`select_leave_${staff.id}`]: e.target.value
                                                                // })
                                                                handleChangeAttendanceFormData(staff.id, 'leave_type', e.target.value)
                                                            }
                                                            className="block"
                                                            disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                        <td>
                                            {data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "onleave" && data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.leave_type &&
                                                <div className="educare-input-field-styles max-w-[180px]">
                                                    <SelectInput
                                                        id="day_type"
                                                        data_label="Day Type"
                                                        data={dayTypes}
                                                        value={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.day_type}
                                                        onChange={(e) =>
                                                            handleChangeAttendanceFormData(staff.id, 'day_type', e.target.value)
                                                        }
                                                        className="block"
                                                        disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                    />
                                                </div>
                                            }

                                            {
                                                data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "present" || data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "halfday" ? (
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name={`outdoor_duty_${staff.id}`}
                                                                checked={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_outdoor_duty ?? false}
                                                                onChange={(e) =>
                                                                    // setData(
                                                                    //     e.target.name,
                                                                    //     e.target.checked
                                                                    // )
                                                                    handleChangeAttendanceFormData(staff.id, 'is_outdoor_duty', e.target.checked)
                                                                }
                                                                disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`outdoor_duty_${staff.id}`}
                                                                value="Outdoor Duty"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                        <td>
                                            {
                                                data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_outdoor_duty == true ? (
                                                    <div className="col-span-12 md:col-span-6">
                                                        <div className="educare-input-field-styles-px-8 max-w-[120px] mb-1 ml-1">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.duty_type ?? ""
                                                                    }
                                                                    onChange={(e) =>
                                                                        // setDutyType({
                                                                        //     ...dutyType,
                                                                        //     [`duty_${staff.id}`]: e.target.value
                                                                        // })
                                                                        handleChangeAttendanceFormData(staff.id, 'duty_type', e.target.value)
                                                                    }
                                                                    className="block"
                                                                    disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : <div></div>
                                            }
                                            {
                                                data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "absent" || data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "onleave" || data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.attendance_status == "onweek" ?
                                                    "" :
                                                    (
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document ml-1">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`extra_duty_${staff.id}`}
                                                                    name={`extra_duty_${staff.id}`}
                                                                    checked={
                                                                        data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_extra_duty ?? false
                                                                    }
                                                                    onChange={(e) =>{
                                                                        // handleCheckboxSelect('is_extra_duty', e.target.checked)
                                                                        handleChangeAttendanceFormData(staff.id, 'is_extra_duty', e.target.checked)
                                                                        }
                                                                    }
                                                                    disabled={data?.selected_staff?.find(item => item?.staff_id == staff?.id)?.is_disabled == true}
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={`extra_duty_${staff.id}`}
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
