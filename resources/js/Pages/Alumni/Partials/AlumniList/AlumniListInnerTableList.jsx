import React from "react";
import { Tooltip } from "@mui/material";

const AlumniListInnerTableList = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>City</th>
                                        <th>Credential</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John Doe</td>
                                        <td>(123) 456-7890</td>
                                        <td>john.doe@example.com</td>
                                        <td>New York</td>
                                        <td>User</td>
                                        <td>
                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            className="educare-warning-btn-sm-fill"
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Jane Smith</td>
                                        <td>(987) 654-3210</td>
                                        <td>jane.smith@example.com</td>
                                        <td>Los Angeles</td>
                                        <td>Admin</td>
                                        <td>
                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            className="educare-warning-btn-sm-fill"
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Alice Johnson</td>
                                        <td>(555) 123-4567</td>
                                        <td>alice.johnson@example.com</td>
                                        <td>Chicago</td>
                                        <td>User</td>
                                        <td>
                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            className="educare-warning-btn-sm-fill"
                                                        >
                                                            <i className="icon-editing"></i>
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
                </div>
            </div>
        </>
    );
};

export default AlumniListInnerTableList;