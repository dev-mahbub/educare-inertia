import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import Loader from "@/Components/Loader";
import RadioInput from "@/Components/RadioInput";
import TextInput from "@/Components/TextInput";
import { concatName } from "@/Hooks/GlobalFunction";
import { useEffect, useState } from "react";
import AddNotePopup from "./AddNotePopup/AddNotePopup";


const TakeAttendanceTable = ({
    setPresentCount,
    setAbsentCount,
    students,
    data,
    setData,
    loading,
    setLoading,
    absentStudents = [],
    presentStudents = [],
    classroomAttendances = [],
    isCurrentDate
}) => {

    const [selectedStudent, setSelectedStudent] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    useEffect(() => {
        if (selectedStudentId != null) {
            setSelectedStudent(students?.find(student => student?.id == selectedStudentId));
        }
    }, [students, selectedStudentId]);

    //handle radio change and count change
    const handleRadioChange = (studentId, status) => {
        // Create a copy of the current form data
        // const newData = { ...data };

        // Get the previous status
        // const prevStatus = newData[`present_status_${studentId}`];
        const prevStatus = data?.students?.find(student => student != null && student?.student_id == studentId)?.attendance_status;

        // Uncheck the other radio button
        // newData[`present_status_${studentId}`] = status;

        // Clear the checkbox when the "Present" radio button is clicked
        // newData[`on_leave_${studentId}`] = false;

        // Update the form data
        // setData(newData);

        // Update the present and absent counts based on the previous and new status
        if (prevStatus === "present") {
            setPresentCount((prevCount) => prevCount - 1);
        } else if (prevStatus === "absent") {
            setAbsentCount((prevCount) => prevCount - 1);
        }

        if (status === "present") {
            setPresentCount((prevCount) => prevCount + 1);
        } else if (status === "absent") {
            setAbsentCount((prevCount) => prevCount + 1);
        }
    };

    //handle check box change and count change----------------
    const handleCheckboxChange = (studentId, isChecked) => {
        // Create a copy of the current form data
        // const newData = { ...data };

        // Get the previous status
        // const prevStatus = newData[`present_status_${studentId}`];
        const prevStatus = data?.students?.find(student => student != null && student?.student_id == studentId)?.attendance_status;

        // newData[`on_leave_${studentId}`] = isChecked;

        if (isChecked && prevStatus !== "absent") {
            // newData[`present_status_${studentId}`] = "absent";
            setAbsentCount((prevCount) => prevCount + 1);

            // If the previous status was "present", decrease the present count
            if (prevStatus === "present") {
                setPresentCount((prevCount) => prevCount - 1);
            }
        } else if (!isChecked && prevStatus === "absent") {
            // If the checkbox is unchecked and the previous status was "absent",
            // unclick the "Absent" radio button and update the absent count
            // newData[`present_status_${studentId}`] = "";
            setAbsentCount((prevCount) => prevCount - 1);
        }

        // setData(newData);
    };

    //modal  for add note
    const [modalNotesOpen, setModalNotesOpen] = useState(false);

    const handleModalNotesClick = () => {
        setModalNotesOpen(!modalNotesOpen);
    };

    const handleSelectedStudent = (id, index, status, isLeave) => {
        // Check if the student is already in the data.students array with the same attendance status
        const isSelected = data?.students.some((student) => student != null && student.student_id === id && student.attendance_status === status);

        // Find the selected student in the students
        // const selectedStudent = students.find((student) => student.id === id);

        // Create a copy of the current form data
        const updatedData = { ...data };

        // Update the selected students list
        // old code
        // const updatedSelectedStudents = isSelected
        //     ? updatedData.students.filter((student) => student.student_id !== id && student.attendance_status !== status)
        //     : [
        //         ...updatedData.students[index] = {
        //             student_id: id,
        //             attendance_status: status,
        //             is_leave: isLeave,
        //             // admission_no: selectedStudent?.admission_no,
        //             // classroom_roll: selectedStudent?.classroom_roll?.roll_no,
        //             // student_name: concatName(selectedStudent?.first_name, selectedStudent?.middle_name, selectedStudent?.last_name),
        //             // father_name: concatName(selectedStudent?.father?.first_name, selectedStudent?.father?.middle_name, selectedStudent?.father?.last_name),
        //         },
        //     ];

        // new code start
        let updatedSelectedStudents = [];

        if(isSelected) {
            updatedSelectedStudents = updatedData.students.filter((student) => student != null && student.student_id !== id && student.attendance_status !== status);
        } else if (updatedData.students.find((student) => student != null && student.student_id == id) != null){
            updatedSelectedStudents = updatedData?.students?.map((student) => {
                if (student != null && student?.student_id == id) {
                    return {
                        student_id: id,
                        attendance_status: status,
                        is_leave: isLeave,
                    }
                } else {
                    return student
                }
            })
        } else  {
            updatedSelectedStudents = [...updatedData?.students, {
                student_id: id,
                attendance_status: status,
                is_leave: isLeave,
            }]
        }

        // updatedData[`present_status_${id}`] = status;
        // updatedData[`on_leave_${id}`] = isLeave;
        // new code end

        // Update the form data with the new list of selected students
        updatedData.students = updatedSelectedStudents;

        // Set the updated data in the state
        setData((prevData) => ({
            ...prevData,
            ...updatedData
        }));
    };

    useEffect(() => {
        // Create a copy of the current form data
        // const newData = { ...data };

        // presentStudents.forEach(stdId => {
        //     newData[`present_status_${stdId}`] = 'present';
        // });

        // absentStudents.forEach(stdId => {
        //     newData[`present_status_${stdId}`] = 'absent';
        // });

        setPresentCount(presentStudents.length);
        setAbsentCount(absentStudents.length);
        // setData(newData);

    }, [presentStudents, absentStudents]);

    return (
        <>
            {students?.length > 0 && (classroomAttendances[0]?.is_attendance_taken || !isCurrentDate) ?
                <div className="educare-input-field-styles mt-6 mb-6 max-[300px]:">
                    <TextInput
                        id="attendance_note"
                        value={data.attendance_note}
                        onChange={(e) =>
                            setData({
                                ...data,
                                "attendance_note":
                                    e.target.value
                            }
                            )
                        }

                        placeHolder="Please enter reason for back date attendance"
                        type="text"
                        className="block"
                        required
                    />
                </div> : ''}
            <div className="educare-admission-list-inner-wrapper">
                <form>
                    <div className="educare-admission-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Roll No.</th>
                                    <th>Adm.No</th>
                                    <th>Name</th>
                                    <th>Father</th>
                                    <th>Status</th>
                                    <th>On Leave</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <Loader></Loader>
                            ) : (
                                <tbody>
                                    {students?.length > 0 ? (
                                        students?.map((student, index) => (
                                            <tr key={student.id}>
                                                <td>{student?.classroom_roll?.roll_no}</td>
                                                <td>{student?.admission_no}</td>
                                                <td>{concatName(student?.first_name, student?.middle_name, student?.last_name)}</td>
                                                <td>{concatName(student?.father?.first_name, student?.father?.middle_name, student?.father?.last_name)}</td>
                                                <td>
                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                        <div className="educare-toggle-checkbox-button-styles-three">
                                                            <div className="min-width-full">
                                                                <div className="educare-radio-field-styles flex gap-3">
                                                                    <RadioInput
                                                                        name={`present_status_${student.id}`}
                                                                        value="Present"
                                                                        // checked={data[`present_status_${student.id}`] === "present"}
                                                                        checked={data?.students?.find(item => item != null && item?.student_id == student?.id)?.attendance_status == "present"}
                                                                        onChange={(e) => {
                                                                            handleRadioChange(student.id, "present");
                                                                            handleSelectedStudent(student.id, index, "present", false);
                                                                        }}
                                                                        customClass={`input-hidden ${data?.students?.find(item => item != null && item?.student_id == student?.id)?.attendance_status == "present" ? "educare-success-btn-md-fill" : "educare-success-btn-md-stroke"}`}
                                                                        // customClass={`input-hidden ${data[`present_status_${student.id}`] === "present" ? "educare-success-btn-md-fill" : "educare-success-btn-md-stroke"}`}
                                                                    />
                                                                    <RadioInput
                                                                        name={`present_status_${student.id}`}
                                                                        value="Absent"
                                                                        // checked={data[`present_status_${student.id}`] === "absent"}
                                                                        checked={data?.students?.find(item => item != null && item?.student_id == student.id)?.attendance_status == "absent"}
                                                                        onChange={() => {
                                                                            handleRadioChange(student.id, "absent")
                                                                            handleSelectedStudent(student.id, index, "absent", false);
                                                                        }}
                                                                        customClass={`input-hidden ${data?.students?.find(item => item != null && item?.student_id == student?.id)?.attendance_status == "absent" ? "educare-danger-btn-md-fill" : "educare-danger-btn-md-stroke"}`}
                                                                        // customClass={`input-hidden ${data[`present_status_${student.id}`] === "absent" ? "educare-danger-btn-md-fill" : "educare-danger-btn-md-stroke"}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="ml-2">
                                                            <button
                                                                type="button"
                                                                className="educare-gray-btn-md-fill"
                                                                onClick={() => {
                                                                    setSelectedStudentId(student?.id)
                                                                    handleModalNotesClick();
                                                                }}
                                                            >
                                                                Add Notes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`on_leave_${student.id}`}
                                                                name={`on_leave_${student.id}`}
                                                                // checked={data[`on_leave_${student.id}`] || false}
                                                                checked={data?.students?.find(item => item != null && item?.student_id == student.id)?.is_leave}
                                                                onChange={(e) => {
                                                                    handleCheckboxChange(student.id, e.target.checked);
                                                                    handleSelectedStudent(student.id, index, "absent", e.target.checked);
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`on_leave_${student.id}`}
                                                                value="On Leave"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            )}
                        </table>
                    </div>
                </form>
            </div>
            <AddNotePopup
                modalNotesOpen={modalNotesOpen}
                setModalNotesOpen={setModalNotesOpen}
                selectedStudent={selectedStudent}
                setSelectedStudentId={setSelectedStudentId}
                formData={data}
            />
        </>
    );
};

export default TakeAttendanceTable;
