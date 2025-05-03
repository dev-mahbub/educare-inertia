import Checkbox from "@/Components/Checkbox";
import { useEffect, useState } from "react";
import PrintPopup from "./Popup/PrintPopup";

const PaymentInstallmentList = ({
    feeInstallments = {},
    sendSelectedFeeInstallmentDataToParent,
    selectedFeeIds = [],
    setSelectedFeeIds,
    selectedInstallments,
    setSelectedInstallments,
    selectFeeSequentially
}) => {
    const [modalPrintOpen, setModalPrintOpen] = useState(false);


    // Initialize state for each checkbox
    const [paymentInstallmentChecked, setPaymentInstallmentChecked] = useState(
        new Array(feeInstallments.length).fill(false)
    );

    // Handle checkbox change for a specific row
    const handlePaymentInstallmentCheckboxChange = (index) => {
        setPaymentInstallmentChecked((prevChecked) => {
            const newChecked = [...prevChecked];
            newChecked[index] = !newChecked[index];
            return newChecked;
        });
    };

    //print popup
    const handleModalPrintClick = () => {
        setModalPrintOpen(!modalPrintOpen);
    };


    // handle fee installment select start
    const handleFeeInstallmentSelect = (id) => {
        if ([...selectedFeeIds]?.includes(id)) {
            setSelectedFeeIds([...selectedFeeIds].filter((item) => item !== id));
        }
        else {
            if (selectFeeSequentially == true) {
                const newSelectedIds = Object.values(feeInstallments)?.filter(item => item?.payment_status != 'Paid' && item?.fee?.id <= id)?.map(item => item?.fee?.id);

                setSelectedFeeIds(newSelectedIds);
            }
            else {
                setSelectedFeeIds([
                    ...selectedFeeIds,
                    id,
                ]);
            }
        }

        if ([...selectedInstallments['fee_installment']]?.includes(id)) {
            setSelectedInstallments((prevData) => ({
                ...prevData,
                fee_installment: [...selectedInstallments['fee_installment']].filter((item) => item !== id)
            }));
        }
        else {
            if (selectFeeSequentially == true) {
                const newSelectedIds = Object.values(feeInstallments)?.filter(item => item?.payment_status != 'Paid' && item?.fee?.id <= id)?.map(item => item?.fee?.id);

                setSelectedInstallments((prevData) => ({
                    ...prevData,
                    fee_installment: [
                        // ...selectedInstallments['fee_installment'],
                        ...newSelectedIds,
                    ]
                }));
            }
            else {
                setSelectedInstallments((prevData) => ({
                    ...prevData,
                    fee_installment: [
                        ...selectedInstallments['fee_installment'],
                        id,
                    ]
                }));
            }
        }
    };
    // handle fee installment select end


    useEffect(() => {
        sendSelectedFeeInstallmentDataToParent(Object.values(feeInstallments)?.filter(item => selectedInstallments['fee_installment']?.includes(item?.fee?.id)), 'fee_installment');
    }, [selectedInstallments]);


    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Check</th>
                            <th>Sr.</th>
                            <th>Title</th>
                            <th>Payable</th>
                            <th>Paid</th>
                            <th>Due</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(feeInstallments)?.length > 0 ? (
                            Object.values(feeInstallments)?.map((item, index) => (
                                <tr key={index} className={item?.payment_status == 'Paid' ? 'bg-success' : (item?.payment_status == 'Partial' ? 'bg-danger' : '')}>
                                    <td>
                                        {item?.payment_status != 'Paid' &&
                                            <div className="educare-checkbox-field-styles">
                                                <Checkbox
                                                    name={`payment_installment_check_${index}`}
                                                    checked={
                                                        selectedInstallments['fee_installment']?.includes(item?.fee?.id)
                                                    }
                                                    value={item?.fee?.id}
                                                    onChange={(e) => {
                                                        handlePaymentInstallmentCheckboxChange(index);
                                                        handleFeeInstallmentSelect(item?.fee?.id);
                                                    }
                                                    }
                                                />
                                            </div>
                                        }
                                    </td>
                                    <td>{++index}</td>
                                    <td>{item?.fee?.title}</td>
                                    <td>{item?.total_payable_amount}</td>
                                    <td>{item.total_paid_amount}</td>
                                    <td>{item.total_due_amount}</td>
                                    {/* <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip
                                                    title="Print"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        type="button"
                                                        className="educare-tertiary-btn-sm-fill"
                                                        onClick={() => handleModalPrintClick(index)}
                                                    >
                                                        <i className="icon-printer"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className = "text-center text-red-500" colSpan = "7">Data not found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PrintPopup
                modalPrintOpen={modalPrintOpen}
                setModalPrintOpen={setModalPrintOpen}
            />
        </>
    );
};

export default PaymentInstallmentList;
