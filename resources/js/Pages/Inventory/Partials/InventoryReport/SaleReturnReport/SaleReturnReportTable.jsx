import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import Cookies from 'js-cookie';
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CancelSaleReturnPopup from "./Popup/CancelSaleReturnPopup";

const SaleReturnReportTable = ({
    saleReturnReport,
    loading,
    setLoading,
    formData
}) => {
    const [saleReturnData, setSaleReturnData] = useState(saleReturnReport);
    const [enqInnerActive, setEnqInnerActive] = useState('');
    const [cancelSaleReturnPopup, setCancelSaleReturnPopup] = useState(false);
    const [saleLedgerReturnId, setSaleLedgerReturnId] = useState(null);

    const totalSubTotalAmount = saleReturnData?.reduce((total, item) => total + parseFloat(item?.sub_total ?? 0), 0);
    const totalDiscountAmount = saleReturnData?.reduce((total, item) => total + parseFloat(item?.total_discount ?? 0), 0);
    const totalTaxAmount = saleReturnData?.reduce((total, item) => total + parseFloat(item?.total_tax ?? 0), 0);
    const totalAmount = saleReturnData?.reduce((total, item) => total + parseFloat(item?.total ?? 0), 0);

    useEffect(() => {
        setSaleReturnData(saleReturnReport)
        setLoading(false);
    }, [saleReturnReport]);

    // handle cancel sale return start
    const handleCancelSaleReturn = (id) => {
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
                // router.patch(route('sale_return.cancel', id));
                setSaleLedgerReturnId(id);
                setCancelSaleReturnPopup(true);
            }
        });
    }
    // handle cancel sale return end

    // handle print sale return receipt start
    const handlePrintSaleReturnReceipt = (id) => {
        Cookies.set('sale_ledger_return_id', id);

        window.open(route('pdf_account.print_sale_return_receipt'));
    }
    // handle print sale return receipt end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No. </th>
                                        <th>Receipt No</th>
                                        <th>Party name</th>
                                        <th>Sale Invoice No.</th>
                                        <th>Sale Return Date</th>
                                        <th>Sub Total</th>
                                        <th>Discount</th>
                                        <th>Tax</th>
                                        <th>Total Amt.</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                <tbody>
                                    {saleReturnData?.length > 0 ? (
                                        <React.Fragment>
                                            {saleReturnData?.map((item, index) => (
                                                <React.Fragment>
                                                    <tr key={index}>
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
                                                        <td>{item?.receipt_no}</td>
                                                        <td>{item?.return_type_for == 'Student' ? `${item?.student?.first_name ?? ''} ${item?.student?.middle_name ?? ''} ${item?.student?.last_name ?? ''}` : `${item?.staff?.first_name ?? ''} ${item?.staff?.middle_name ?? ''} ${item?.staff?.last_name ?? ''}`}</td>
                                                        <td>{item?.sale_invoice_no}</td>
                                                        <td>{moment(item?.return_date_at).format("DD MMM, YYYY")}</td>
                                                        <td>{item?.sub_total}</td>
                                                        <td>{item?.total_discount}</td>
                                                        <td>{item?.total_tax}</td>
                                                        <td>{item?.total}</td>
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
                                                                                handlePrintSaleReturnReceipt(item?.id)
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
                                                                                handleCancelSaleReturn(item?.id)
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
                                                                        <th></th>
                                                                        <th></th>
                                                                        <th colSpan="1">Product name</th>
                                                                        <th>Quantity</th>
                                                                        <th>Rate</th>
                                                                        {/* <th>Tax amount</th>
                                                                        <th>Discount</th> */}
                                                                        <th>Amount</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.sale_ledger_return_products?.length > 0 ? (
                                                                        item?.sale_ledger_return_products.map((productItem, subIndex) => (
                                                                            <>
                                                                                <tr key={subIndex}>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td colSpan="1">{productItem?.product?.title}</td>
                                                                                    <td>{productItem?.quantity}</td>
                                                                                    <td>{productItem?.rate}</td>
                                                                                    {/* <td>{productItem?.tax_amount}</td>
                                                                                    <td>{productItem?.discount_value}</td> */}
                                                                                    <td>{productItem?.total_amount}</td>
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
                                                <td>Total</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>{totalSubTotalAmount}</td>
                                                <td>{totalDiscountAmount}</td>
                                                <td>{totalTaxAmount}</td>
                                                <td>{totalAmount}</td>
                                                <td></td>
                                            </tr>
                                        </React.Fragment>
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
            <CancelSaleReturnPopup
                cancelSaleReturnPopup={cancelSaleReturnPopup}
                setCancelSaleReturnPopup={setCancelSaleReturnPopup}
                saleLedgerReturnId={saleLedgerReturnId}
                setSaleLedgerReturnId={setSaleLedgerReturnId}
                formData={formData}
            />
        </>
    );
};

export default SaleReturnReportTable;
