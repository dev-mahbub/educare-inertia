import React from 'react';

const ImportSalaryTableList = () => {
    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Import Summary
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Staff</th>
                            <th>Status</th>
                            <th>Issue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Smith</td>
                            <td>Active</td>
                            <td>No issues</td>
                        </tr>
                        <tr>
                            <td>Alice Johnson</td>
                            <td>Inactive</td>
                            <td>Login problem</td>
                        </tr>
                        <tr>
                            <td>Bob Williams</td>
                            <td>Active</td>
                            <td>Forgot password</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ImportSalaryTableList;