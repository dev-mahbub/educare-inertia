import Loader from "@/Components/Loader";
import { useEffect, useState } from "react";

const YearlyHeadWisePaidSummaryTable = ({
    yearlyFeePaymentSummary,
    loading,
    month_wise_amounts = [],
}) => {

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalRefund, setTotalRefund] = useState(0);

    useEffect(() => {
        setTotalAmount(Object.values(yearlyFeePaymentSummary)?.reduce((total, item) => total + parseFloat(item?.total_paid) ?? 0, 0))
        setTotalRefund(Object.values(yearlyFeePaymentSummary)?.reduce((total, item) => total + parseFloat(item?.total_refund) ?? 0, 0))
    }, [yearlyFeePaymentSummary]);

    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Fee Type</th>
                            {Object.keys(month_wise_amounts)?.length > 0 &&
                                Object.keys(month_wise_amounts)?.map(item => (
                                    <th>{item}</th>
                                ))
                            }
                            <th>Total</th>
                            <th>Refund</th>
                            <th>Net Receipt</th>
                        </tr>
                    </thead>
                    {loading ?
                        <Loader></Loader>
                    :
                        <tbody>
                            {Object.keys(yearlyFeePaymentSummary)?.length > 0 &&
                                Object.values(yearlyFeePaymentSummary)?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.fee_type_title}</td>
                                        {Object.keys(month_wise_amounts)?.length > 0 &&
                                            Object.keys(month_wise_amounts)?.map(month => (
                                                <td>{item?.month_wise_amounts[month] ?? 0}</td>
                                            ))
                                        }
                                        <td>{item?.total_paid}</td>
                                        <td>{item?.total_refund}</td>
                                        <td>{item?.total_paid - item?.total_refund}</td>
                                    </tr>
                                ))
                            }

                            <tr className="bg-primary">
                                <td>
                                    <h6 className="text-[15px] font-semibold text-heading font-primary">
                                        Total
                                    </h6>
                                </td>
                                {Object.keys(month_wise_amounts)?.length > 0 &&
                                    Object.keys(month_wise_amounts)?.map(month => (
                                        <td>
                                            <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                {month_wise_amounts[month] ?? 0}
                                            </h6>
                                        </td>
                                    ))
                                }
                                <td>
                                    <h6 className="text-[15px] font-semibold text-heading font-primary">
                                        {totalAmount}
                                    </h6>
                                </td>
                                <td>
                                    <h6 className="text-[15px] font-semibold text-heading font-primary">
                                        {totalRefund}
                                    </h6>
                                </td>
                                <td>
                                    <h6 className="text-[15px] font-semibold text-heading font-primary">
                                        {totalAmount - totalRefund}
                                    </h6>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </>
    );
};

export default YearlyHeadWisePaidSummaryTable;
