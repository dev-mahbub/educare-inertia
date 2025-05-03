import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import Cookies from 'js-cookie';
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CancelSaleLedgerPopup from "./Popup/CancelSaleLedgerPopup";

const SaleRegisterReportTable = ({
    saleReport,
    loading,
    setLoading,
    formData,
    paymentModeSummary,
    takenBySummary
}) => {

    const [saleReportData, setSaleReportData] = useState(saleReport);
    const [enqInnerActive, setEnqInnerActive] = useState('');
    const [cancelSaleLedgerPopup, setCancelSaleLedgerPopup] = useState(false);
    const [saleLedgerLedgerId, setSaleLedgerLedgerId] = useState(null);

    const totalPaidByPaymentMode = paymentModeSummary?.reduce((total, item) => total + parseFloat(item?.amount ?? 0), 0);
    const totalPaidByAdmin = takenBySummary?.reduce((total, item) => total + parseFloat(item?.amount ?? 0), 0);

    useEffect(() => {
        setSaleReportData(saleReport);
        setLoading(false);
    }, [saleReport]);

    // handle cancel sale return start
    const handleCancelSaleLedger = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                setSaleLedgerLedgerId(id);
                setCancelSaleLedgerPopup(true);
            }
        });
    }
    // handle cancel sale return end

    // handle print sale return receipt start
    const handlePrintSaleLedgerReceipt = (id) => {
        Cookies.set('sale_ledger_id', id);

        window.open(route('pdf_account.print_sale_ledger_receipt'));
    }
    // handle print sale return receipt end

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
                                        <th>Invoice No</th>
                                        <th>Party name</th>
                                        <th>Party Type</th>
                                        <th>Sale Date</th>
                                        <th>Sub Total</th>
                                        <th>Discount</th>
                                        <th>Tax</th>
                                        <th>Total Amt.</th>
                                        <th>Due</th>
                                        <th>Paid</th>
                                        <th>Taken By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {saleReportData?.length > 0 ? (
                                            saleReportData?.map((item, index) => (
                                                <React.Fragment>
                                                    <tr key={index}>
                                                        <td>
                                                            {item?.invoice_no}
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() => setEnqInnerActive(enqInnerActive === index ? '' : index)}
                                                            >
                                                                <i className={enqInnerActive === index ? "icon-arrow-up" : "icon-down-arrow"}></i>
                                                            </button>
                                                        </td>
                                                        <td>{item?.sale_type_for == 'Teacher' ? `${item?.staff?.first_name ?? ''} ${item?.staff?.middle_name ?? ''} ${item?.staff?.last_name ?? ''}` : `${item?.student?.first_name ?? ''} ${item?.student?.middle_name ?? ''} ${item?.student?.last_name ?? ''}`}</td>
                                                        <td>{item?.sale_type_for}</td>
                                                        <td>{moment(item?.sale_date_at).format("DD MMM, YYYY")}</td>
                                                        <td>{parseFloat(item.sub_total ?? 0)?.toFixed(2)}</td>
                                                        <td>{parseFloat(item.total_discount ?? 0)?.toFixed(2)}</td>
                                                        <td>{parseFloat(item.total_tax ?? 0)?.toFixed(2)}</td>
                                                        <td>{parseFloat(item.total ?? 0)?.toFixed(2)}</td>
                                                        <td>{parseFloat(item.due_amount ?? 0)?.toFixed(2)}</td>
                                                        <td>{parseFloat(item.paid_amount ?? 0)?.toFixed(2)}</td>
                                                        <td>{`${item?.created_by?.first_name ?? ''} ${item?.created_by?.middle_name ?? ''} ${item?.created_by?.last_name ?? ''}`}</td>
                                                        <td>
                                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                <div>
                                                                    <Tooltip
                                                                        title="Print"
                                                                        placement="top"
                                                                        arrow
                                                                        as="button"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="educare-warning-btn-sm-fill"
                                                                            onClick={() => {
                                                                                handlePrintSaleLedgerReceipt(item?.id)
                                                                            }}
                                                                        >
                                                                            <i className="icon-printer"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Delete"
                                                                        placement="top"
                                                                        arrow
                                                                        as="button"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="educare-danger-btn-sm-fill"
                                                                            onClick={() => {
                                                                                handleCancelSaleLedger(item?.id)
                                                                            }}
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr
                                                        className={enqInnerActive === index ? '' : 'hidden'}
                                                    >
                                                        <td colSpan="12" className="educare-admission-list-enq-inner-wrap">
                                                            <table className="educare-admission-list-enq-inner">
                                                                <thead>
                                                                    <tr>
                                                                        <th colSpan="1">Product name</th>
                                                                        <th>Quantity</th>
                                                                        <th>Rate</th>
                                                                        <th>Tax amount</th>
                                                                        <th>Discount</th>
                                                                        <th>Amount</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.sale_ledger_products?.length > 0 ? (
                                                                        item?.sale_ledger_products.map((productItem, subIndex) => (
                                                                            <>
                                                                                <tr key={subIndex}>
                                                                                    <td colSpan="1">{productItem?.product?.title}</td>
                                                                                    <td>{productItem.quantity ?? 1}</td>
                                                                                    <td>{parseFloat(productItem.rate ?? 0)?.toFixed(2)}</td>
                                                                                    <td>{parseFloat(productItem.tax_amount ?? 0)?.toFixed(2)}</td>
                                                                                    <td>{parseFloat(productItem.discount_amount ?? 0)?.toFixed(2)}</td>
                                                                                    <td>{parseFloat(productItem.total_amount ?? 0)?.toFixed(2)}</td>
                                                                                </tr>
                                                                            </>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="10">No product items found</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))
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
                </div>
            </div>
            <div className="grid grid-cols-12 gap-5 mt-10">
                <div className="col-span-12 md:col-span-6">
                    <div className="educare-default-table xs:overflow-x-auto table-width-full">
                        <table>
                            <thead>
                                <tr>
                                    <th>Payment Mode</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            {loading ?
                                <Loader></Loader>
                                :
                                <tbody>
                                    {paymentModeSummary?.length > 0 &&
                                        paymentModeSummary?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.payment_mode}</td>
                                                <td>{formatNumber(item?.amount)}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td><h5 className="font-bold text-headingLight">Total :</h5></td>
                                        <td>
                                            <h5 className="font-bold text-headingLight">
                                                {formatNumber(totalPaidByPaymentMode)}
                                            </h5>
                                        </td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="educare-default-table xs:overflow-x-auto table-width-full">
                        <table>
                            <thead>
                                <tr>
                                    <th>Taken By</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            {loading ?
                                <Loader></Loader>
                                :
                                <tbody>
                                    {takenBySummary?.length > 0 &&
                                        takenBySummary?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.taken_by}</td>
                                                <td>{formatNumber(item?.amount)}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td><h5 className="font-bold text-headingLight">Total :</h5></td>
                                        <td>
                                            <h5 className="font-bold text-headingLight">
                                                {formatNumber(totalPaidByAdmin)}
                                            </h5>
                                        </td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
            <CancelSaleLedgerPopup
                cancelSaleLedgerPopup={cancelSaleLedgerPopup}
                setCancelSaleLedgerPopup={setCancelSaleLedgerPopup}
                saleLedgerLedgerId={saleLedgerLedgerId}
                setSaleLedgerLedgerId={setSaleLedgerLedgerId}
                formData={formData}
            />
        </>
    );
};

export default SaleRegisterReportTable;
