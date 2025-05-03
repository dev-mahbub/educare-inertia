import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import RadioInput from "@/Components/RadioInput";
import Checkbox from "@/Components/Checkbox";

const StudentDownloadFormList = ({data, setData, errors}) => {

    

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_student_id") {
            newFormData = {
                ...data,
                [name]: value,
                student_one_id: value,
                student_two_id: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.select_all_student_id = false;
            }
            // after all child checked, then parent will check
            else if (newFormData.student_one_id === true &&
                newFormData.student_two_id === true
            ) {
                newFormData.select_all_student_id = true;
            }
        }

        setData(newFormData);
    };
    //handle Checkbox end

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <>
            {/*Student download form start*/}
            <div className="educare-class-form-box-wrapper">
                <div className="educare-create-school-details-form-wrap">
                    <div className="educare-card-title">
                        <h5>
                            Student Download
                        </h5>
                    </div>
                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                        <form onSubmit={handleAdmissionSourceData}>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            value="Academic Year"
                                        />
                                        <SelectInput
                                            data_label="Academic Year"
                                            data={[]}
                                            value={
                                                data.select_academic_year
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "select_academic_year",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.select_academic_year
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            value="All Active / Inactive / TC"
                                        />
                                        <SelectInput
                                            data_label="All Active / Inactive / TC"
                                            data={[]}
                                            value={
                                                data.select_all_active_inactive_tc
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "select_all_active_inactive_tc",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.select_all_active_inactive_tc
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="educare-create-school-settings-list-check min-width-full">
                                        <div className="educare-radio-field-styles flex gap-3">
                                            <RadioInput
                                                name="studentType"
                                                value="Class Wise"
                                                checked={data.studentType === "class_wise"}
                                                onChange={() => setData("studentType", "class_wise")}
                                            />
                                            <RadioInput
                                                name="studentType"
                                                value="Section Wise"
                                                checked={data.studentType === "section_wise"}
                                                onChange={() => setData("studentType", "section_wise")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*Student download form end*/}

            {/*Student download List  start*/}
            {
                data.studentType === "class_wise" ? (
                    <div className="educare-classroom-table-wrapper mt-4">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="select_all_student_id"
                                                        checked={
                                                            data.select_all_student_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th>Select All</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="student_one_id"
                                                        checked={
                                                            data.student_one_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>NURSERY</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="student_two_id"
                                                        checked={
                                                            data.student_two_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>LKG</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="educare-classroom-table-wrapper mt-4">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="select_all_student_id"
                                                        checked={
                                                            data.select_all_student_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th>Select All</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="student_one_id"
                                                        checked={
                                                            data.student_one_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>NURSERY A</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="student_two_id"
                                                        checked={
                                                            data.student_two_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>LKG B</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
            {/*Student download List end*/}


        </>
    );
};

export default StudentDownloadFormList;