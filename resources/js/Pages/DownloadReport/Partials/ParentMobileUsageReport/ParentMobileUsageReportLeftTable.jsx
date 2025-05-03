import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const ParentMobileUsageReportLeftTable = ({setOpenTable}) => {
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
                    <Tooltip title="Search" placement="top" arrow as="button">
                        <Link
                            href="#"
                            className="educare-secondary-btn-md-fill"
                        >
                            <i className="icon-search-interface-symbol"></i>
                        </Link>
                    </Tooltip>
                </div>
            </div>

            {/* table */}
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Using (3)</th>
                            <th>Not Using (47)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NURSERY A (6)</td>
                            <td>
                                <button onClick={()=>setOpenTable(true)} className="font-semibold text-primary">1</button>
                            </td>
                            <td>
                                <button onClick={()=>setOpenTable(true)} className="font-semibold text-primary">5</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* End table */}
        </>
    );
};

export default ParentMobileUsageReportLeftTable;
