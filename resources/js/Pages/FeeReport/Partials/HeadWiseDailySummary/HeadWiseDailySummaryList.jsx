import Loader from "@/Components/Loader";
import { useEffect, useState } from "react";

const HeadWiseDailySummaryList = ({
    summaryData,
    loading,
    filterMode,
    payment_fee_types = [],
    payment_mode_types = []
}) => {

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(() => {
        setTotalAmount(Object.values(summaryData)?.reduce((total, item) => total + parseFloat(item?.total_paid) ?? 0, 0))
        setTotalDiscount(Object.values(summaryData)?.reduce((total, item) => total + parseFloat(item?.total_discount) ?? 0, 0))
    }, [summaryData]);

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            {(filterMode === 'head_wise' && Object.keys(payment_fee_types)?.length > 0) &&
                                Object.keys(payment_fee_types)?.map((item) => (
                                    <th>{item}</th>
                                ))
                            }

                            {(filterMode === 'payment_mode_wise' && Object.keys(payment_mode_types)?.length > 0) &&
                                Object.keys(payment_mode_types)?.map((item) => (
                                    <th>{item}</th>
                                ))
                            }
                            <th>Total</th>
                            <th>Concession</th>
                        </tr>
                    </thead>
                    {loading ?
                        <Loader></Loader>
                    :
                        <tbody>
                            {Object.keys(summaryData)?.length > 0 &&
                                Object.values(summaryData)?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.payment_date}</td>
                                        {(filterMode === 'head_wise' && Object.keys(payment_fee_types)?.length > 0) &&
                                            Object.keys(payment_fee_types)?.map((feeType) => (
                                                <td>{item?.payment_fee_types[feeType] ?? 0}</td>
                                            ))
                                        }

                                        {(filterMode === 'payment_mode_wise' && Object.keys(payment_mode_types)?.length > 0) &&
                                            Object.keys(payment_mode_types)?.map((paymentMode) => (
                                                <td>{item?.payment_mode_types[paymentMode] ?? 0}</td>
                                            ))
                                        }
                                        <td>{item?.total_paid ?? 0}</td>
                                        <td>{item?.total_discount ?? 0}</td>
                                    </tr>
                                ))
                            }

                            <tr className="bg-primary">
                                <td>Total</td>
                                {(filterMode === 'head_wise' && Object.keys(payment_fee_types)?.length > 0) &&
                                    Object.keys(payment_fee_types)?.map((feeType) => (
                                        <td>{payment_fee_types[feeType] ?? 0}</td>
                                    ))
                                }

                                {(filterMode === 'payment_mode_wise' && Object.keys(payment_mode_types)?.length > 0) &&
                                    Object.keys(payment_mode_types)?.map((paymentMode) => (
                                        <td>{payment_mode_types[paymentMode] ?? 0}</td>
                                    ))
                                }
                                <td>{totalAmount}</td>
                                <td>{totalDiscount}</td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
};

export default HeadWiseDailySummaryList;
