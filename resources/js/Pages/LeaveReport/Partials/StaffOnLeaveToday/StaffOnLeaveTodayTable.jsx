import React from 'react';

const StaffOnLeaveTodayTable = () => {
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
                                        <th>NoOfDays</th>
                                        <th>Reason</th>
                                        <th>Applied on</th>
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
                                        <td>5</td>
                                        <td>Vacation</td>
                                        <td>2024-01-05</td>
                                    </tr>
                                    <tr>
                                        <td>002</td>
                                        <td>Jane Smith</td>
                                        <td>Developer</td>
                                        <td>F12345</td>
                                        <td>2024-01-08</td>
                                        <td>2024-01-15</td>
                                        <td>5</td>
                                        <td>Vacation</td>
                                        <td>2024-01-05</td>
                                    </tr>
                                    <tr>
                                        <td>003</td>
                                        <td>Alice Johnson</td>
                                        <td>HR Specialist</td>
                                        <td>F12345</td>
                                        <td>2024-01-08</td>
                                        <td>2024-01-15</td>
                                        <td>5</td>
                                        <td>Vacation</td>
                                        <td>2024-01-05</td>
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

export default StaffOnLeaveTodayTable;