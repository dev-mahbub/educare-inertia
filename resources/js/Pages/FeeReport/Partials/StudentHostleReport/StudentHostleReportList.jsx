import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const StudentHostleReportList = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_class: "",
    });
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Student Hostel Report
                        </h5>
                    </div>
                    <div className="flex flex-wrap justify-between items-end gap-5 mb-2">
                        <div className="">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: 10</span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-5">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    data_label="Class"
                                    data={[]}
                                    value={
                                        data.select_class
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "select_class",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.select_class
                                    }
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
                        </div>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Admission No.</th>
                                    <th>Student Name</th>
                                    <th>Roll Number</th>
                                    <th>Class</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ghs45</td>
                                    <td>Rakib Mollah</td>
                                    <td>23</td>
                                    <td>I X</td>
                                </tr>
                                <tr>
                                    <td>ghs55</td>
                                    <td>Tanzil Mollah</td>
                                    <td>53</td>
                                    <td>VII</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentHostleReportList;
