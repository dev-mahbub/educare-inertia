
export default function NetSalary({
    totalEarningAmount,
    totalDeductionAmount,
    payableAmount,
    data,
    totalAbsentDeductionAmount,
    totalAbsentDeduction,
    totalExtraDutyAmount,
    totalPaidExtraDuty
}) {
    return (
        <>
            <div className="educare-classroom-form-area mb-5">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Gross Payment</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalEarningAmount}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Total Deduction</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalDeductionAmount}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Net Salary</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{(payableAmount + totalAbsentDeductionAmount) - (data?.bonus_amount ?? 0) - (data?.advance_amount ?? 0) - totalExtraDutyAmount}</h5>
                                    </td>
                                </tr>

                                {totalAbsentDeduction > 0 &&
                                    <tr>
                                        <td>
                                            <h5 className="font-bold text-headingLight">Absent Deduction</h5>
                                        </td>
                                        <td>
                                            <h5 className="font-bold text-headingLight">{totalAbsentDeductionAmount}</h5>
                                        </td>
                                    </tr>
                                }

                                {(totalAbsentDeduction > 0 || totalPaidExtraDuty  > 0) &&
                                    <tr>
                                        <td>
                                            <h5 className="font-bold text-headingLight">Grand Total</h5>
                                        </td>
                                        <td>
                                            <h5 className="font-bold text-headingLight">{payableAmount - (data?.bonus_amount ?? 0) - (data?.advance_amount ?? 0)}</h5>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
