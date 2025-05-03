import React from 'react';

const ExtraDayReportTableList = () => {
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
                                        <th>Notes</th>
                                        <th>Day</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>001</td>
                                        <td>BC123</td>
                                        <td>John Doe</td>
                                        <td>Software Engineer</td>
                                        <td>No special notes</td>
                                        <td>Monday</td>
                                    </tr>
                                    <tr>
                                        <td>002</td>
                                        <td>BC456</td>
                                        <td>Jane Smith</td>
                                        <td>Project Manager</td>
                                        <td>Meeting at 2 PM</td>
                                        <td>Wednesday</td>
                                    </tr>
                                    <tr>
                                        <td>003</td>
                                        <td>BC789</td>
                                        <td>Alice Johnson</td>
                                        <td>Graphic Designer</td>
                                        <td>Work from home</td>
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

export default ExtraDayReportTableList;