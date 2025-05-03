import Checkbox from "@/Components/Checkbox";
import { useForm } from '@inertiajs/react';
import React from "react";

const DownloadTcTable = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        dummy_checkbox_1: false,
        dummy_checkbox_2: false,
        dummy_checkbox_3: false,
        select_all_days_id: "",
    });

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_days_id") {
            newFormData = {
                ...data,
                [name]: value,
                dummy_checkbox_1: value,
                dummy_checkbox_2: value,
                dummy_checkbox_3: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.select_all_days_id = false;
            }
            // after all child checked, then parent will check
            else if (newFormData.monday_id === true &&
                newFormData.tuesday_id === true &&
                newFormData.wednesday_id === true &&
                newFormData.thursday_id === true &&
                newFormData.friday_id === true &&
                newFormData.saturday_id === true &&
                newFormData.sunday_id === true
            ) {
                newFormData.select_all_days_id = true;
            }
        }

        setData(newFormData);
    };
    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Checkbox
                                    id="select_all_days_id"
                                    name="select_all_days_id"
                                    checked={
                                        data.select_all_days_id
                                    }
                                    onChange={(e) =>
                                        handleCheckboxSelect(e.target.name, e.target.checked)
                                    }
                                />
                            </th>
                            <th>Name</th>
                            <th>Adm No.</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="educare-checkbox-field-styles">
                                    <Checkbox
                                        name="dummy_checkbox_1"
                                        checked={
                                            data.dummy_checkbox_1
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_checkbox_1",
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                            </td>
                            <td>EMP001</td>
                            <td>EMP001</td>
                            <td>John Doe</td>
                            <td>12345</td>
                            <td>123456789</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="educare-checkbox-field-styles">
                                    <Checkbox
                                        name="dummy_checkbox_2"
                                        checked={
                                            data.dummy_checkbox_2
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_checkbox_2",
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                            </td>
                            <td>EMP001</td>
                            <td>EMP002</td>
                            <td>Jane Smith</td>
                            <td>54321</td>
                            <td>987654321</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="educare-checkbox-field-styles">
                                    <Checkbox
                                        name="dummy_checkbox_3"
                                        checked={
                                            data.dummy_checkbox_3
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_checkbox_3",
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                            </td>
                            <td>EMP001</td>
                            <td>EMP003</td>
                            <td>Bob Johnson</td>
                            <td>67890</td>
                            <td>654321987</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DownloadTcTable;