import { useEffect, useState } from "react";

const ConsolidatedSaleReportListTable = ({
    consolidatedSaleSummary
}) => {

    const [totalSaleAmount, setTotalSaleAmount] = useState(0);
    const [totalSaleReturnAmount, setTotalSaleReturnAmount] = useState(0);

    useEffect(() => {
        setTotalSaleAmount(consolidatedSaleSummary?.reduce((total, item) => total + parseFloat(item.sale_amount ?? 0), 0));
        setTotalSaleReturnAmount(consolidatedSaleSummary?.reduce((total, item) => total + parseFloat(item.sale_return_amount ?? 0), 0));
    }, [consolidatedSaleSummary]);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <th>Sale Amount</th>
                                        <th>Sale Return Amount</th>
                                        <th>Balance Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consolidatedSaleSummary?.length > 0 &&
                                        consolidatedSaleSummary.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.payment_mode}</td>
                                                <td>{parseFloat(item.sale_amount ?? 0)?.toFixed(2)}</td>
                                                <td>{parseFloat(item.sale_return_amount ?? 0)?.toFixed(2)}</td>
                                                <td>{parseFloat((item.sale_amount ?? 0) - (item.sale_return_amount ?? 0))?.toFixed(2)}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td><h6 className="text-[15px] font-semibold text-heading font-primary">Total</h6></td>
                                        <td>{totalSaleAmount?.toFixed(2)}</td>
                                        <td>{totalSaleReturnAmount?.toFixed(2)}</td>
                                        <td>{(totalSaleAmount - totalSaleReturnAmount)?.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConsolidatedSaleReportListTable;
