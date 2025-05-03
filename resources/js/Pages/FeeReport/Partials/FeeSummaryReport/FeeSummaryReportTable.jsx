import React, { useEffect, useState } from "react";
import Loader from "@/Components/Loader";

const FeeSummaryReportTable = ({
    feeSummaryReport, 
    loading
}) => {

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalDue, setTotalDue] = useState(0);
    const [totalRefund, setTotalRefund] = useState(0);
    const [totalNullified, setTotalNullified] = useState(0);
    const [totalAdjusted, setTotalAdjusted] = useState(0);

    useEffect(() => {
        if(Object.keys(feeSummaryReport)?.length > 0){
            setTotalAmount(Object.values(feeSummaryReport)?.reduce((total, item) => total + item?.total_amount ?? 0, 0));
            setTotalDiscount(Object.values(feeSummaryReport)?.reduce((total, item) => total + item?.total_discount ?? 0, 0));
            setTotalPayable(Object.values(feeSummaryReport)?.reduce((total, item) => total + item?.total_payable ?? 0, 0));
            setTotalPaid(Object.values(feeSummaryReport)?.reduce((total, item) => total + item?.total_paid ?? 0, 0));
            setTotalDue(Object.values(feeSummaryReport)?.reduce((total, item) => total + item?.total_due ?? 0, 0));
            setTotalRefund(Object.values(feeSummaryReport)?.reduce((total, item) => total + item?.total_refund ?? 0, 0));
            setTotalNullified(Object.values(feeSummaryReport)?.reduce((total, item) => total + item?.total_nullified ?? 0, 0));
            setTotalAdjusted(Object.values(feeSummaryReport)?.reduce((total, item) => total + item?.total_adjusted ?? 0, 0));
        }
    }, [feeSummaryReport]);

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
                                        <th>Title</th>
                                        <th>Total Amount</th>
                                        <th>Total Concession</th>
                                        <th>Total Payable</th>
                                        <th>Total Paid</th>
                                        <th>Total Refunded</th>
                                        <th>Total Nullify</th>
                                        <th>Adjust Fee</th>
                                        <th>Net Receipt</th>
                                        <th>Total Due</th>
                                    </tr>
                                    <tr>
                                        <th>A</th>
                                        <th>B</th>
                                        <th>C</th>
                                        <th>D</th>
                                        <th>E</th>
                                        <th>F</th>
                                        <th>G</th>
                                        <th>H</th>
                                        <th>I=(E-F+H)</th>
                                        <th>J=(D-E)</th>
                                    </tr>
                                </thead>
                                {loading ? 
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(feeSummaryReport)?.length > 0 ?
                                            <>
                                                {Object.values(feeSummaryReport)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.fee_type_title ?? ""}</td>
                                                        <td>{formatNumber(item?.total_amount ?? 0)}</td>
                                                        <td>{formatNumber(item?.total_discount ?? 0)}</td>
                                                        <td>{formatNumber(item?.total_payable ?? 0)}</td>
                                                        <td>{formatNumber(item?.total_paid ?? 0)}</td>
                                                        <td>{formatNumber(item?.total_refund ?? 0)}</td>
                                                        <td>{formatNumber(item?.total_nullified ?? 0)}</td>
                                                        <td>{formatNumber(item?.total_adjusted ?? 0)}</td>
                                                        <td>{formatNumber((item?.total_paid ?? 0) - ((item?.total_refund ?? 0) + (item?.total_adjusted ?? 0)))}</td>
                                                        <td>{formatNumber(item?.total_due?? 0)}</td>
                                                    </tr>
                                                    ))
                                                }
                                                {/* // <tr>
                                                //     <td>Comprehensive Fee Summary Report</td>
                                                //     <td>4000</td>
                                                //     <td>2000</td>
                                                //     <td>3000</td>
                                                //     <td>4000</td>
                                                //     <td>1000</td>
                                                //     <td>1200</td>
                                                //     <td>1300</td>
                                                //     <td>500</td>
                                                //     <td>6000</td>
                                                // </tr>
                                                // <tr className="educare-table-row-active">
                                                //     <td>Comprehensive Fee Summary Report</td>
                                                //     <td>4000</td>
                                                //     <td>2000</td>
                                                //     <td>3000</td>
                                                //     <td>4000</td>
                                                //     <td>1000</td>
                                                //     <td>1200</td>
                                                //     <td>1300</td>
                                                //     <td>500</td>
                                                //     <td>6000</td>
                                                // </tr>
                                                // <tr>
                                                //     <td>Comprehensive Fee Summary Report</td>
                                                //     <td>4000</td>
                                                //     <td>2000</td>
                                                //     <td>3000</td>
                                                //     <td>4000</td>
                                                //     <td>1000</td>
                                                //     <td>1200</td>
                                                //     <td>1300</td>
                                                //     <td>500</td>
                                                //     <td>6000</td>
                                                // </tr> */}
                                                <tr>
                                                    <td><h6 className="text-[15px] font-semibold text-heading font-primary">
                                                        Total
                                                    </h6></td>
                                                    <td>{formatNumber(totalAmount)}</td>
                                                    <td>{formatNumber(totalDiscount)}</td>
                                                    <td>{formatNumber(totalPayable)}</td>
                                                    <td>{formatNumber(totalPaid)}</td>
                                                    <td>{formatNumber(totalRefund)}</td>
                                                    <td>{formatNumber(totalNullified)}</td>
                                                    <td>{formatNumber(totalAdjusted)}</td>
                                                    <td>{formatNumber(totalPaid - (totalRefund + totalAdjusted))}</td>
                                                    <td>{formatNumber(totalDue)}</td>
                                                </tr>
                                            </>
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

export default FeeSummaryReportTable;
