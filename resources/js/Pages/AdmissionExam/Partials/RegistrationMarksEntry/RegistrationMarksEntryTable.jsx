import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationMarksEntryTable = ({
    studentRegistrationMarks,
    data,
    setData,
    errors,
}) => {
    const [initialFormData, setInitialFormData] = useState([]);

    useEffect(() => {
        setInitialFormData([]);
    }, [data?.academic_year_id, data?.class_name_id, data?.enquiry_id, data?.exam_id])

    useEffect(() => {
        setInitialFormData(studentRegistrationMarks?.map((item) => ({
            subject_id: item?.subject_id,
            subject_title: item?.subject_title,
            full_mark: item?.full_mark,
            pass_mark: item?.pass_mark,
            mark: Number.isNaN(parseFloat(item?.mark)) ? "" : parseFloat(item?.mark),
        })));
    }, [studentRegistrationMarks]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            marks: initialFormData
        }))
    }, [initialFormData]);

    // handle change form data start
    const handleFormChange = (fullMark, index, field, value) => {
        const updatedData = [...initialFormData];

        if (field === "mark") {
            value = value > 100 ? 100 : Number.isNaN(parseFloat(value)) ? "" : parseFloat(value);

            if (fullMark && value > fullMark) {
                value = fullMark;
            }
        }

        updatedData[index][field] = value;

        setInitialFormData(updatedData);
    };
    // handle change form data end

    // handle filter marks data start
    const handleFilterMarkData = () => {
        const form_data = {
            academic_year_id: data?.academic_year_id ?? "",
            class_name_id: data?.class_name_id ?? "",
            enquiry_id: data?.enquiry_id ?? "",
            exam_id: data?.exam_id ?? "",
        }

        router.post(route('admission_exam.registration_marks_entry'), form_data);
    }
    // handle filter marks data end

    // handle save registatiion mark start
    const handleSaveRegistrationMark = (e) => {
        e.preventDefault();

        if (data?.academic_year_id == "" || data?.class_name_id == "" || data?.enquiry_id == ""  || data?.exam_id == "" || data?.marks?.length == 0) {
            toast.error("Please select all fields.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                academic_year_id: data?.academic_year_id,
                class_name_id: data?.class_name_id,
                enquiry_id: data?.enquiry_id,
                exam_id: data?.exam_id,
                marks: data?.marks,
            }

            router.post(route('admission_exam.registration_marks_entry.save'), form_data, {
                onSuccess: () => {
                    handleFilterMarkData();
                },
                onError: () => {
                    handleFilterMarkData();

                    toast.error("Please select all fields.", {
                        position: 'top-right',
                        autoClose: 1500,
                    });
                }
            });
        }
    }
    // handle save registatiion mark end

    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Full Marks</th>
                            <th>Pass Marks</th>
                            <th>Obtained Marks</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(initialFormData)?.length > 0 ?
                            Object.values(initialFormData)?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.subject_title}</td>
                                    <td>{item?.full_mark}</td>
                                    <td>{item?.pass_mark}</td>
                                    <td>
                                        <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="mark"
                                                    value={
                                                        item?.mark ?? ""
                                                    }
                                                    onChange={(
                                                        e
                                                    ) => {
                                                        handleFormChange(
                                                            item?.full_mark,
                                                            index,
                                                            "mark",
                                                            e.target.value
                                                        );
                                                    }}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.mark
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item?.mark &&
                                            <span
                                                className={`badge ${item?.mark >= item?.pass_mark ? "success" : "danger"}`}
                                            >
                                                {item?.mark >= item?.pass_mark ? "Pass" : "Fail"}
                                            </span>
                                        }
                                    </td>
                                </tr>
                            ))
                        :
                            <tr>
                                <td className="text-center text-red-500" colSpan="7">
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            {Object.keys(initialFormData)?.length > 0 &&
                <div className="flex items-center gap-2.5 justify-end mt-2.5">
                    <PrimaryButton
                        className="educare-primary-btn-lg-fill"
                        type="button"
                        onClick={(e) => {
                            handleSaveRegistrationMark(e)
                        }}
                    >
                        Save Marks
                    </PrimaryButton>
                </div>
            }
        </>
    );
};

export default RegistrationMarksEntryTable;
