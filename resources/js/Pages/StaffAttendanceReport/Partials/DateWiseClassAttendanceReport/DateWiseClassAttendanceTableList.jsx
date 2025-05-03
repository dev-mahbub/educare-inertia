import React from "react";

const DateWiseClassAttendanceTableList = () => {
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
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Phone</th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        <th>Working Hours</th>
                                        <th>Attendance</th>
                                        <th>Is Half Day?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>dfg45</td>
                                        <td>6</td>
                                        <td>Admin2</td>
                                        <td>Principal</td>
                                        <td>9958080457</td>
                                        <td>9.00</td>
                                        <td>6.00</td>
                                        <td>9 Hour</td>
                                        <td>
                                            <span className='badge primary'>On Leave</span>
                                        </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>gfh34</td>
                                        <td>8</td>
                                        <td>kaka</td>
                                        <td>Teacher</td>
                                        <td>34543564</td>
                                        <td>9.00</td>
                                        <td>6.00</td>
                                        <td>9 Hour</td>
                                        <td>
                                            <span className='badge dark'>Not Marked</span>
                                        </td>
                                        <td>No</td>
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

export default DateWiseClassAttendanceTableList;