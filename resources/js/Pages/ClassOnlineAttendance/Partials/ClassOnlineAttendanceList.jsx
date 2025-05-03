import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClassOnlineHeader from './ClassOnlineHeader';

const ClassOnlineAttendanceList = ({
    classrooms,
    subjects,
    studentAttendances,
    currentDate
}) => {

    const [attendanceData, setAttendanceData] = useState(studentAttendances);

    const { data, setData, post, processing } = useForm({
        classroom_id: "",
        subject_id: "",
        attendance_date: new Date(),
        students: []
    });

    useEffect(() => {
        setAttendanceData(studentAttendances);
    }, [studentAttendances]);

    useEffect(() => {
        const updatedData = attendanceData?.map(item => ({
            student_id: item?.student_id,
            attendance_status: item?.attendance_status ?? ""
        }));

        setData((prevData) => ({
            ...prevData,
            students: updatedData
        }));
    }, [attendanceData]);


    //handle present absent
    const handleStudentAttendance = (id, status) => {
        const updatedAttendanceData = attendanceData?.map(student => {
            if (student.student_id == id) {
                return {
                    ...student,
                    attendance_status: status
                }
            } else {
                return student;
            }
        });

        setAttendanceData(updatedAttendanceData);
    };
    //concate name
    const concatName = (first, middle, last) => {
        return [first, middle, last].filter(Boolean).join(' ')
    };

    //handle all present
    const handleAllPresent = () => {
        const updatedAttendanceData = attendanceData?.map(student => ({
            ...student,
            attendance_status: 'present'
        }));

        setAttendanceData(updatedAttendanceData);
    };

    //handle all absent
    const handleAllAbsent = () => {
        const updatedAttendanceData = attendanceData?.map(student => ({
            ...student,
            attendance_status: 'absent'
        }));

        setAttendanceData(updatedAttendanceData);
    };

    //handle reset attendance data
    const handleResetAttendance = () => {
        const updatedAttendanceData = attendanceData?.map(student => ({
            ...student,
            attendance_status: ''
        }));

        setAttendanceData(updatedAttendanceData);
    };

    // handle attendance date change start
    const handleAttendanceDateChange = (date) => {
        setData((prevData) => ({
            ...prevData,
            attendance_date: date
        }));

        const form_data = {
            classroom_id: data?.classroom_id,
            subject_id: data?.subject_id,
            attendance_date: date,
        }

        router.post(route('online_class.attendance'), form_data);
    }
    // handle attendance date change end

    //handle submit
    const handleTakeAttendance = (e) => {
        e.preventDefault();

        post(route('online_class.save_attendance'), {
            onSuccess: () => {
                const form_data = {
                    classroom_id: data?.classroom_id,
                    subject_id: data?.subject_id,
                    attendance_date: data?.attendance_date,
                }

                router.post(route('online_class.attendance'), form_data);
            },
            onError: () => {
                toast.error("Something goes wrong", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            }
        });
    }

    // check if date is back date
    const isBackDate = (date) => {
        const attendanceDay = new Date(date)?.getDay();
        const attendanceMonth = new Date(date)?.getDay();
        const attendanceYear = new Date(date)?.getDay();
        const currentDay = new Date()?.getDay();
        const currentMonth = new Date()?.getDay();
        const currentYear = new Date()?.getDay();

        return (new Date(`${attendanceDay}-${attendanceMonth}-${attendanceYear}`).getTime()) < (new Date(`${currentDay}-${currentMonth}-${currentYear}`)?.getTime());
    }


    return (
        <>
            {/*class online header start*/}
            <ClassOnlineHeader
                classrooms={classrooms}
                subjects={subjects}
                data={data}
                setData={setData}
                currentDate={currentDate}
            />
            {/*class online header end*/}
            <div className='flex justify-between gap-5 flex-wrap my-4'>
                <div className="educare-input-field-styles">
                    <DatePicker
                        selected={data.attendance_date && new Date(data.attendance_date)}
                        onChange={(date) => handleAttendanceDateChange(date)}
                        showYearDropdown
                        showMonthDropdown
                        useShortMonthInDropdown
                        showPopperArrow={false}
                        peekNextMonth
                        dropdownMode="select"
                        isClearable
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="w-full"
                    />
                </div>
                {(isBackDate(data?.attendance_date) == false && attendanceData?.length > 0) &&
                    <div className="flex items-center gap-2 flex-wrap">
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
                        <div className="educare-header-filtar-bar-action educare-filter-action-btn flex gap-2">
                            <div>
                                <Tooltip
                                    title="Clear All"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <button
                                        type="button"
                                        className="educare-gray-btn-md-fill"
                                        onClick={handleResetAttendance}
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </button>
                                </Tooltip>
                            </div>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                type="button"
                                onClick={handleTakeAttendance}
                            >
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                }
            </div>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Roll No</th>
                                        <th>Name</th>
                                        <th>Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceData?.length > 0 ? (
                                        attendanceData?.map((student) => (
                                            <tr key={student?.student_id}>
                                                <td>{student?.roll_no}</td>
                                                <td>{concatName(student?.first_name, student?.middle_name, student?.last_name)}</td>
                                                <td>
                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                        <div className="educare-toggle-checkbox-button-styles-three">
                                                            <div className="min-width-full">
                                                                <div className="educare-radio-field-styles flex gap-3">
                                                                    <RadioInput
                                                                        name={`present_status_${student?.student_id}`}
                                                                        value="Present"
                                                                        checked={student?.attendance_status == "present"}
                                                                        onChange={() => {
                                                                            handleStudentAttendance(student?.student_id, "present");
                                                                        }}
                                                                        customClass={`input-hidden ${student?.attendance_status == "present" ? "educare-success-btn-md-fill" : "educare-success-btn-md-stroke"}`}
                                                                    />
                                                                    <RadioInput
                                                                        name={`present_status_${student?.student_id}`}
                                                                        value="Absent"
                                                                        checked={student?.attendance_status == "absent"}
                                                                        onChange={() => {
                                                                            handleStudentAttendance(student?.student_id, "absent");
                                                                        }}
                                                                        customClass={`input-hidden ${student?.attendance_status == "absent" ? "educare-danger-btn-md-fill" : "educare-danger-btn-md-stroke"}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="3">
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClassOnlineAttendanceList;
