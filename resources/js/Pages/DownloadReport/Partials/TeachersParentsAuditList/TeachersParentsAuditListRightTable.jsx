import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
const TeachersParentsAuditListRightTable = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_teacher: "",
    });

    return (
        <>
            <div className="flex justify-between mb-5">
                <div className="educare-input-field-styles">
                    <TextInput
                        id="search_teacher"
                        value={data.search_teacher}
                        onChange={(e) =>
                            setData("search_teacher", e.target.value)
                        }
                        className="block"
                        placeHolder="Search Teacher Audit"
                    />
                    <InputError
                        message={errors.search_teacher}
                        className="mt-2"
                    />
                </div>
                <div>
                    <div className="flex">
                        <div>
                            <PrimaryButton className="educare-primary-btn-md-fill">
                                Send Message
                            </PrimaryButton>
                        </div>
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

            {/* table */}

            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        <button
                                            type="button"
                                            className="text-success"
                                        >
                                            4 Staff are using ERP/Mobile
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hrithik Roy</td>
                                    <td>9430056700</td>
                                </tr>
                                <tr>
                                    <td>Shyam Sah</td>
                                    <td>1111111111</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        <button
                                            type="button"
                                            className="text-success"
                                        >
                                          11 Staff are not using ERP/Mobile
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hrithik Roy</td>
                                    <td>9430056700</td>
                                </tr>
                                <tr>
                                    <td>Shyam Sah</td>
                                    <td>1111111111</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeachersParentsAuditListRightTable;
