import React from 'react';

const MonthWiseAttendanceReportTableList = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Employee Id</th>
                                        <th>Biometric Code</th>
                                        <th>Staff</th>
                                        <th>Designation</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>HalfDay</th>
                                        <th>Leave</th>
                                        <th>Weekly Off</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>001</td>
                                        <td>BC123</td>
                                        <td>John Doe</td>
                                        <td>Software Engineer</td>
                                        <td>20</td>
                                        <td>2</td>
                                        <td>1</td>
                                        <td>3</td>
                                        <td>Saturday</td>
                                    </tr>
                                    <tr>
                                        <td>002</td>
                                        <td>BC456</td>
                                        <td>Jane Smith</td>
                                        <td>Project Manager</td>
                                        <td>18</td>
                                        <td>4</td>
                                        <td>0</td>
                                        <td>2</td>
                                        <td>Sunday</td>
                                    </tr>
                                    <tr>
                                        <td>003</td>
                                        <td>BC789</td>
                                        <td>Alice Johnson</td>
                                        <td>Graphic Designer</td>
                                        <td>22</td>
                                        <td>0</td>
                                        <td>2</td>
                                        <td>1</td>
                                        <td>Friday</td>
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

export default MonthWiseAttendanceReportTableList;