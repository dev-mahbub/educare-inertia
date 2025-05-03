import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
const TeachersParentsAuditListLeftTable = () => {
    const {
        data,
        setData, 
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_parent: "",
    });

    return (
        <>
            <div className="flex justify-between">
                <div className="educare-input-field-styles">
                    <TextInput
                        id="search_parent"
                        value={data.search_parent}
                        onChange={(e) =>
                            setData("search_parent", e.target.value)
                        }
                        className="block"
                        placeHolder="Search Parent Audit"
                    />
                    <InputError
                        message={errors.search_parent}
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

            <div className="import-note-box px-[20px] py-[10px] pb-[15px] bg-danger/10 border-l-4  border-danger mt-5 mb-5">
                <div className="educare-import-note-content">
                    <strong className="">Note :</strong>
                    <span>We will send below message to all users:</span>
                    <div className="educare-import-note-list mt-[10px]  mb-[15px]">
                        <p>
                            We noticed you are not using school phone app. We
                            suggest you to use App to get school updates Plz
                            download School App http://tinyurl.com/y33evret
                            SchoolKey: SchoolKey USER ID: USERID PASSWORD:
                            PASSWORD Regards School
                        </p>
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
                                        {" "}
                                        <button
                                            type="button"
                                            className="text-success"
                                        >
                                            0 Parent are using ERP/Mobile
                                        </button>{" "}
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
                                            53 Parent are not using ERP/Mobile
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

export default TeachersParentsAuditListLeftTable;
