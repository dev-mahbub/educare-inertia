import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import StatusPopUp from "./StatusPopUp";

const AllCandidatesTable = () => {
    const [changeStatus, setChangeStatus] = useState(false);
    const handleChangeStatus = () => {
        setChangeStatus(!changeStatus);
    };
    return ( 
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Job Code</th>
                                <th>Job title</th>
                                <th>Qualification</th>
                                <th>Applied Status</th>
                                <th>Applied date</th>
                                <th>File from ERP</th>
                                <th>File From Website</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sumith Sing</td>
                                <td>j01</td>
                                <td>Required math teacher</td>
                                <td>MA</td>
                                <td></td>
                                <td>06 Jan 2024</td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                        <div className="educare-filter-action-btn">
                                            <Tooltip
                                                title="Edit"
                                                placement="top"
                                                arrow
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-warning-btn-md-fill"
                                                >
                                                    <i className="icon-editing"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Tooltip
                                                title="Change Status"
                                                placement="top"
                                                arrow
                                            >
                                                <button
                                                    onClick={handleChangeStatus}
                                                    type="button"
                                                    className="educare-primary-btn-md-fill"
                                                >
                                                    Change Status
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <StatusPopUp changeStatus={changeStatus} setChangeStatus={setChangeStatus}/>
        </>
    );
};

export default AllCandidatesTable;
