import { concatName } from "@/Hooks/GlobalFunction";


const CancelledReportTable = ({
    cancelledStaffSalaryPayments
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Employee Id</th>
                                        <th>Staff</th>
                                        <th>UAN</th>
                                        <th>Month</th>
                                        <th>Total Earning</th>
                                        <th>Total Deduction</th>
                                        <th>Amount Paid</th>
                                        <th>Due</th>
                                        <th>Payment Date</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cancelledStaffSalaryPayments?.length > 0 ?
                                        cancelledStaffSalaryPayments.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.staff?.employee_id}</td>
                                                <td>{concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)}</td>
                                                <td>{item?.staff?.uan}</td>
                                                <td>{item?.payment_month?.title}</td>
                                                <td>{parseInt(item?.total_earning_amount ?? 0)}</td>
                                                <td>{parseInt(item?.total_deduction_amount ?? 0)}</td>
                                                <td>{parseInt(item?.paid_amount ?? 0)}</td>
                                                <td>{parseInt(item?.due_amount ?? 0)}</td>
                                                <td>{item?.payment_date}</td>
                                                <td>{item?.cancel_reason}</td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="8"
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

export default CancelledReportTable;
