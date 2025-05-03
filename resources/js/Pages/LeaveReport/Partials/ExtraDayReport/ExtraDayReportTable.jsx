import React from 'react';

const ExtraDayReportTable = () => {
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
                                        <th>Notes</th>
                                        <th>Day</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>001</td>
                                        <td>John Doe</td>
                                        <td>Software Engineer</td>
                                        <td>Project XYZ</td>
                                        <td>03-Mar-2023</td>
                                    </tr>
                                    <tr>
                                        <td>002</td>
                                        <td>Alice Smith</td>
                                        <td>Marketing Specialist</td>
                                        <td>Campaign ABC</td>
                                        <td>14-Mar-2023
                                            <span className='badge warning ml-2'>Half Day</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>003</td>
                                        <td>Bob Johnson</td>
                                        <td>HR Manager</td>
                                        <td>Recruitment</td>
                                        <td>
                                            24-Mar-2023
                                            <span className='badge warning ml-2'>Half Day</span>
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

export default ExtraDayReportTable;