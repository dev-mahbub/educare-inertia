import Checkbox from "@/Components/Checkbox";
import { useEffect, useState } from "react";
import PrintPopup from "./Popup/PrintPopup";

const PaymentVoucherList = ({
    feeVouchers = [],
    sendSelectedFeeVoucherDataToParent,
    selectedVoucherIds = [],
    setSelectedVoucherIds,
    selectedInstallments,
    setSelectedInstallments
}) => {
    // const [selectedVoucherIds, setSelectedVoucherIds] = useState([]);


    const [paymentVoucherChecked, setPaymentVoucherChecked] = useState([
        false,
        false,
    ]);

    const [modalPrintOpen, setModalPrintOpen] = useState(false);

    // Handle checkbox change for a specific row
    const handlePaymentVoucherCheckboxChange = (index) => {
        setPaymentVoucherChecked((prevChecked) => {
            const newChecked = [...prevChecked];
            newChecked[index] = !newChecked[index];
            return newChecked;
        });
    };

     //print popup
    const handleModalPrintClick = () => {
        setModalPrintOpen(!modalPrintOpen);
    };


    const handleFeeVoucherSelect = (id) => {
        if ([...selectedVoucherIds]?.includes(id)) {
            setSelectedVoucherIds([...selectedVoucherIds].filter((item) => item !== id));
        }
        else {
            setSelectedVoucherIds([
                ...selectedVoucherIds,
                id,
            ]);
        }

        if ([...selectedInstallments['general_voucher']]?.includes(id)) {
            setSelectedInstallments((prevData) => ({
                ...prevData,
                general_voucher: [...selectedInstallments['general_voucher']].filter((item) => item !== id)
            }));
        }
        else {
             setSelectedInstallments((prevData) => ({
                ...prevData,
                general_voucher: [
                    ...selectedInstallments['general_voucher'],
                    id,
                ]
            }));
        }
    };

    useEffect(() => {
        sendSelectedFeeVoucherDataToParent(Object.values(feeVouchers)?.filter(item => selectedInstallments['general_voucher']?.includes(item?.fee?.id)), 'general_voucher');
        // sendSelectedFeeVoucherDataToParent(Object.values(feeVouchers)?.filter(item => selectedVoucherIds?.includes(item?.fee?.id)), 'general_voucher');
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
                    {feeVouchers.length > 0 ?
                        feeVouchers.map((item, index) => (
                            <tr key={index} className={item?.payment_status == 'Paid' ? 'bg-success' : (item?.payment_status == 'Partial' ? 'bg-danger' : '')}>
                                <td>
                                    {item?.payment_status != 'Paid' &&
                                        <div className="educare-checkbox-field-styles">
                                            <Checkbox
                                                name={`payment_voucher_check_${index}`}
                                                checked={
                                                    selectedInstallments['general_voucher']?.includes(item?.fee?.id)
                                                }
                                                value={item?.fee?.id}
                                                onChange={() => {
                                                    handlePaymentVoucherCheckboxChange(index)
                                                    handleFeeVoucherSelect(item?.fee?.id)
                                                }
                                                }
                                            />
                                        </div>
                                    }
                                </td>
                                <td>{++index}</td>
                                <td>{item?.fee?.title}</td>
                                <td>{item?.total_payable_amount}</td>
                                <td>{item?.total_paid_amount}</td>
                                <td>{item?.total_due_amount}</td>
                                {/* <td>
                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                        <div>
                                            <Tooltip
                                                title="Edit"
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
                    :
                        <tr>
                            <td className="text-center text-red-500" colSpan="7">Data not found</td>
                        </tr>
                    }

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

export default PaymentVoucherList;
