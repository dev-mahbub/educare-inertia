import React from "react";

const PSRDateReport = ({ purchaseSummary }) => {
    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Date Report
                </h5>
            </div>

            {purchaseSummary.id && (
                <>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> {purchaseSummary.month} </td>
                                    <td> {purchaseSummary.amount} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default PSRDateReport;
