import React from "react";
import { Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SuccessButton from "@/Components/SuccessButton";
import { concatName } from "@/Hooks/GlobalFunction";

export default function SendExamMarksList({
    studentMark = [],
    studentSubject = [],
}) {
    const { data, setData, errors, post, reset, processing } = useForm({
        select_all_subject_id: "",
        subject_one: "",
        subject_two: "",
    });

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_subject_id") {
            newFormData = {
                ...data,
                [name]: value,
                subject_one: value,
                subject_two: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.select_all_subject_id = false;
            }
            // after all child checked, then parent will check
            else if (
                newFormData.subject_one === true &&
                newFormData.subject_two === true
            ) {
                newFormData.select_all_subject_id = true;
            }
        }

        setData(newFormData);
    };
    //handle Checkbox end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="xl:col-span-6 col-span-12">
                        <div className="educare-admission-list-area">
                            <div className="educare-admission-list-inner">
                                <div className="educare-admission-list-inner-wrapper">
                                    <div className="educare-admission-list pb-none">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id="select_all_subject_id"
                                                                    name="select_all_subject_id"
                                                                    checked={
                                                                        data.select_all_subject_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleCheckboxSelect(
                                                                            e
                                                                                .target
                                                                                .name,
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th>Subject</th>
                                                    <th>Present Students</th>
                                                    <th>
                                                        <PrimaryButton
                                                            // disabled={processing}
                                                            className="educare-primary-btn-md-fill !normal-case"
                                                        >
                                                            Send SMS for
                                                            selected subjects
                                                        </PrimaryButton>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentSubject?.length > 0 ? (
                                                studentSubject?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="subject_one"
                                                                name="subject_one"
                                                                checked={
                                                                    data.subject_one
                                                                }
                                                                onChange={(e) =>
                                                                    handleCheckboxSelect(
                                                                        e.target
                                                                            .name,
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{item?.subject?.title}</td>
                                                    <td>{item?.studentCount}</td>
                                                    <td>
                                                        <SuccessButton
                                                            // disabled={processing}
                                                            className="educare-secondary-btn-md-stroke"
                                                        >
                                                            Send sms
                                                        </SuccessButton>
                                                    </td>
                                                </tr>
                                                ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            className="text-center text-red-500"
                                                            colSpan="10"
                                                        >
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
                    </div>
                    <div className="xl:col-span-6 col-span-12">
                        <div className="educare-admission-list-area">
                            <div className="educare-admission-list-inner">
                                <div className="educare-admission-list-inner-wrapper">
                                    <div className="educare-admission-list pb-none">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Roll No.</th>
                                                    <th>Adm No.</th>
                                                    <th>Student Name</th>
                                                    <th>Class</th>
                                                    <th>Father Name</th>
                                                    <th>SMS No</th>
                                                    <th>O. Marks/Full Marks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentMark?.length > 0 ? (
                                                    studentMark?.map(
                                                        (item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    {
                                                                        item
                                                                            ?.student
                                                                            ?.classroom_roll?.roll_no
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            ?.student
                                                                            ?.admission_no
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {concatName(
                                                                        item
                                                                            ?.student
                                                                            ?.first_name,
                                                                        item
                                                                            ?.student
                                                                            ?.middle_name,
                                                                        item
                                                                            ?.student
                                                                            ?.last_name
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            ?.classroom
                                                                            ?.title
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {concatName(
                                                                        item
                                                                            ?.student
                                                                            ?.father
                                                                            ?.first_name,
                                                                        item
                                                                            ?.student
                                                                            ?.father
                                                                            ?.middle_name,
                                                                        item
                                                                            ?.student
                                                                            ?.father
                                                                            ?.last_name
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            ?.student
                                                                            ?.father
                                                                            ?.sms_phone
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {item?.mark ? item?.mark +'/'+item?.full_mark ?? 0 : item?.grade?.title}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            className="text-center text-red-500"
                                                            colSpan="10"
                                                        >
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
                    </div>
                </div>
            </div>
        </>
    );
}
