import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const SummarySelector = ({ classroomStudent }) => {
    return (
        <form>
            <div className="educare-admission-list-area">
                <div className="flex flex-wrap gap-2.5 justify-between mb-2.5">
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="select_category"
                            data_label="All"
                            data={[]}
                            // value={data?.select_category}
                            // onChange={(e) =>
                            //     setData("select_category", e.target.value)
                            // }
                            className="block"
                        />
                        <InputError
                            message={errors.select_category}
                            className="mt-2"
                        />
                    </div>
                    <div className="educare-filter-action-btn">
                        <Tooltip title="Excel Sheet" placement="top" arrow>
                            <Link
                                href="#"
                                className="educare-success-btn-md-fill"
                                as="button"
                            >
                                <i className="icon-FileX"></i>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list table-width-full without-action-last-child pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Class</th>
                                        <th>
                                            <Tooltip
                                                title="Total"
                                                placement="top"
                                                arrow
                                            >
                                                <span>05</span>
                                            </Tooltip>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classroomStudent?.length ?
                                        classroomStudent?.map((classroom, index) => (
                                            <tr className="cursor-pointer" key={index} onClick={(e) => handleClassroom(e, classroom?.id)}>
                                                <td>{classroom?.title}</td>
                                                <td>{classroom?.student_count}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SummarySelector;
