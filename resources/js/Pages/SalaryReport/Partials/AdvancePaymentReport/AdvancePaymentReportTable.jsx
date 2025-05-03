import { concatName } from "@/Hooks/GlobalFunction";

const AdvancePaymentReportTable = ({
    staffAdvancePayments
}) => {

    // Calculate totals
    const totalPaidAmount = staffAdvancePayments.reduce((acc, curr) => acc + parseInt(curr.paid_amount ?? 0), 0);
    const totalDeductedAmount = staffAdvancePayments.reduce((acc, curr) => acc + parseInt(curr.deducted_amount ?? 0), 0);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Employee Id</th>
                                        <th>Name</th>
                                        <th>UAN</th>
                                        <th>Paid Amount</th>
                                        <th>Deducted Amount</th>
                                        <th>Advance Only</th>
                                        <th>Payment Month</th>
                                        <th>Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffAdvancePayments?.length > 0 ?
                                        <>
                                            {staffAdvancePayments.map((report, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{report?.staff?.employee_id}</td>
                                                    <td>{concatName(report?.staff?.first_name, report?.staff?.middle_name, report?.staff?.last_name)}</td>
                                                    <td>{report?.staff?.uan}</td>
                                                    <td>{parseInt(report?.paid_amount ?? 0)}</td>
                                                    <td>{parseInt(report?.deducted_amount ?? 0)}</td>
                                                    <td>{report?.by_salary == false ? "Yes" : "No"}</td>
                                                    <td>{report?.payment_month?.title}</td>
                                                    <td>{report?.payment_date}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan={4}>
                                                    <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                        Total Amount
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                        {totalPaidAmount}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                        {totalDeductedAmount}
                                                    </h6>
                                                </td>
                                                <td colSpan={3}></td>
                                            </tr>
                                        </>
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="9"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvancePaymentReportTable;
