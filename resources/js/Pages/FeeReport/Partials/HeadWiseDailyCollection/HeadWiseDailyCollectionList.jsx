import Loader from "@/Components/Loader";
import { useEffect, useState } from "react";


const HeadWiseDailyCollectionList = ({
    loading,
    studentPaymentReportsData = [],
    payment_fee_types = []
}) => {
    let srnNo = 0;

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalDue, setTotalDue] = useState(0);

    useEffect(() => {
        setTotalAmount(Object.values(studentPaymentReportsData)?.reduce((total, item) => total + parseFloat(item?.grand_total_amount) ?? 0, 0))
        setTotalDiscount(Object.values(studentPaymentReportsData)?.reduce((total, item) => total + parseFloat(item?.grand_total_discount) ?? 0, 0))
        setTotalPayable(Object.values(studentPaymentReportsData)?.reduce((total, item) => total + parseFloat(item?.grand_total_payable) ?? 0, 0))
        setTotalPaid(Object.values(studentPaymentReportsData)?.reduce((total, item) => total + parseFloat(item?.grand_total_paid) ?? 0, 0))
        setTotalDue(Object.values(studentPaymentReportsData)?.reduce((total, item) => total + parseFloat(item?.grand_total_due) ?? 0, 0))
    }, [studentPaymentReportsData]);

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>SrNo</th>
                                        <th>Adm.No</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Father Name</th>
                                        <th>Receipt No</th>
                                        <th>School Receipt No</th>
                                        <th>Receipt Date</th>
                                        <th>Receipt Note</th>
                                        <th>Transection ID</th>
                                        <th>Order ID</th>
                                        <th>Mode</th>
                                        <th>Taken By</th>
                                        {Object.keys(payment_fee_types)?.length > 0 &&
                                            Object.keys(payment_fee_types)?.map((item, index) => (
                                                <th>{item}</th>
                                            ))
                                        }
                                        <th>Amount</th>
                                        <th>Concession</th>
                                        <th>Payable</th>
                                        <th>Paid</th>
                                        <th>Due</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(studentPaymentReportsData)?.length > 0 ?
                                            <>
                                                {Object.values(studentPaymentReportsData)?.map((item, parentIndex) => (
                                                    <>
                                                        {item?.reports?.map((report, index) => (
                                                            <tr key={index}>
                                                                <td>{++srnNo}</td>
                                                                <td>{report?.student?.admission_no ?? ""}</td>
                                                                <td>
                                                                    {`${report?.student?.first_name ?? ""} ${report?.student?.middle_name ?? ""} ${report?.student?.last_name ?? ""}`}
                                                                </td>
                                                                <td>{report?.student?.classroom?.title ?? ""}</td>
                                                                <td>
                                                                    {`${report?.student?.father?.first_name ?? ""} ${report?.student?.father?.middle_name ?? ""} ${report?.student?.father?.last_name ?? ""}`}
                                                                </td>
                                                                <td>
                                                                    {report?.receipt_no}
                                                                    {report?.is_cancelled == true &&
                                                                        <span className="badge bg-danger ml-1">C</span>
                                                                    }
                                                                </td>
                                                                <td>{report?.school_receipt_no}</td>
                                                                <td>{report?.payment_date}</td>
                                                                <td>{report?.receipt_note}</td>
                                                                <td>{report?.transaction_id}</td>
                                                                <td>{report?.order_id}</td>
                                                                <td>{report?.payment_mode}</td>
                                                                <td>{`${report?.created_by?.first_name ?? ''} ${report?.created_by?.middle_name ?? ''} ${report?.created_by?.last_name ?? ''}`}</td>
                                                                {Object.keys(payment_fee_types)?.length > 0 &&
                                                                    Object.keys(payment_fee_types)?.map((feeType, index) => (
                                                                        // <td> {formatNumber(report?.fee_payments?.find(paymentItem => paymentItem?.fee_type?.fee_type == feeType)?.paid_amount ?? 0)}</td>
                                                                        <td> {formatNumber(report?.fee_payments?.filter(paymentItem => paymentItem?.fee_type?.fee_type == feeType)?.reduce((total, item) => total + parseFloat(item?.paid_amount ?? 0), 0) ?? 0)}</td>
                                                                    ))
                                                                }
                                                                <td>{formatNumber(report?.total_amount)}</td>
                                                                <td>{formatNumber(report?.total_discount)}</td>
                                                                <td>{formatNumber(report?.total_payable)}</td>
                                                                <td>{formatNumber(report?.total_paid)}</td>
                                                                <td>{formatNumber(report?.total_due)}</td>
                                                            </tr>
                                                        ))}
                                                        <tr key={parentIndex}>
                                                            <td>{++srnNo}</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>Total</td>
                                                            <td></td>
                                                            {Object.keys(payment_fee_types)?.length > 0 &&
                                                                Object.keys(payment_fee_types)?.map((feeType, index) => (
                                                                    <td>{formatNumber(item?.payment_fee_types[feeType] ?? 0)}</td>
                                                                ))
                                                            }
                                                            <td>{formatNumber(item?.grand_total_amount)}</td>
                                                            <td>{formatNumber(item?.grand_total_discount)}</td>
                                                            <td>{formatNumber(item?.grand_total_payable)}</td>
                                                            <td>{formatNumber(item?.grand_total_paid)}</td>
                                                            <td>{formatNumber(item?.grand_total_due)}</td>
                                                        </tr>
                                                    </>
                                                ))}
                                                <tr className="bg-primary">
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Grand Total</td>
                                                    <td></td>
                                                    {Object.keys(payment_fee_types)?.length > 0 &&
                                                        Object.keys(payment_fee_types)?.map((feeType, index) => (
                                                            <td>{formatNumber(payment_fee_types[feeType] ?? 0)}</td>
                                                        ))
                                                    }
                                                    <td>{formatNumber(totalAmount)}</td>
                                                    <td>{formatNumber(totalDiscount)}</td>
                                                    <td>{formatNumber(totalPayable)}</td>
                                                    <td>{formatNumber(totalPaid)}</td>
                                                    <td>{formatNumber(totalDue)}</td>
                                                </tr>
                                            </>
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="30">
                                                    Data not found
                                                </td>
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

export default HeadWiseDailyCollectionList;
