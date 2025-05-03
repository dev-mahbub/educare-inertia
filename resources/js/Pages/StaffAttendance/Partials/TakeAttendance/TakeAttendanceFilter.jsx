import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TakeAttendanceFilter = ({
    data,
    setData,
    errors,
    presentCount,
    absentCount,
    handleAllPresent,
    handleAllAbsent,
    handleOnLeave,
    handleAllHalfDay,
    onWeekCount,
    onLeaveCount,
    halfDayCount,
    staffTypes,
    attendanceTypes,
    departments,
    isBackDateAllowed
}) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasValidationError = false;

        if(data?.selected_staff?.length > 0) {
            for (const staff of data?.selected_staff) {
                if (staff?.is_disabled == false && staff?.attendance_status == 'onleave' && ((staff?.leave_type == '' || staff?.leave_type == null || staff?.day_type == '' || staff?.day_type == null))) {
                    hasValidationError = true;

                    toast.error("Please select the leave type and day type of all those teachers who is on leave today.", {
                        position: 'top-right',
                        autoClose: 1500,
                    });

                    break;
                }
            }
        } else {
            hasValidationError = true;

            toast.error("Please select staff.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }

        if (!hasValidationError) {
            const form_data = {
                attendance_date_at: data?.attendance_date_at,
                selected_staff: data?.selected_staff
            }

            router.post(route('staff_attendance.take_attendance_save'), form_data);
        }
    }

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    const isFutureDate = (date) => {
        // Check if the given date is in the future
        return date.getTime() < new Date().getTime();
    };

    // handle filter staff attendance data start
    const handleFilterStaffData = (e) => {
        e.preventDefault();

        const form_data = {
            attendance_date_at: data?.attendance_date_at ?? "",
            staff_type: data?.staff_type ?? "",
            department_id: data?.department_id ?? "",
            attendance_type: data?.attendance_type ?? "",
        }

        router.post(route('staff_attendance.take_attendance'), form_data);
    }
    // handle filter staff attendance data end

    // handle change attendance date start
    const handleChangeAttendanceDate = (date) => {
        setData((prevData) => ({
            ...prevData,
            attendance_date_at: date
        }));

        const form_data = {
            attendance_date_at: date,
            staff_type: data?.staff_type ?? "",
            department_id: data?.department_id ?? "",
            attendance_type: data?.attendance_type ?? "",
        }

        router.post(route('staff_attendance.take_attendance'), form_data);
    }
    // handle change attendance date end

    // handle download attendance report start
    const handleDownloadAttendanceReport = (e) => {
        e.preventDefault();

        const params = {
            attendance_date: data?.attendance_date_at ?? "",
        }

        const url = route('export_excel.staff_attendance', params);

        window.open(url);
    }
    // handle download attendance report end

    return (
        <>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-select-field-styles">
                                <DatePicker
                                    selected={
                                        data?.attendance_date_at
                                        && new Date(data?.attendance_date_at)
                                    }
                                    onChange={(date) =>
                                        // setData("attendance_date_at", date)
                                        handleChangeAttendanceDate(date)
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
                                    filterDate={isFutureDate}
                                    maxDate={new Date()}
                                    minDate={isBackDateAllowed ? null : new Date()}
                                />

                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span
                                        className="educare-header-filter-prev"
                                        onClick={handlePrevClick}
                                    >
                                        <i className="icon-left-chevron"></i>
                                    </span>
                                    <div
                                        className="educare-header-filtar-bar-fields-wrap"
                                        ref={listRef}
                                        style={{
                                            transform: `translateX(-${currentIndex * 120
                                                }px)`,
                                        }}
                                    >
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Teaching Or Non Teaching"
                                                data={staffTypes}
                                                value={data.staff_type}
                                                onChange={(e) =>
                                                    setData(
                                                        "staff_type",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.staff_type}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Department"
                                                data={departments}
                                                value={
                                                    data.department_id
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "department_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.department_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Attendance Type"
                                                data={attendanceTypes}
                                                value={data.attendance_type}
                                                onChange={(e) =>
                                                    setData(
                                                        "attendance_type",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.attendance_type
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <span
                                        className="educare-header-filter-next"
                                        onClick={handleNextClick}
                                    >
                                        <i className="icon-chevron"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                <div className="educare-filter-action-btn">
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => {
                                                handleFilterStaffData(e)
                                            }}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Download Excel"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            className="educare-success-btn-md-fill"
                                            onClick={(e) => {
                                                handleDownloadAttendanceReport(e);
                                            }}
                                        >
                                            <i className="icon-FileX"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('staff_attendance.take_attendance')}
                                            type="button"
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>


                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-primary-btn-md-fill"
                                    type="button"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  status count and mark all buttonstart*/}
                <div className="col-span-12 flex-wrap flex justify-end gap-3 mb-2.5">
                    <div className="staff-attendance flex justify-center items-center">
                        <Tooltip title="Present" placement="top" arrow>
                            <span className=" staff-status bg-success border-success">
                                P
                            </span>
                        </Tooltip>
                        <span className="staff-count text-success text-[14px] border-success">
                            {presentCount}
                        </span>
                    </div>
                    <div className="staff-attendance flex justify-center items-center">
                        <Tooltip title="Absent" placement="top" arrow>
                            <span className="staff-status bg-danger/80 border-danger/80">
                                A
                            </span>
                        </Tooltip>
                        <span className="staff-count text-danger  border-danger">
                            {absentCount}
                        </span>
                    </div>
                    <div className="staff-attendance flex justify-center items-center">
                        <Tooltip title="Present" placement="top" arrow>
                            <span className="staff-status bg-warning border-warning">
                                H
                            </span>
                        </Tooltip>
                        <span className="staff-count text-warning text-[14px]  border-warning">
                            {halfDayCount}
                        </span>
                    </div>
                    <div className="staff-attendance flex justify-center items-center">
                        <Tooltip title="Absent" placement="top" arrow>
                            <span className="staff-status bg-dark/80 border-dark/80">
                                L
                            </span>
                        </Tooltip>
                        <span className="staff-count text-dark text-[14px]  border-dark">
                            {onLeaveCount}
                        </span>
                    </div>
                    <div className="staff-attendance flex justify-center items-center">
                        <Tooltip title="Absent" placement="top" arrow>
                            <span className="staff-status bg-info/80 border-info/80">
                                W
                            </span>
                        </Tooltip>
                        <span className="staff-count text-info text-[14px]  border-info">
                            {onWeekCount}
                        </span>
                    </div>
                    <div>
                        <Tooltip
                            title="Mark All Present"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <button
                                type="button"
                                className="educare-success-btn-md-stroke"
                                onClick={handleAllPresent}
                            >
                                Mark all present
                            </button>
                        </Tooltip>
                    </div>

                    <div>
                        <Tooltip
                            title="Mark All Absent"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <button
                                type="button"
                                className="educare-danger-btn-md-stroke"
                                onClick={handleAllAbsent}
                            >
                                Mark all absent
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            title="Mark All Absent"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <button
                                type="button"
                                className="educare-warning-btn-md-stroke"
                                onClick={handleAllHalfDay}
                            >
                                Mark all Halfday
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            title="Mark All Absent"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <button
                                type="button"
                                className="educare-dark-btn-md-stroke"
                                onClick={handleOnLeave}
                            >
                                Mark all Leave
                            </button>
                        </Tooltip>
                    </div>
                </div>
                {/* status count and mark all button end*/}
            </div>
        </>
    );
};

export default TakeAttendanceFilter;
