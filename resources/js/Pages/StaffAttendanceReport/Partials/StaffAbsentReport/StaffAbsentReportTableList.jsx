import React from 'react';

const StaffAbsentReportTableList = () => {
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
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>001</td>
                                        <td>BC123</td>
                                        <td>John Doe</td>
                                        <td>Software Engineer</td>
                                        <td>(123) 456-7890</td>
                                        <td>john.doe@example.com</td>
                                    </tr>
                                    <tr>
                                        <td>002</td>
                                        <td>BC456</td>
                                        <td>Jane Smith</td>
                                        <td>Project Manager</td>
                                        <td>(987) 654-3210</td>
                                        <td>jane.smith@example.com</td>
                                    </tr>
                                    <tr>
                                        <td>003</td>
                                        <td>BC789</td>
                                        <td>Alice Johnson</td>
                                        <td>Graphic Designer</td>
                                        <td>(555) 123-4567</td>
                                        <td>alice.johnson@example.com</td>
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

export default StaffAbsentReportTableList;