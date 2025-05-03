import React from 'react';
import { Link } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const MonthWiseLeaveReportTableList = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Emp Id</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Format No.</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Reason</th>
                                        <th>NoOfDays</th>
                                        <th>Applied on</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>001</td>
                                        <td>John Doe</td>
                                        <td>Manager</td>
                                        <td>F12345</td>
                                        <td>2024-01-08</td>
                                        <td>2024-01-15</td>
                                        <td>Vacation</td>
                                        <td>5</td>
                                        <td>2024-01-05</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
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
                                        <td>002</td>
                                        <td>Jane Smith</td>
                                        <td>Developer</td>
                                        <td>F12345</td>
                                        <td>2024-01-08</td>
                                        <td>2024-01-15</td>
                                        <td>Vacation</td>
                                        <td>5</td>
                                        <td>2024-01-05</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
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
                                        <td>003</td>
                                        <td>Alice Johnson</td>
                                        <td>HR Specialist</td>
                                        <td>F12345</td>
                                        <td>2024-01-08</td>
                                        <td>2024-01-15</td>
                                        <td>Vacation</td>
                                        <td>5</td>
                                        <td>2024-01-05</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
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

export default MonthWiseLeaveReportTableList;