import React from 'react';

const StaffWiseLeaveSummaryTableList = () => {

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
                                        <th>Leave</th>
                                        <th>Applied Date</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>No. of Days</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>001</td>
                                        <td>John Doe</td>
                                        <td>Manager</td>
                                        <td>Vacation</td>
                                        <td>2024-01-08</td>
                                        <td>2024-01-15</td>
                                        <td>2024-01-20</td>
                                        <td>5</td>
                                        <td>
                                            <span className='badge success'>Approved</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>002</td>
                                        <td>Jane Smith</td>
                                        <td>Developer</td>
                                        <td>Sick Leave</td>
                                        <td>2024-01-09</td>
                                        <td>2024-01-25</td>
                                        <td>2024-01-27</td>
                                        <td>3</td>
                                        <td>
                                            <span className='badge success'>Approved</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>003</td>
                                        <td>Alice Johnson</td>
                                        <td>HR Specialist</td>
                                        <td>Personal</td>
                                        <td>2024-01-10</td>
                                        <td>2024-02-01</td>
                                        <td>2024-02-05</td>
                                        <td>5</td>
                                        <td>
                                            <span className='badge warning'>Pending</span>
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

export default StaffWiseLeaveSummaryTableList;