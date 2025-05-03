
const YearlyStatementTable = ({
    staffSalaryPayments,
    totalReportCount
}) => {

    // Calculate totals
    const totals = staffSalaryPayments.reduce(
        (acc, item) => {
            acc.total_earning_amount += parseInt(item?.total_earning_amount ?? 0);
            acc.total_deduction += parseInt(item?.total_deduction_amount ?? 0);
            acc.total_due_amount += parseInt(item?.due_amount ?? 0);
            acc.total_paid_amount += parseInt(item?.paid_amount ?? 0);

            return acc;
        },
        {
            total_earning_amount: 0,
            total_deduction: 0,
            total_due_amount: 0,
            total_paid_amount: 0
        }
    );

    return (
        <div className="educare-admission-list-inner-wrapper">
            <div className="educare-admission-list">
                <table>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Payment Date</th>
                            <th>Total Earning</th>
                            <th>Total Deduction</th>
                            <th>Due</th>
                            <th>Amount Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalReportCount > 0 ?
                            <>
                                {staffSalaryPayments.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.payment_month?.title}</td>
                                        <td>{item?.payment_date}</td>
                                        <td>{parseInt(item?.total_earning_amount ?? 0)}</td>
                                        <td>{parseInt(item?.total_deduction_amount ?? 0)}</td>
                                        <td>{parseInt(item?.due_amount ?? 0)}</td>
                                        <td>{parseInt(item?.paid_amount ?? 0)}</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td className="font-semibold" colSpan={2}>Total</td>
                                    <td className="font-semibold">{totals.total_earning_amount}</td>
                                    <td className="font-semibold">{totals.total_deduction}</td>
                                    <td className="font-semibold">{totals.total_due_amount}</td>
                                    <td className="font-semibold">{totals.total_paid_amount}</td>
                                </tr>
                            </>
                        :
                            <tr>
                                <td
                                    className="text-center text-red-500"
                                    colSpan="7"
                                >
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default YearlyStatementTable;
