import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
const AssignHostelFeeRightTable = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_days_id: "",
        search_student: "",
        monday_id: false,
        tuesday_id: false,
    });

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_days_id") {
            newFormData = {
                ...data,
                [name]: value,
                monday_id: value,
                tuesday_id: value,
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
            else if (
                newFormData.monday_id === true &&
                newFormData.tuesday_id === true
            ) {
                newFormData.select_all_days_id = true;
            }
        }

        setData(newFormData);
    };

    const headerTopData = (e) =>{
        e.preventDefault()
    }

    return (
        <>
            <form onSubmit={headerTopData} className="mb-5">
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Student
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search_student"
                                value={data.search_student}
                                onChange={(e) =>
                                    setData("search_student", e.target.value)
                                }
                                placeHolder="Search here"
                                className="block"
                            />
                            <InputError
                                message={errors.search_student}
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-filter-action-btn flex flex-wrap gap-2">
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="select_all_days_id"
                                                name="select_all_days_id"
                                                checked={
                                                    data.select_all_days_id
                                                }
                                                onChange={(e) =>
                                                    handleCheckboxSelect(
                                                        e.target.name,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="select_all_days_id"
                                                value="Select All"
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th> Adm. No.</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Group</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="monday_id"
                                                name="monday_id"
                                                checked={data.monday_id}
                                                onChange={(e) =>
                                                    handleCheckboxSelect(
                                                        e.target.name,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>157680</td>
                                <td>Kunal Sing</td>
                                <td>VA</td>
                                <td>B</td>
                                <td>
                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                        <div>
                                            <Tooltip
                                                title="Edit"
                                                placement="top"
                                                arrow
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-warning-btn-sm-fill"
                                                >
                                                    <i className="icon-editing"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Tooltip
                                                title="Delete"
                                                placement="top"
                                                arrow
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-danger-btn-sm-fill"
                                                    as="button"
                                                >
                                                    <i className="icon-TrashSimple"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="tuesday_id"
                                                name="tuesday_id"
                                                checked={data.tuesday_id}
                                                onChange={(e) =>
                                                    handleCheckboxSelect(
                                                        e.target.name,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>157680</td>
                                <td>Kunal Sing</td>
                                <td>VA</td>
                                <td>B</td>
                                <td>
                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                        <div>
                                            <Tooltip
                                                title="Edit"
                                                placement="top"
                                                arrow
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-warning-btn-sm-fill"
                                                >
                                                    <i className="icon-editing"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Tooltip
                                                title="Delete"
                                                placement="top"
                                                arrow
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-danger-btn-sm-fill"
                                                    as="button"
                                                >
                                                    <i className="icon-TrashSimple"></i>
                                                </Link>
                                            </Tooltip>
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
};

export default AssignHostelFeeRightTable;
