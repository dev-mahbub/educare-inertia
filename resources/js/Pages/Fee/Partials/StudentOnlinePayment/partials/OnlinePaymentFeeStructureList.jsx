import React, { useState } from "react";

const OnlinePaymentFeeStructureList = ({
    installmentsData,
    totalAmount
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
                                        <th></th>
                                        <th>Title</th>
                                        <th>Payable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {installmentsData?.length > 0 ?
                                        <>
                                            {installmentsData.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td>
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
                                                        <td>{item?.fee?.title}</td>
                                                        <td>{item?.total_due_amount}</td>
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
                                                                        <th>Paid</th>
                                                                        <th>Payable</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.fee_type_amounts?.map((feeTypeData, innerIndex) => (
                                                                        <tr key={innerIndex} className={feeTypeData?.payment_status == 'Partial' ? 'bg-rose-300' : (feeTypeData?.payment_status == 'Paid' ? 'bg-green-200' : '')}>
                                                                            <td>{feeTypeData?.fee_type_title}</td>
                                                                            <td>{feeTypeData?.amount}</td>
                                                                            <td>{feeTypeData?.discount_amount}</td>
                                                                            <td>{feeTypeData?.paid_amount}</td>
                                                                            <td>{feeTypeData?.payable_amount}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}

                                            <tr>
                                                <td colSpan={2} className="text-end">Total</td>
                                                <td>
                                                    {totalAmount}
                                                </td>
                                            </tr>
                                        </>
                                    :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="7">Select installment</td>
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

export default OnlinePaymentFeeStructureList;
