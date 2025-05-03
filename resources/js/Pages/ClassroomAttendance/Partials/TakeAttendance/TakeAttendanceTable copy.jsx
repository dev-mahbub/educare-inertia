import React, { useState } from "react";
import RadioInput from "@/Components/RadioInput"
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import AddNotePopup from "./AddNotePopup/AddNotePopup";
import { concatName } from "@/Hooks/GlobalFunction";


const TakeAttendanceTable = ({ setPresentCount, setAbsentCount, sampleData, data, setData }) => {


    //handle radio change and count change
    const handleRadioChange = (studentId, status) => {
        // Create a copy of the current form data
        const newData = { ...data };

        // Get the previous status
        const prevStatus = newData[`present_status_${studentId}`];

        // Uncheck the other radio button
        newData[`present_status_${studentId}`] = status;

        // Clear the checkbox when the "Present" radio button is clicked
        newData[`on_leave_${studentId}`] = false;

        // Update the form data
        setData(newData);

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
        const newData = { ...data };

        // Get the previous status
        const prevStatus = newData[`present_status_${studentId}`];

        newData[`on_leave_${studentId}`] = isChecked;

        if (isChecked && prevStatus !== "absent") {
            newData[`present_status_${studentId}`] = "absent";
            setAbsentCount((prevCount) => prevCount + 1);

            // If the previous status was "present", decrease the present count
            if (prevStatus === "present") {
                setPresentCount((prevCount) => prevCount - 1);
            }
        } else if (!isChecked && prevStatus === "absent") {
            // If the checkbox is unchecked and the previous status was "absent",
            // unclick the "Absent" radio button and update the absent count
            newData[`present_status_${studentId}`] = "";
            setAbsentCount((prevCount) => prevCount - 1);
        }

        setData(newData);
    };

    //modal  for add note
    const [modalNotesOpen, setModalNotesOpen] = useState(false);

    const handleModalNotesClick = () => {
        setModalNotesOpen(!modalNotesOpen);
    };

    const handleSelectedStudent = (id) => {
        const isSelected = data?.students.some((student) => student.student_id === id);
        const updatedSelectedStudents = isSelected
            ? data.students.filter((student) => student.student_id !== id)
            : [...data.students, { student_id: id, admission_no: student?.admission_no }];

        setData({ ...data, 'students': updatedSelectedStudents });
    }

    return (
        <>
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
                            <tbody>
                                {sampleData.map((student) => (
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
                                                                checked={data[`present_status_${student.id}`] === "present"}
                                                                onChange={(e) => {
                                                                    handleRadioChange(student.id, "present");
                                                                    handleSelectedStudent(student.id);
                                                                }}
                                                                customClass={`input-hidden ${data[`present_status_${student.id}`] === "present" ? "educare-success-btn-md-fill" : "educare-success-btn-md-stroke"}`}
                                                            />
                                                            <RadioInput
                                                                name={`present_status_${student.id}`}
                                                                value="Absent"
                                                                checked={data[`present_status_${student.id}`] === "absent"}
                                                                onChange={() => handleRadioChange(student.id, "absent")}
                                                                customClass={`input-hidden ${data[`present_status_${student.id}`] === "absent" ? "educare-danger-btn-md-fill" : "educare-danger-btn-md-stroke"}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ml-2">
                                                    <button
                                                        type="button"
                                                        className="educare-gray-btn-md-fill"
                                                        onClick={handleModalNotesClick}
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
                                                        checked={data[`on_leave_${student.id}`] || false}
                                                        onChange={(e) =>
                                                            handleCheckboxChange(student.id, e.target.checked)
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
            <AddNotePopup
                modalNotesOpen={modalNotesOpen}
                setModalNotesOpen={setModalNotesOpen}
            />
        </>
    );
};

export default TakeAttendanceTable;
