import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
const ParentMobileUsageReportRightTable = ({ openTable }) => {
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
            <div className="flex justify-between mb-5">
                <div className="educare-header-filtar-bar-count mr-auto">
                    <span>Not Using - LKG A : 10</span>
                </div>
                <div>
                    <div className="flex">
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
                        <div>
                            <Tooltip
                                title="Excel Sheet"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href="#"
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Adm.No.</th>
                            <th>Name</th>
                            <th> Mobile No.</th>
                            <th> Father Name</th>
                        </tr>
                    </thead>
                    {openTable === true && (
                        <tbody>
                            <tr>
                                <td> DM0010 </td>
                                <td> Dilip Gpta </td>
                                <td> 2222222222 </td>
                                <td> Vishal Gpta </td>
                            </tr>
                            <tr>
                                <td> DM0009 </td>
                                <td> Kiran Verma </td>
                                <td> 142587421 </td>
                                <td> Pradeep Verma </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};

export default ParentMobileUsageReportRightTable;
