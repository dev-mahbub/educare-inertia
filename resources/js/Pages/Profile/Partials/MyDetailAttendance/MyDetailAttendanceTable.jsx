import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';


const MyDetailAttendanceTable = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="flex flex-wrap justify-between  mb-2.5">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                My Attendance
                            </h5>
                        </div>
                        <PrimaryButton
                            // disabled={processing}
                            className="educare-primary-btn-md-fill"
                        >
                            Calender View Report
                        </PrimaryButton>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Present</th>
                                    <th>Absent</th>
                                    <th>Half Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>April 2023</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>January 2024</td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td>3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyDetailAttendanceTable;
