import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import TakeAttendanceFilter from './TakeAttendanceFilter';
import TakeAttendanceTable from './TakeAttendanceTable';

const TakeAttendanceFilterTableMain = ({
    allStaff = [],
    staffTypes,
    attendanceTypes,
    departments,
    staffAttendance,
    leaveTypes,
    isBackDateAllowed,
    dayTypes
}) => {
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [halfDayCount, setHalfDayCount] = useState(0);
    const [onLeaveCount, setOnLeaveCount] = useState(0);
    const [onWeekCount, setOnWeekCount] = useState(0);

    // const [dutyType, setDutyType] = useState({});
    // const [leaveType, setLeaveType] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        //filter
        attendance_date_at: new Date(),
        start_time: null,
        end_time: null,
        select_class: "",
        student_search: "",
        //table data
        present_status: "",
        on_leave: "",
        // select all table data new added value
        mark_all_on_extra_duty: false,
        selected_staff: [],

        staff_type: "",
        department_id: "",
        attendance_type: "",
    });

    useEffect(() => {
        const attendanceData = staffAttendance?.staffs ? JSON.parse(staffAttendance?.staffs) : [];

        setData((prevData) => ({
            ...prevData,
            selected_staff: attendanceData?.map(item => ({
                ...item,
                leave_type_id: item?.attendance_status == 'onleave' && !item?.leave_type_id? leaveTypes?.find(leaveType => leaveType?.id == item?.leave_type)?.leave_type_id : '',
                is_disabled: staffAttendance?.is_attendance_taken == true && item?.attendance_status == 'onleave' ? true : false
            })),
        }));
    }, [staffAttendance]);


    useEffect(() => {
        setPresentCount(data?.selected_staff?.filter(staff => staff?.attendance_status == "present")?.length ?? 0);
        setAbsentCount(data?.selected_staff?.filter(staff => staff?.attendance_status == "absent")?.length ?? 0);
        setHalfDayCount(data?.selected_staff?.filter(staff => staff?.attendance_status == "halfday")?.length ?? 0);
        setOnLeaveCount(data?.selected_staff?.filter(staff => staff?.attendance_status == "onleave")?.length ?? 0);
        setOnWeekCount(data?.selected_staff?.filter(staff => staff?.attendance_status == "onweek")?.length ?? 0);
    }, [data?.selected_staff]);

    // All type selet all data handle start

    //handle for present all student
    const handleAllPresent = () => {
        const updatedSelectedStaffs = allStaff?.map((staff) => {
            const selectedStaff = data?.selected_staff.find((item) => item != null && item?.staff_id == staff?.id);

            if (selectedStaff != null) {
                let newData = {};

                if (selectedStaff?.is_disabled == false) {
                    newData = {
                        staff_id: staff?.id,
                        attendance_status: "present",
                        is_absent: false,
                        is_halfday: false,
                        is_leave: false,
                        is_present: true,
                        is_weekly_off: false,
                    }
                }

                return {
                    ...selectedStaff,
                    ...newData
                }
            } else {
                return {
                    staff_id: staff?.id,
                    attendance_status : "present",
                    is_absent : false,
                    is_halfday : false,
                    is_leave : false,
                    is_present : true,
                    is_weekly_off :false,
                    in_time: "",
                    out_time: "",
                    leave_type: "",
                    leave_type_id: "",
                    is_outdoor_duty: false,
                    is_extra_duty: false,
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

        setPresentCount(allStaff?.length);
        setAbsentCount(0);
        setHalfDayCount(0);
        setOnLeaveCount(0);
        setOnWeekCount(0);
    };

    //handle for absent all student
    const handleAllAbsent = () => {
        const updatedSelectedStaffs = allStaff?.map((staff) => {
            const selectedStaff = data?.selected_staff.find((item) => item != null && item?.staff_id == staff?.id);

            if (selectedStaff != null) {
                let newData = {};

                if (selectedStaff?.is_disabled == false) {
                    newData = {
                        staff_id: staff?.id,
                        attendance_status: "absent",
                        is_absent: true,
                        is_halfday: false,
                        is_leave: false,
                        is_present: false,
                        is_weekly_off: false,
                        is_outdoor_duty: false,
                        is_extra_duty: false,
                        duty_tpye: ""
                    }
                }

                return {
                    ...selectedStaff,
                    ...newData
                }
            } else {
                return {
                    staff_id: staff?.id,
                    attendance_status: "absent",
                    is_absent: true,
                    is_halfday: false,
                    is_leave: false,
                    is_present: false,
                    is_weekly_off: false,
                    in_time: "",
                    out_time: "",
                    leave_type: "",
                    leave_type_id: "",
                    is_outdoor_duty: false,
                    is_extra_duty: false,
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

        setAbsentCount(allStaff.length);
        setPresentCount(0);
        setHalfDayCount(0);
        setOnLeaveCount(0);
        setOnWeekCount(0);
    };

    //handle for halfday all student
    const handleAllHalfDay = () => {
        const updatedSelectedStaffs = allStaff?.map((staff) => {
            const selectedStaff = data?.selected_staff.find((item) => item != null && item?.staff_id == staff?.id);

            if (selectedStaff != null) {
                let newData = {};

                if (selectedStaff?.is_disabled == false) {
                    newData = {
                        staff_id: staff?.id,
                        attendance_status: "halfday",
                        is_absent: false,
                        is_halfday: true,
                        is_leave: false,
                        is_present: false,
                        is_weekly_off: false,
                    }
                }

                return {
                    ...selectedStaff,
                    ...newData
                }
            } else {
                return {
                    staff_id: staff?.id,
                    attendance_status: "halfday",
                    is_absent: false,
                    is_halfday: true,
                    is_leave: false,
                    is_present: false,
                    is_weekly_off: false,
                    in_time: "",
                    out_time: "",
                    leave_type: "",
                    leave_type_id: "",
                    is_outdoor_duty: false,
                    is_extra_duty: false,
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

        setHalfDayCount(allStaff.length);
        setPresentCount(0);
        setAbsentCount(0);
        setOnLeaveCount(0);
        setOnWeekCount(0);
    };

    //handle for onleave all student
    const handleOnLeave = () => {
        const updatedSelectedStaffs = allStaff?.map((staff) => {
            const selectedStaff = data?.selected_staff.find((item) => item != null && item?.staff_id == staff?.id);

            if (selectedStaff != null) {
                let newData = {};

                if (selectedStaff?.is_disabled == false) {
                    newData = {
                        staff_id: staff?.id,
                        attendance_status: "onleave",
                        is_absent: false,
                        is_halfday: false,
                        is_leave: true,
                        is_present: false,
                        is_weekly_off: false,
                        is_outdoor_duty: false,
                        is_extra_duty: false,
                        duty_tpye: ""
                    }
                }

                return {
                    ...selectedStaff,
                    ...newData
                }
            } else {
                return {
                    staff_id: staff?.id,
                    attendance_status: "onleave",
                    is_absent: false,
                    is_halfday: false,
                    is_leave: true,
                    is_present: false,
                    is_weekly_off: false,
                    in_time: "",
                    out_time: "",
                    leave_type: "",
                    leave_type_id: "",
                    is_outdoor_duty: false,
                    is_extra_duty: false,
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

        setOnLeaveCount(allStaff.length);
        setPresentCount(0);
        setAbsentCount(0);
        setHalfDayCount(0);
        setOnWeekCount(0);
    };
    // All type selet all data handle end


    return (
        <>
            <form>
                <TakeAttendanceFilter
                    data={data}
                    setData={setData}
                    errors={errors}
                    presentCount={presentCount}
                    absentCount={absentCount}
                    handleAllPresent={handleAllPresent}
                    handleAllAbsent={handleAllAbsent}
                    //
                    halfDayCount={halfDayCount}
                    onLeaveCount={onLeaveCount}
                    onWeekCount={onWeekCount}
                    handleAllHalfDay={handleAllHalfDay}
                    handleOnLeave={handleOnLeave}
                    staffTypes={staffTypes}
                    attendanceTypes={attendanceTypes}
                    departments={departments}
                    isBackDateAllowed={isBackDateAllowed}
                />
                <TakeAttendanceTable
                    data={data}
                    setData={setData}
                    errors={errors}
                    allStaff={allStaff}
                    presentCount={presentCount}
                    absentCount={absentCount}
                    setPresentCount={setPresentCount}
                    setAbsentCount={setAbsentCount}
                    //
                    halfDayCount={halfDayCount}
                    onLeaveCount={onLeaveCount}
                    onWeekCount={onWeekCount}
                    setHalfDayCount={setHalfDayCount}
                    setOnLeaveCount={setOnLeaveCount}
                    setOnWeekCount={setOnWeekCount}
                    //
                    // dutyType={dutyType}
                    // setDutyType={setDutyType}
                    // leaveType={leaveType}
                    // setLeaveType={setLeaveType}
                    staffAttendance={staffAttendance}
                    leaveTypes={leaveTypes}
                    dayTypes={dayTypes}
                />
            </form>
        </>
    );
};

export default TakeAttendanceFilterTableMain;
