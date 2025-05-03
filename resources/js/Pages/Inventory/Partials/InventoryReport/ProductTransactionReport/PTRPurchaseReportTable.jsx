import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";

const PTRPurchaseReportTable = ({
    transactionPurchaseReport,
    loading,
    setLoading,
    params
}) => {

    const [transactionPurchaseData, setTransactionPurchaseData] = useState(transactionPurchaseReport);

    useEffect(() => {
        setTransactionPurchaseData(transactionPurchaseReport);
        setLoading(false);
    }, [transactionPurchaseReport]);

    return (
        <>
            <form className="mb-2.5">
                <div className="educare-header-filter-topbar flex flex-wrap gap-2.5 items-center">
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-CurrencyInr"></i>
                            Purchase Report
                        </h5>
                    </div>
                    <div className="ml-auto whitespace-nowrap">
                        <div className="educare-header-filtar-bar-count">
                            <span>Total: {transactionPurchaseData?.length}</span>
                        </div>
                    </div>
                    {transactionPurchaseData?.length > 0 &&
                        <div className="educare-filter-action-btn inline-flex gap-2">
                            <div>
                                <Tooltip title="Dowload Pdf" placement="top" arrow>
                                    <a
                                        href={route('pdf_account.product_purchase_report', params)}
                                        target="_blank"
                                        className="educare-warning-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </a>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip title="Download Excel" placement="top" arrow>
                                    <a
                                        href={route('export_excel.inventory.product_purchase_report', params)}
                                        target="_blank"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        </div>
                    }
                </div>
            </form>
            <div className="educare-admission-list-inner-wrapper mb-8">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Product name</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Tax</th>
                                <th>Discount</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Loader></Loader>
                        ) : (
                            <tbody>
                                {transactionPurchaseData?.length > 0 ? (
                                    <>
                                        {transactionPurchaseData?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{moment(item?.purchase?.purchase_date_at).format("DD MMM, YYYY")}</td>
                                                <td>{item?.purchase?.party_ledger?.title}</td>
                                                <td>{item?.quantity}</td>
                                                <td>{parseFloat(item.rate ?? 0)?.toFixed(2)}</td>
                                                <td>0.00</td>
                                                <td>0.00</td>
                                                <td>{parseFloat(item.amount ?? 0)?.toFixed(2)}</td>
                                            </tr>
                                        ))}

                                        <tr>
                                            <td>Total</td>
                                            <td></td>
                                            <td>{transactionPurchaseData.reduce((total, item) => total + item?.quantity ?? 1, 0)}</td>
                                            <td></td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>{transactionPurchaseData.reduce((total, item) => total + parseFloat(item.amount ?? 0), 0)?.toFixed(2)}</td>
                                        </tr>
                                    </>
                                ) : (
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="12">
                                            Data not found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </>
    );
};

export default PTRPurchaseReportTable;
