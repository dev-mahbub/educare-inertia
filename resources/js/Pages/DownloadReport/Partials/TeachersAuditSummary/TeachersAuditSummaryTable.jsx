import React, { useState } from "react";

const TeachersAuditSummaryTable = () => {
    const [tableData, setTableData] = useState(false);
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-3 lg:col-span-3">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>9-Jan-2024</td>
                                    <td>
                                        <button
                                            onClick={() => setTableData(true)}
                                            className="font-semibold text-primary"
                                        >
                                            30
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-9 lg:col-span-9">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Teacher Name</th>
                                        <th>Role</th>
                                        <th>WebType</th>
                                        <th>Date</th>
                                        <th>Login Time</th>
                                        <th>Logout Time</th>
                                    </tr>
                                </thead>
                                {tableData === true && (
                                    <tbody>
                                        <tr>
                                            <td>Admin2</td>
                                            <td>Admin</td>
                                            <td>Web</td>
                                            <td>09-Jan-2024</td>
                                            <td> 08: 46:57 AM</td>
                                            <td>Logged In</td>
                                        </tr>
                                        <tr>
                                            <td>Admin2</td>
                                            <td>Admin</td>
                                            <td>Web</td>
                                            <td>09-Jan-2024</td>
                                            <td> 08: 46:57 AM</td>
                                            <td>Logged In</td>
                                        </tr>
                                        <tr>
                                            <td>Admin2</td>
                                            <td>Admin</td>
                                            <td>Web</td>
                                            <td>09-Jan-2024</td>
                                            <td> 08: 46:57 AM</td>
                                            <td>Logged In</td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeachersAuditSummaryTable;
