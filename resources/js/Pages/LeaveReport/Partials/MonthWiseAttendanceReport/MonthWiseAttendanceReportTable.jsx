import React from 'react';

const MonthWiseAttendanceReportTable = () => {
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
                                        <th>Staff</th>
                                        <th>Designation</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>HalfDay</th>
                                        <th>Total Absent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>001</td>
                                        <td>John Doe</td>
                                        <td>Software Engineer</td>
                                        <td>20</td>
                                        <td>5</td>
                                        <td>2</td>
                                        <td>7</td>
                                    </tr>
                                    <tr>
                                        <td>002</td>
                                        <td>Alice Smith</td>
                                        <td>Marketing Specialist</td>
                                        <td>18</td>
                                        <td>8</td>
                                        <td>1</td>
                                        <td>9</td>
                                    </tr>
                                    <tr>
                                        <td>003</td>
                                        <td>Bob Johnson</td>
                                        <td>HR Manager</td>
                                        <td>22</td>
                                        <td>3</td>
                                        <td>0</td>
                                        <td>3</td>
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

export default MonthWiseAttendanceReportTable;