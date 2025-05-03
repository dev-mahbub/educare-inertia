import React from "react";

const ParentsAuditReportTable = () => {
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
                                        <th>Parent Name</th>
                                        <th>Student Name</th>
                                        <th>Class Name</th>
                                        <th>Adm No</th>
                                        <th>WebType</th>
                                        <th>Login Time</th>
                                        <th>Logout Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>John Doe Sr.</td>
                                        <td>John Doe Jr.</td>
                                        <td>Class 10A</td>
                                        <td>AD123456</td>
                                        <td>Web</td>
                                        <td>09:00 AM</td>
                                        <td>03:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jane Smith Sr.</td>
                                        <td>Jane Smith Jr.</td>
                                        <td>Class 9B</td>
                                        <td>AD789012</td>
                                        <td>Web</td>
                                        <td>08:30 AM</td>
                                        <td>02:30 PM</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Alice Johnson Sr.</td>
                                        <td>Alice Johnson Jr.</td>
                                        <td>Class 11C</td>
                                        <td>AD345678</td>
                                        <td>Web</td>
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

export default ParentsAuditReportTable;