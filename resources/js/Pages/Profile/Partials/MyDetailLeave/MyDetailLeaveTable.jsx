import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';


const MyDetailLeaveTable = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="flex flex-wrap justify-between  mb-2.5">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                My Leave
                            </h5>
                        </div>
                        <PrimaryButton
                            // disabled={processing}
                            className="educare-primary-btn-md-fill"
                        >
                            Apply New Leave
                        </PrimaryButton>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto mb-2.5">
                        <table className="min-width-full">
                            <tbody>
                                <tr>
                                    <td className="text-center">Leave Balance as at 01-Apr-2023</td>
                                </tr>
                                <tr>
                                    <td className="text-center">Leave availed during a year</td>
                                </tr>
                                <tr>
                                    <td className="text-center">Balance Leave</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Applied Date</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mukesh Kumar</td>
                                    <td>6 June-2023</td>
                                    <td>7 June-2023</td>
                                    <td>12 June-2023</td>
                                    <td>Accepted</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyDetailLeaveTable;
