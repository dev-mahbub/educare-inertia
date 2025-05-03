import Loader from "@/Components/Loader";

const FeeCancellationReportTable = ({
    cancellationReports = [],
    loading
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
                                        <th>Adm No</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Amount</th>
                                        <th>Pay Mode</th>
                                        <th>Receipt No</th>
                                        <th>Can. Date</th>
                                        <th>Can. By</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(cancellationReports)?.length > 0 ?
                                            Object.values(cancellationReports)?.map((item, index) => (
                                                <tr>
                                                    <td>{item?.student?.admission_no}</td>
                                                    <td>{`${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`}</td>
                                                    <td>{item?.student?.classroom?.title}</td>
                                                    <td>{item?.total_amount ?? 0}</td>
                                                    <td>{item?.payment_mode}</td>
                                                    <td>{item?.receipt_no}</td>
                                                    <td>{item?.cancellation_date}</td>
                                                    <td>{`${item?.cancelled_by?.first_name ?? ""} ${item?.cancelled_by?.middle_name ?? ""} ${item?.cancelled_by?.last_name ?? ""}`}</td>
                                                    <td>{item?.cancel_reason}</td>
                                                </tr>
                                            ))
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeeCancellationReportTable;
