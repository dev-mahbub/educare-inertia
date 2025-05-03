import Checkbox from "@/Components/Checkbox";
import { useEffect, useState } from "react";
import PrintPopup from "./Popup/PrintPopup";

const PaymentTransportVoucher = ({
    sendSelectedTransportVoucherDataToParent,
    transportVouchers,
    selectedTransportVoucherIds = [],
    setSelectedTransportVoucherIds,
    selectedInstallments,
    setSelectedInstallments
}) => {
    // const [selectedVoucherIds, setSelectedVoucherIds] = useState([]);


    // Initialize state for each checkbox
    const [paymentTransportChecked, setPaymentTransportChecked] = useState([
        false,
        false,
    ]);
    const [modalPrintOpen, setModalPrintOpen] = useState(false);

    // Handle checkbox change for a specific row
    const handlePaymentTransportCheckboxChange = (index) => {
        setPaymentTransportChecked((prevChecked) => {
            const newChecked = [...prevChecked];
            newChecked[index] = !newChecked[index];
            return newChecked;
        });
    };


    //print popup
    const handleModalPrintClick = () => {
        setModalPrintOpen(!modalPrintOpen);
    };


    const handleTransportVoucherSelect = (id) => {
        if ([...selectedTransportVoucherIds]?.includes(id)) {
            setSelectedTransportVoucherIds([...selectedTransportVoucherIds].filter((item) => item !== id));
        }
        else {
            setSelectedTransportVoucherIds([
                ...selectedTransportVoucherIds,
                id,
            ]);
        }

        if ([...selectedInstallments['transport_voucher']]?.includes(id)) {
            setSelectedInstallments((prevData) => ({
                ...prevData,
                transport_voucher: [...selectedInstallments['transport_voucher']].filter((item) => item !== id)
            }));
        }
        else {
            setSelectedInstallments((prevData) => ({
                ...prevData,
                transport_voucher: [
                    ...selectedInstallments['transport_voucher'],
                    id,
                ]
            }));
        }

        // old code
        // if ([...selectedVoucherIds]?.includes(id)) {
        //     setSelectedVoucherIds([...selectedVoucherIds].filter((item) => item !== id));
        // }
        // else {
        //     setSelectedVoucherIds([
        //         ...selectedVoucherIds,
        //         id,
        //     ]);

        // }
    };

    useEffect(() => {
        sendSelectedTransportVoucherDataToParent(Object.values(transportVouchers)?.filter(item => selectedInstallments['transport_voucher']?.includes(item?.fee?.id)), 'transport_voucher');
    }, [selectedInstallments]);

    // useEffect(() => {
    //     sendSelectedTransportVoucherDataToParent(Object.values(transportVouchers)?.filter(item => selectedVoucherIds?.includes(item?.fee?.id)));
    // }, [selectedVoucherIds]);


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
                    {Object.keys(transportVouchers)?.length > 0 ?
                        Object.values(transportVouchers)?.map((item, index) => (
                            <tr key={index} className={item?.payment_status == 'Paid' ? 'bg-success' : (item?.payment_status == 'Partial' ? 'bg-danger' : '')}>
                                <td>
                                    {item?.payment_status != 'Paid' &&
                                        <div className="educare-checkbox-field-styles">
                                            <Checkbox
                                                name={`payment_transport_check_${index}`}
                                                checked={
                                                    selectedInstallments['transport_voucher']?.includes(item?.fee?.id)
                                                    // selectedVoucherIds?.includes(item?.fee?.id)
                                                }
                                                value={item?.fee?.id}
                                                onChange={() => {
                                                        handlePaymentTransportCheckboxChange(index)
                                                        handleTransportVoucherSelect(item?.fee?.id)
                                                    }
                                                }
                                            />
                                        </div>
                                    }
                                </td>
                                <td>{index + 1}</td>
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

export default PaymentTransportVoucher;
