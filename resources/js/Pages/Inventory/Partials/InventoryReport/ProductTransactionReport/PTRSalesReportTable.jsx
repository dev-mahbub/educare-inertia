import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";

const PTRSalesReportTable = ({
    transactionSaleReport,
    loading,
    setLoading,
    params
}) => {

    const [transactionSaleData, setTransactionSaleData] = useState(transactionSaleReport);

    useEffect(() => {
        setTransactionSaleData(transactionSaleReport);
        setLoading(false);
    }, [transactionSaleReport]);

    return (
        <>
            <form className="mb-2.5">
                <div className="educare-header-filter-topbar flex flex-wrap gap-2.5 items-center">
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-CurrencyInr"></i>
                            Sale Report
                        </h5>
                    </div>
                    <div className="ml-auto whitespace-nowrap">
                        <div className="educare-header-filtar-bar-count">
                            <span>Total: {transactionSaleData?.length}</span>
                        </div>
                    </div>

                    {transactionSaleData?.length > 0 &&
                        <div className="educare-filter-action-btn inline-flex gap-2">
                            <div>
                                <Tooltip title="Dowload Pdf" placement="top" arrow>
                                    <a
                                        href={route('pdf_account.product_sale_report', params)}
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
                                        href={route('export_excel.inventory.product_sale_report', params)}
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
            <div className="educare-admission-list-inner-wrapper">
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
                                {transactionSaleData?.length > 0 ? (
                                    <>
                                        {transactionSaleData?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{moment(item?.sale_ledger?.sale_date_at).format("DD MMM, YYYY")}</td>
                                                <td>
                                                    {item?.sale_ledger?.sale_type_for == 'Student' &&
                                                        `${item?.sale_ledger?.student?.first_name} ${item?.sale_ledger?.student?.middle_name} ${item?.sale_ledger?.student?.last_name}`
                                                    }

                                                    {item?.sale_ledger?.sale_type_for == 'Teacher' &&
                                                        `${item?.sale_ledger?.staff?.first_name} ${item?.sale_ledger?.staff?.middle_name} ${item?.sale_ledger?.staff?.last_name}`
                                                    }
                                                    {/* {item?.product?.title} */}
                                                </td>
                                                <td>{item?.quantity}</td>
                                                <td>{item?.rate}</td>
                                                <td>{parseFloat(item.tax_amount ?? 0)?.toFixed(2)}</td>
                                                <td>{parseFloat(item.discount_amount ?? 0)?.toFixed(2)}</td>
                                                <td>{parseFloat(item.total_amount ?? 0)?.toFixed(2)}</td>
                                            </tr>
                                        ))}

                                        <tr>
                                            <td>Total</td>
                                            <td></td>
                                            <td>{transactionSaleData.reduce((total, item) => total + item?.quantity ?? 1, 0)}</td>
                                            <td></td>
                                            <td>{transactionSaleData.reduce((total, item) => total + parseFloat(item.tax_amount ?? 0), 0)?.toFixed(2)}</td>
                                            <td>{transactionSaleData.reduce((total, item) => total + parseFloat(item.discount_amount ?? 0), 0)?.toFixed(2)}</td>
                                            <td>{transactionSaleData.reduce((total, item) => total + parseFloat(item.total_amount ?? 0), 0)?.toFixed(2)}</td>
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

export default PTRSalesReportTable;
