import { Tooltip } from "@mui/material";
import React, { useState } from "react";

const OnlineFeeReceiptList = ({
    studentFeePaymentReports
}) => {

    const [enqInnerActive, setEnqInnerActive] = useState([]);

    const handleEnqToggle = (index) => {
        setEnqInnerActive((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const AdmissionListData = (e) => {
        e.preventDefault();
    };

    return (
        <div className="educare-admission-list-area">
            <div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <form onSubmit={AdmissionListData}>
                        <div className="educare-admission-list bg-supportingA/10">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Receipt No.</th>
                                        <th>Title</th>
                                        <th>Amount</th>
                                        <th>Dis.</th>
                                        <th>Payble</th>
                                        <th>Paid</th>
                                        <th>Due</th>
                                        <th>Date</th>
                                        <th>Mode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentFeePaymentReports?.length > 0 ?
                                        studentFeePaymentReports.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td>
                                                        {item?.receipt_no}
                                                        {item?.is_cancelled == true &&
                                                            <div className="educare-list-action-btn inline-flex ml-1">
                                                                <Tooltip
                                                                    title="Cancel"
                                                                    placement="top"
                                                                    arrow
                                                                    as="button"
                                                                >
                                                                    <span
                                                                        className="educare-danger-btn-sm-fill"
                                                                    >
                                                                        C
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                        }

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
                                                    <td>{item?.title}</td>
                                                    <td>{item?.total_amount}</td>
                                                    <td>{item?.total_discount}</td>
                                                    <td>{item?.total_payable}</td>
                                                    <td>{item?.total_paid}</td>
                                                    <td>{item?.total_due}</td>
                                                    <td>{item?.payment_date}</td>
                                                    <td>{item?.payment_mode}</td>
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
                                                            <thead>
                                                                <tr>
                                                                    <th>Title</th>
                                                                    <th>Amount</th>
                                                                    <th>Discount</th>
                                                                    <th>Payable</th>
                                                                    <th>Paid</th>
                                                                    <th>Due</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {item?.fee_payments?.map((feePayment, innerIndex) => (
                                                                    <tr key={innerIndex}>
                                                                        <td>{`${feePayment?.fee_type_title} - ${feePayment?.fee_title}`}</td>
                                                                        <td>{feePayment?.amount}</td>
                                                                        <td>{feePayment?.discount_amount}</td>
                                                                        <td>{feePayment?.payable_amount}</td>
                                                                        <td>{feePayment?.paid_amount}</td>
                                                                        <td>{feePayment?.due_amount}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))
                                    :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OnlineFeeReceiptList;
