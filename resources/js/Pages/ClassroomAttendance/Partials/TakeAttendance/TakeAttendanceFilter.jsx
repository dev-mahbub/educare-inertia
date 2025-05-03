import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
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
    classrooms = [],
    students = [],
    loading,
    setLoading,
    classroomAttendances,
    isCurrentDate
}) => {

    const handleSelectedStudent = (status) => {
        // // Check if the student is already in the data.students array with the same attendance status
        // const isSelected = data?.students.some((student) => student.student_id === id && student.attendance_status === status);

        // // Find the selected student in the students
        // const selectedStudent = students.find((student) => student.id === id);

        // Create a copy of the current form data
        const updatedData = { ...data };

        // Update the selected students list
        // old code
        // const updatedSelectedStudents = isSelected
        //     ? updatedData.students.filter((student) => student.student_id !== id && student.attendance_status !== status)
        //     : [
        //         ...updatedData.students[index] = {
        //             student_id: 1,
        //             attendance_status: status,
        //             admission_no: selectedStudent?.admission_no,
        //             classroom_roll: selectedStudent?.classroom_roll?.roll_no,
        //             student_name: concatName(selectedStudent?.first_name, selectedStudent?.middle_name, selectedStudent?.last_name),
        //             father_name: concatName(selectedStudent?.father?.first_name, selectedStudent?.father?.middle_name, selectedStudent?.father?.last_name),
        //         },
        //     ];
        // new code start
        const updatedSelectedStudents = students?.map((student) => ({
            student_id: student?.id,
            attendance_status: status,
            is_leave: false,
        }));

        // if (isSelected) {
        //     updatedSelectedStudents = updatedData.students.filter((student) => student != null && student.student_id !== id && student.attendance_status !== status);
        // } else if (updatedData.students.find((student) => student != null && student.student_id == id) != null) {
        //     updatedSelectedStudents = updatedData?.students?.map((student) => {
        //         if (student != null && student?.student_id == id) {
        //             return {
        //                 student_id: id,
        //                 attendance_status: status,
        //                 is_leave: isLeave,
        //             }
        //         } else {
        //             return student
        //         }
        //     })
        // } else {
        //     updatedSelectedStudents = [...updatedData?.students, {
        //         student_id: id,
        //         attendance_status: status,
        //         is_leave: isLeave,
        //     }]
        // }

        // updatedData[`present_status_${id}`] = status;
        // updatedData[`on_leave_${id}`] = isLeave;
        // new code end

        // Update the form data with the new list of selected students
        updatedData['students'] = updatedSelectedStudents;

        // Set the updated data in the state
        // setData(updatedData);
        setData((prevData) => ({
            ...prevData,
            ...updatedData
        }));
    };

    const handelSearch = (e) => {
        e.preventDefault()
        router.post(route('classroom_attendance.take_attendance'), data);
        setLoading(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if ((classroomAttendances[0]?.is_attendance_taken || !isCurrentDate) && data?.attendance_note == "") {
            toast.error("It is required to enter a reason for back date attendance for security and audit reason.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (data?.students?.length != students?.length) {
            toast.error("Please mark attendance of all student then only you can save data.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            router.post(route('classroom_attendance.take_attendance_save'), data, {
                onSuccess: () => {
                    setData((prevData) => ({
                        ...prevData,
                        attendance_note: ""
                    }));

                    router.post(route('classroom_attendance.take_attendance'), data);
                }
            });
        }
    }

    const handleChangeAttendanceDate = (date) => {
        setData((prevData) => ({
            ...prevData,
            attendance_date_at: date
        }));

        const form_data = {
            attendance_date_at: date,
            classroom_id: data?.classroom_id ?? "",
            search_value: data?.search_value ?? "",
        }

        router.post(route('classroom_attendance.take_attendance'), form_data);
    }

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    const isFutureDate = (date) => {
        // Check if the given date is in the future
        return date.getTime() < new Date().getTime();
    };

    return (
        <>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <div>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-select-field-styles">
                                    <DatePicker
                                        selected={
                                            data?.attendance_date_at
                                            && new Date(data?.attendance_date_at)
                                        }
                                        onChange={(date) => {
                                            // setData("attendance_date_at", date)
                                            handleChangeAttendanceDate(date)
                                        }
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
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) =>
                                                        setData({
                                                            ...data,
                                                            "classroom_id":
                                                                e.target.value
                                                        })
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search_value"
                                                    value={data.search_value}
                                                    onChange={(e) =>
                                                        setData({
                                                            ...data,
                                                            "search_value":
                                                                e.target.value
                                                        }
                                                        )
                                                    }
                                                    placeHolder="Search"
                                                    type="text"
                                                    className="block"
                                                />
                                            </div>
                                            <div className="educare-filter-action-btn">
                                                <Tooltip
                                                    title="Search"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="educare-secondary-btn-md-fill"
                                                        type="button"
                                                        onClick={(e) => handelSearch(e)}
                                                    >
                                                        <i className="icon-search-interface-symbol"></i>
                                                    </Link>
                                                </Tooltip>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <Tooltip
                                                    title="Present"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <span className=" h-10 min-w-[40px] leading-10 text-white text-[14px] focus:outline-none shadow-sm tracking-widest rounded-md rounded-tr-none rounded-br-none font-semibold px-4 font-primary inline-block capitalize focus:ring-2 focus:ring-offset-2 disabled:opacity-25 border bg-success border-success">
                                                        P
                                                    </span>
                                                </Tooltip>
                                                <span className="h-10 text-success text-[14px] focus:outline-none shadow-sm tracking-widest rounded-md rounded-tl-none rounded-bl-none font-semibold px-4 font-primary inline-block capitalize focus:ring-2 focus:ring-offset-2 disabled:opacity-25 leading-[38px] border border-success">
                                                    {presentCount}
                                                </span>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <Tooltip
                                                    title="Absent"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <span className=" h-10 min-w-[40px] leading-10 text-white text-[14px] focus:outline-none shadow-sm tracking-widest rounded-md rounded-tr-none rounded-br-none font-semibold px-4 font-primary inline-block capitalize focus:ring-2 focus:ring-offset-2 disabled:opacity-25 border bg-danger/80 border-danger/80">
                                                        A
                                                    </span>
                                                </Tooltip>
                                                <span className="h-10 text-danger text-[14px] focus:outline-none shadow-sm tracking-widest rounded-md rounded-tl-none rounded-bl-none font-semibold px-4 font-primary inline-block capitalize focus:ring-2 focus:ring-offset-2 disabled:opacity-25 leading-[38px] border border-danger">
                                                    {absentCount}
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
                                                        onClick={(e) => {
                                                            handleAllPresent();
                                                            handleSelectedStudent('present');
                                                        }}
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
                                                        onClick={() =>{
                                                            handleAllAbsent();
                                                            handleSelectedStudent('absent');
                                                        }}
                                                    >
                                                        Mark all absent
                                                    </button>
                                                </Tooltip>
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
                                    <div>
                                        <Tooltip
                                            title="Clear All"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                type="button"
                                                className="educare-gray-btn-md-fill"
                                            // onClick={handleAllClear}
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
                </div>
            </div>
        </>
    );
};

export default TakeAttendanceFilter;
