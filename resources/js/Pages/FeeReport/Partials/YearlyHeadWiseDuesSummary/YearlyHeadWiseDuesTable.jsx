import Loader from "@/Components/Loader";
import { useEffect, useState } from "react";

const YearlyHeadWiseDuesTable = ({
    loading,
    dueSummaryData,
    installmentWiseAmounts = []
}) => {

    const [totalDueAmount, setTotalDueAmount] = useState(0);

    useEffect(() => {
        setTotalDueAmount(Object.values(installmentWiseAmounts)?.reduce((total, amount) => total + amount, 0));
    }, [installmentWiseAmounts])

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
                                        {Object.keys(installmentWiseAmounts)?.length > 0 &&
                                            Object.keys(installmentWiseAmounts)?.map((feeTitle, index) => (
                                                <th>{feeTitle}</th>
                                            ))
                                        }
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(dueSummaryData)?.length > 0 &&
                                            Object.values(dueSummaryData)?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.fee_type_title}</td>
                                                    {Object.keys(installmentWiseAmounts)?.length > 0 &&
                                                        Object.keys(installmentWiseAmounts)?.map((feeTitle, index) => (
                                                            <td>{item?.installment_wise_amounts[feeTitle] ?? 0}</td>
                                                        ))
                                                    }
                                                    <td>{item?.total_due}</td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td>
                                                <h6 className="text-[15px] font-semibold text-heading font-primary">Total</h6>
                                            </td>
                                            {Object.keys(installmentWiseAmounts)?.length > 0 &&
                                                Object.values(installmentWiseAmounts)?.map((amount, index) => (
                                                    <td>{amount}</td>
                                                ))
                                            }
                                            <td>{totalDueAmount}</td>
                                        </tr>
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

export default YearlyHeadWiseDuesTable;
