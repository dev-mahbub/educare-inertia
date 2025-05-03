import React from "react";


export default function OnlineFeeTransectionSummaryList() {

   

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan={3}>
                                                <h5 className="font-bold text-headingLight text-[16px]">Transaction Summary</h5>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Types of Transaction</th>
                                            <th>Count</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>success</td>
                                            <td>2</td>
                                            <td>8950</td>

                                        </tr>
                                        <tr>
                                            <td>panding</td>
                                            <td>7</td>
                                            <td>66950</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan={3}>
                                                <h5 className="font-bold text-headingLight text-[16px]">Payment Mode Summary</h5>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Mode of Payment</th>
                                            <th>Success</th>
                                            <th>Failed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>null</td>
                                            <td>7500</td>
                                            <td>0</td>

                                        </tr>
                                        <tr>
                                            <td>Net Banking</td>
                                            <td>1450</td>
                                            <td>0</td>

                                        </tr>
                                        <tr>
                                            <td>
                                                <h5 className="text-headingLight font-bold">Total</h5>
                                            </td>
                                            <td>
                                                <h5 className="text-headingLight font-bold">456544</h5>
                                            </td>
                                            <td>
                                                <h5 className="text-headingLight font-bold">0</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
