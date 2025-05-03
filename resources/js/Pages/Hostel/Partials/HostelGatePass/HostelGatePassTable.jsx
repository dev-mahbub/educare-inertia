import React, { useEffect, useState } from "react";
import studentImg from "../../../../../images/user/user-1.png";
import { Tooltip } from "@mui/material";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { concatName } from "@/Hooks/GlobalFunction";
const HostelGatePassTable = ({
    studentGatePass = [],
}) => {
    const [studentGatePassData, setStudentGatePassData] = useState(studentGatePass);
    const [searchValue, setSearchValue] = useState('');
    const handleStudentSearch = (value) => {
        setSearchValue(value);
        const searchTerms = value.toLowerCase().split(" ").filter(term => term.trim() !== "");
        const filteredData = studentGatePass?.filter(item => {
            for (const term of searchTerms) {
                if (!(
                    // item?.concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name).toLowerCase().includes(term) ||
                    concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name).toLowerCase().includes(term) ||
                    item?.visiting_person?.toLowerCase().includes(term) ||
                    item?.classroom?.title?.toLowerCase().includes(term)
                )) {
                    return false;
                }
            }
            return true;
        });
        setStudentGatePassData(filteredData);
    }
    useEffect(() => {
        setStudentGatePassData(studentGatePass);
    }, [studentGatePass])

    return (
        <>
            {/* header filter */}
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Gate Pass Management
                    </h5>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                    <div>
                        <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                            {studentGatePassData?.length}: Gate Pass Generated
                        </span>
                    </div>
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="gate_pass"
                            value={searchValue}
                            onChange={(e) => handleStudentSearch(e.target.value)}
                            placeHolder="Search here"
                            className="block"
                        />
                    </div>
                </div>
            </div>
            {/* end header filter */}
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Visitor</th>
                                <th>GP No.</th>
                                <th>Student</th>
                                <th>Class</th>
                                <th>Visiting Person</th>
                                <th>Phone</th>
                                <th>Relation</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentGatePassData?.length > 0 ?
                                studentGatePassData?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="educare-student-list-table-user-img">
                                                {
                                                    item?.visitor_image?.path !== "no image" ?
                                                        <img
                                                            width="60px"
                                                            src={item?.visitor_image?.path}
                                                        />
                                                        :
                                                        <img
                                                            width="60px"
                                                            src={studentImg}
                                                            alt="user not found"
                                                        />
                                                }
                                            </div>
                                        </td>
                                        <td>{item?.id}</td>
                                        <td>{concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name)}</td>
                                        <td>{item?.classroom?.title}</td>
                                        <td>{item?.visiting_person}</td>
                                        <td>{item?.phone}</td>
                                        <td>{item?.relation_type}</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="print"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
                                                            className="educare-warning-btn-sm-fill"
                                                        >
                                                            <i className="icon-printer"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )) :
                                <tr>
                                    <td className="text-center text-red-500" colSpan="12">Data not found</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default HostelGatePassTable;
