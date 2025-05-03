import { Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const CancelledPaymentReceiptTable = ({
    paymentReport
}) => {
    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(Array(paymentReport?.length).fill(false));
    const handleEnqToggle = (index) => {
        setEnqInnerActive((prevState) => {
            const newState = prevState.map((value, i) =>
                i === index ? !value : false
            );
            return newState;
        });
    };
    //table inner toggle collapse end

    const AdmissionListData = (e) => {
        e.preventDefault();
    };
    //form validation end

    useEffect(() => {
        setEnqInnerActive(Array(paymentReport?.length).fill(false));
    }, [paymentReport]);

    // handle print receipt start
    const handlePrintReceipt = (id, paymentType, reportType) => {
        let url = "";

        if (paymentType == 'Payment') {
            Cookies.set('ledger_payment_id', id);

            url = route('pdf_account.print_ledger_payment_receipt');
        } else if (paymentType == 'Receipt') {
            if (reportType == 'sale_ledger_payment') {
                Cookies.set('sale_ledger_payment_id', id);

                url = route('pdf_account.print_sale_ledger_payment_receipt');
            } else if (reportType == 'ledger_receipt') {
                Cookies.set('ledger_receipt_id', id);

                url = route('pdf_account.print_ledger_receipt');
            }
        }

        if(url != "") {
            window.open(url);
        }
    }
    // handle print receipt end


    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={AdmissionListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            {/* <th>Sr. No.</th> */}
                                            <th></th>
                                            <th>Receipt No.</th>
                                            <th>Ledger</th>
                                            <th>Payment/Receipt Date</th>
                                            <th>Narration</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentReport?.length > 0 ?
                                            <>
                                                {paymentReport?.map((item, index) => (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                {item?.payment_type}
                                                                <button
                                                                    type="button"
                                                                    className="educare-enq-arrow"
                                                                    onClick={() =>
                                                                        handleEnqToggle(index)
                                                                    }
                                                                >
                                                                    <i
                                                                        className={`${enqInnerActive[index]
                                                                                ? "icon-arrow-up"
                                                                                : "icon-down-arrow"
                                                                            }`}
                                                                    ></i>
                                                                </button>
                                                            </td>
                                                            <td>{item?.receipt_no}</td>
                                                            <td>{item?.ledger_title}</td>
                                                            <td>{item?.payment_date}</td>
                                                            <td>{item?.description}</td>
                                                            <td>{item?.total_amount}</td>
                                                            <td>
                                                                {(item?.report_type == "ledger_payment" || item?.report_type == "ledger_receipt" || item?.report_type == "sale_ledger_payment") &&
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
                                                                                    handlePrintReceipt(item?.id, item?.payment_type, item?.report_type)
                                                                                }}
                                                                            >
                                                                                <i className="icon-printer"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr
                                                            className={`${enqInnerActive[index]
                                                                    ? ""
                                                                    : "hidden"
                                                                }`}
                                                        >
                                                            <td
                                                                colSpan="12"
                                                                className="educare-admission-list-enq-inner-wrap"
                                                            >
                                                                <table className="educare-admission-list-enq-inner">
                                                                    {/* <thead>
                                                                        <tr>
                                                                            <th>
                                                                                Item
                                                                            </th>
                                                                            <th>Amount</th>
                                                                        </tr>
                                                                    </thead> */}
                                                                    <tbody>
                                                                        {item?.payment_items?.length > 0 &&
                                                                            item.payment_items.map((paymentItem, innerIndex) => (
                                                                                <tr key={innerIndex}>
                                                                                    <td>{paymentItem?.ledger_title}</td>
                                                                                    <td>{paymentItem?.amount}</td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Total</td>
                                                <td>{paymentReport?.reduce((total, item) => total + parseFloat(item?.total_amount ?? 0), 0)?.toFixed(2)}</td>
                                            </tr>
                                            </>
                                        :
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="10"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CancelledPaymentReceiptTable;
