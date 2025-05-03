import React from "react";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Checkbox from "@/Components/Checkbox";

export default function StudentDownloadSelectColumn({data, setData}) {
    



    const handleCheckboxChange = (name, value) => {
        // If the checkbox is checked, set both the label value and the original value in the data state
        const labelValue = value ? getLabelValueByName(name) : "";
        setData({
            ...data,
            [`${name}_label`]: labelValue,
            [name]: value,
        });
    };

    const getLabelValueByName = (name) => {
        // You may want to customize this function based on your label requirements
        switch (name) {
            case "student_name":
                return "Student Name";
            case "admission_number":
                return "Admission Number";
            default:
                return "";
        }
    };

    

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title">
                    <h5>
                        Select Column
                    </h5>
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    <div className="flex flex-wrap justify-between items-center">
                                        <div>
                                            <h5 className="text-headingLight font-bold">Student's Attribute</h5>
                                        </div>
                                        <div>
                                            <Tooltip
                                                title="Reset"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-gray-btn-md-fill"
                                                >
                                                    <i className="icon-ArrowsClockwise"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="student_name"
                                                name="student_name"
                                                checked={data.student_name}
                                                onChange={(e) => handleCheckboxChange("student_name", e.target.checked)}
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="student_name"
                                                value="Student Name"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="admission_number"
                                                name="admission_number"
                                                checked={data.admission_number}
                                                onChange={(e) => handleCheckboxChange("admission_number", e.target.checked)}
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="admission_number"
                                                value="Admission Number"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            
        </>
    );
}