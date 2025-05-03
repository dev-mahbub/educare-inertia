import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import Cookies from 'js-cookie';
import moment from "moment";
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import CancelPurchasePopup from "./Popup/CancelPurchasePopup";

const PurchaseReportTable = ({
    purchaseReport,
    loading,
    setLoading,
    formData
}) => {

    const [purchaseReportData, setPurchaseReportData] = useState(purchaseReport);
    const [enqInnerActive, setEnqInnerActive] = useState('');
    const [cancelPurchasePopup, setCancelPurchasePopup] = useState(false);
    const [purchaseId, setPurchaseId] = useState(null);

    useEffect(() => {
        setPurchaseReportData(purchaseReport)
        setLoading(false);
    }, [purchaseReport]);


    // handle cancel payment start
    const handleCancelPurchase = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                setPurchaseId(id);
                setCancelPurchasePopup(true);
            }
        });
    }
    // handle cancel payment end

    // handle print receipt start
    const handlePrintReceipt = (id) => {
        Cookies.set('purchase_id', id);

        const url = route('pdf_account.print_purchase_receipt');

        window.open(url);
    }
    // handle print receipt end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Party Account</th>
                                        <th>Ledger</th>
                                        <th>Purchase Date</th>
                                        <th>Invoice no.</th>
                                        <th>Sub Total</th>
                                        <th>Discount</th>
                                        <th>Tax</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {purchaseReportData?.length > 0 ? (
                                            <>
                                                {purchaseReportData?.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr>
                                                            <td>
                                                                {++index}
                                                                <button
                                                                    type="button"
                                                                    className="educare-enq-arrow"
                                                                    onClick={() => setEnqInnerActive(enqInnerActive === index ? '' : index)}
                                                                >
                                                                    <i className={enqInnerActive === index ? "icon-arrow-up" : "icon-down-arrow"}></i>
                                                                </button>
                                                            </td>

                                                            <td>{item?.party_ledger?.title}</td>
                                                            <td>{item?.ledger?.title}</td>
                                                            <td>{moment(item?.purchase_date_at).format("DD MMM, YYYY")}</td>
                                                            <td>{item?.supplier_invoice_no}</td>
                                                            <td>{parseFloat(item.sub_total ?? 0)?.toFixed(2)}</td>
                                                            <td>{parseFloat(item.discount_amount ?? 0)?.toFixed(2)}</td>
                                                            <td>{parseFloat(item.tax_amount ?? 0)?.toFixed(2)}</td>
                                                            <td>{parseFloat(item.total ?? 0)?.toFixed(2)}</td>
                                                            <td>
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Print Receipt"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="educare-tertiary-btn-sm-fill"
                                                                                onClick={() => {
                                                                                    handlePrintReceipt(item?.id)
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
                                                                        >
                                                                            <button
                                                                                className="educare-danger-btn-sm-fill"
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    handleCancelPurchase(item?.id)
                                                                                }}
                                                                            >
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className={enqInnerActive === index ? '' : 'hidden'}>
                                                            <td colSpan="12" className="educare-admission-list-enq-inner-wrap">
                                                                <table className="educare-admission-list-enq-inner">
                                                                    <thead>
                                                                        <tr>
                                                                            <th colSpan="3">Product name</th>
                                                                            <th>Quantity</th>
                                                                            <th>Rate</th>
                                                                            <th>Amount</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {item?.purchase_products?.length > 0 ? (
                                                                            item?.purchase_products.map((productItem, subIndex) => (
                                                                                <>
                                                                                    <tr key={subIndex}>
                                                                                        <td colSpan="3">{productItem?.product?.title}</td>
                                                                                        <td>{productItem?.quantity}</td>
                                                                                        <td>{parseFloat(productItem.rate ?? 0)?.toFixed(2)}</td>
                                                                                        <td>{parseFloat(productItem.amount ?? 0)?.toFixed(2)}</td>
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
                                                ))}

                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Total</td>
                                                    <td>
                                                        {purchaseReportData?.reduce((total, item) => total + parseFloat(item.total ?? 0), 0)?.toFixed(2)}
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </>
                                        ) : (
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">
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
            <CancelPurchasePopup
                cancelPurchasePopup={cancelPurchasePopup}
                setCancelPurchasePopup={setCancelPurchasePopup}
                purchaseId={purchaseId}
                setPurchaseId={setPurchaseId}
                formData={formData}
            />
        </>
    );
};

export default PurchaseReportTable;
