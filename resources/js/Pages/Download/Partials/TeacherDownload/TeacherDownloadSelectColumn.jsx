import React from "react";
import InputLabel from "@/Components/InputLabel";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Checkbox from "@/Components/Checkbox";
import { useState } from "react";

export default function TeacherDownloadSelectColumn({ data, setData}) {


    const attributes = [
        { name: "teacher_biometric_code", label: "Biometric Code / Emp Id" },
        { name: "teacher_first_name", label: "Teacher First Name" },
        { name: "teacher_last_name", label: "Teacher Last Name" },
        { name: "teacher_full_name", label: "Full Name" },
        
    ];


    // set label value to data with setData
    const handleCheckboxChange = (name, value) => {
        // If the checkbox is checked, set both the label value and the original value in the data state
        const labelValue = value ? getLabelValueByName(name) : "";
        setData({
            ...data,
            [`${name}_label`]: labelValue,
            [name]: value,
        });
    };

    //get label value dynamicaly
    const getLabelValueByName = (name) => {
        const attribute = attributes.find(attr => attr.name === name);
        return attribute ? attribute.label : "";
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
                                            <h5 className="text-headingLight font-bold">Teacher's Attribute</h5>
                                        </div>
                                        <div className="educare-filter-action-btn">
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
                            {attributes.map(attribute => (
                                <tr key={attribute.name}>
                                    <td>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id={attribute.name}
                                                    name={attribute.name}
                                                    checked={data[attribute.name]}
                                                    onChange={(e) => handleCheckboxChange(attribute.name, e.target.checked)}
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor={attribute.name}
                                                    value={attribute.label}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}