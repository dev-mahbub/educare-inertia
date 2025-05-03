import { useEffect, useMemo } from "react";

const RefundCancelReportList = ({ feePaymentRefunds = [], filterText = "", setTotalRefundCount }) => {


    // filter refund data
    const filteredPaymentRefunds = useMemo(() => {
        return feePaymentRefunds.filter((item) => {
            const inputText = filterText?.toLowerCase().trim();

            const admissionNo = item?.student?.admission_no?.toLowerCase();
            const studentName = `${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`.toLowerCase();
            const classroomTitle = item?.student?.classroom?.title?.toLowerCase();
            const refund_date = item?.refund_date?.toLowerCase();
            const cancel_date = item?.cancel_date?.toLowerCase();
            const cancelled_by = item?.cancelled_by?.user?.first_name?.toLowerCase() + " " + item?.cancelled_by?.user?.middle_name?.toLowerCase() + " " +item?.cancelled_by?.user?.last_name?.toLowerCase();
            const cancellation_reason = String(item?.cancellation_reason)?.toLowerCase();

            return (
                (studentName && studentName.includes(inputText)) ||
                (admissionNo && admissionNo.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (refund_date && refund_date.includes(inputText)) ||
                (cancel_date && cancel_date.includes(inputText)) ||
                (cancelled_by && cancelled_by.includes(inputText)) ||
                (cancellation_reason && cancellation_reason.includes(inputText))
            );

        });
    }, [feePaymentRefunds, filterText]);
    //filter refund data

    // settotal refund count
    useEffect(() => {
        setTotalRefundCount(filteredPaymentRefunds?.length);
    }, [filteredPaymentRefunds])
    //end settotal refund count

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
                                        <th>Refund</th>
                                        <th>Refund Date</th>
                                        <th>Refund Cancel Date</th>
                                        <th>Cancelled By</th>
                                        <th>Cancellation Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPaymentRefunds?.length > 0 ?
                                        filteredPaymentRefunds?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.student?.admission_no}</td>
                                                <td>{`${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`}</td>
                                                <td>{item?.student?.classroom?.title}</td>
                                                <td>{item?.refund_amounts?.map(item => parseFloat(item?.refund_amount)).reduce((total, amount) => total + amount, 0)}</td>
                                                <td>{item?.refund_date}</td>
                                                <td>{item?.cancel_date}</td>
                                                <td>{`${item?.cancelled_by?.user?.first_name} ${item?.cancelled_by?.user?.middle_name} ${item?.cancelled_by?.user?.last_name}`}</td>
                                                <td>{item?.cancellation_reason}</td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="10">
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

export default RefundCancelReportList;
