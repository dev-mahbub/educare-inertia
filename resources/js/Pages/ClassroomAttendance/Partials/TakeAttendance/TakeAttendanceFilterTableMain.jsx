import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import TakeAttendanceFilter from './TakeAttendanceFilter';
import TakeAttendanceTable from './TakeAttendanceTable';

const TakeAttendanceFilterTableMain = ({
    classrooms = [],
    students = [],
    absentStudents,
    presentStudents,
    classroomAttendances,
}) => {
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isCurrentDate, setIsCurrentDate] = useState(false);

    // const sampleData = [
    //     { id: 1, rollNo: "11", admNo: "DM0020", Name: "Rakib", Father: "Sakib" },
    //     { id: 2, rollNo: "12", admNo: "SM0020", Name: "Monir", Father: "Morshed" },
    //     { id: 3, rollNo: "13", admNo: "PM0020", Name: "Abid", Father: "Nabid" },
    // ];


    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        attendance_date_at: new Date(),
        classroom_id: "",
        search_value: "",
        present_status: "",
        attendance_note: "",
        on_leave: "",
        students: [],
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            students: classroomAttendances[0]?.students ? JSON.parse(classroomAttendances[0]?.students) : []
        }))
    }, [classroomAttendances]);


    const handleAllPresent = () => {
        // const updatedData = {};
        // students.forEach((student) => {
        //     const studentId = student.id;
        //     updatedData[`present_status_${studentId}`] = "present";
        // });

        // setData((prevData) => ({
        //     ...prevData,
        //     ...updatedData
        // }));
        setPresentCount(students.length);
        setAbsentCount(0);
    };

    const handleAllAbsent = () => {
        // const updatedData = {};
        // students.forEach((student) => {
        //     const studentId = student.id;
        //     updatedData[`present_status_${studentId}`] = "absent";
        // });
        // setData((prevData) => ({
        //     ...prevData,
        //     ...updatedData
        // }));
        setAbsentCount(students.length);
        setPresentCount(0);
    };

    useEffect(() => {
        setLoading(false);
    }, [students]);

    useEffect(() => {
        if (data?.attendance_date_at != "") {
            const today = new Date();

            const is_current = data?.attendance_date_at.getFullYear() === today.getFullYear() &&
                data?.attendance_date_at.getMonth() === today.getMonth() &&
                data?.attendance_date_at.getDate() === today.getDate();

            setIsCurrentDate(is_current);
        }
    }, [data?.attendance_date_at]);


    return (
        <>
            <TakeAttendanceFilter
                data={data}
                setData={setData}
                errors={errors}
                presentCount={presentCount}
                absentCount={absentCount}
                handleAllPresent={handleAllPresent}
                handleAllAbsent={handleAllAbsent}
                classrooms={classrooms}
                students={students}
                loading={loading}
                setLoading={setLoading}
                classroomAttendances={classroomAttendances}
                isCurrentDate={isCurrentDate}
            />
            <TakeAttendanceTable
                data={data}
                setData={setData}
                students={students}
                presentCount={presentCount}
                absentCount={absentCount}
                setPresentCount={setPresentCount}
                setAbsentCount={setAbsentCount}
                loading={loading}
                setLoading={setLoading}
                absentStudents={absentStudents}
                presentStudents={presentStudents}
                classroomAttendances={classroomAttendances}
                isCurrentDate={isCurrentDate}
            />
        </>
    );
};

export default TakeAttendanceFilterTableMain;
