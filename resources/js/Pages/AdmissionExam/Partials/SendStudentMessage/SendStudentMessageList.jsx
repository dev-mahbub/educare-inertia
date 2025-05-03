import Checkbox from "@/Components/Checkbox";
import { useForm } from "@inertiajs/react";
import React from "react";

const SendStudentMessageList = ({ sendMessageData }) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        check_all_student_id: "",
        check_student_one: false,
        check_student_two: false,
    });

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "check_all_student_id") {
            newFormData = {
                ...data,
                [name]: value,
                check_student_one: value,
                check_student_two: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.check_all_student_id = false;
            }
            // after all child checked, then parent will check
            else if (newFormData.check_student_one
                === true &&
                newFormData.check_student_two === true
            ) {
                newFormData.check_all_student_id = true;
            }
        }

        setData(newFormData);
    };
    //handle Checkbox end

    const dummyData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <form onSubmit={dummyData}>
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="check_all_student_id"
                                                            name="check_all_student_id"
                                                            checked={
                                                                data.check_all_student_id
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Status</th>
                                            <th>Exam Status</th>
                                            <th>Regis.No</th>
                                            <th>Class</th>
                                            <th>Name</th>
                                            <th>Father Name</th>
                                            <th>Father Mobile</th>
                                            <th>Reg Date</th>
                                            <th>Msg Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Object.values(sendMessageData)?.map((item, index) => (
                                            <tr key={index}>  
                                            <td>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="check_student_one"
                                                            name="check_student_one"
                                                            checked={
                                                                data.check_student_one
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${item.enquiry_status === 'New' ? 'warning' : 'success'}`}>{item.enquiry_status}</span>
                                            </td>
                                            <td>
                                                {item.exam_status && 
                                                    <span className={`badge ${item.exam_status === 'Pending' ? 'warning' : 'success'}`}>{item.exam_status}</span>
                                                }
                                            </td>
                                            <td>{item.registration_no}</td>
                                            <td>{item.classroomTitle}</td>
                                            <td>{item.first_name} {item.first_middle_name} {item.first_last_name}</td>
                                            <td>{item.father_first_name} {item.father_first_middle_name} {item.father_first_last_name}</td>
                                            <td>{item.father_mobile}</td>
                                            <td>{item.date_of_registration}</td>
                                            <td>
                                                {item.message_status &&
                                                <span className={`badge ${item.message_status === 'Active' ? 'warnign' : 'success'}`}>{item?.message_status}</span>
                                            }
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SendStudentMessageList;
