import React from "react";

const TeachersAuditReportTable = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Teacher Name</th>
                                        <th>Role</th>
                                        <th>WebType</th>
                                        <th>Date</th>
                                        <th>Login Time</th>
                                        <th>Logout Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mr. Smith</td>
                                        <td>Math Teacher</td>
                                        <td>Web</td>
                                        <td>2024-01-08</td>
                                        <td>09:00 AM</td>
                                        <td>03:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Ms. Johnson</td>
                                        <td>English Teacher</td>
                                        <td>Web</td>
                                        <td>2024-01-08</td>
                                        <td>08:30 AM</td>
                                        <td>02:30 PM</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Dr. Brown</td>
                                        <td>Science Teacher</td>
                                        <td>Web</td>
                                        <td>2024-01-08</td>
                                        <td>10:00 AM</td>
                                        <td>04:00 PM</td>
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

export default TeachersAuditReportTable;