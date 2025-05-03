import React from 'react';

const StaffWiseAttendanceReportTable = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>HalfDay</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>January</td>
                                        <td>25</td>
                                        <td>5</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>February</td>
                                        <td>22</td>
                                        <td>8</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>March</td>
                                        <td>20</td>
                                        <td>3</td>
                                        <td>0</td>
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

export default StaffWiseAttendanceReportTable;