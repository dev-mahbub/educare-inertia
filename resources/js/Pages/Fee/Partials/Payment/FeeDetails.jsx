import TextInput from '@/Components/TextInput';
import { useForm } from "@inertiajs/react";
import { useState } from 'react';
import PaymentInstallmentList from './PaymentInstallmentList';
import PaymentTransportVoucher from './PaymentTransportVoucher';
import PaymentVoucherList from './PaymentVoucherList';
import AddNotesPopup from './Popup/AddNotesPopup';
import PrintPopup from "./Popup/PrintPopup";


const FeeDetails = ({
    selectedStudent = [],
    guardians = [],
    feeInstallments = [],
    feeVouchers = [],
    transportVouchers = [],
    sendSelectedFeeInstallmentDataToParent,
    getStudentFeeInstallments,
    setFeePaymentType,
    selectedFeeIds,
    setSelectedFeeIds,
    selectedVoucherIds,
    setSelectedVoucherIds,
    selectedTransportVoucherIds,
    setSelectedTransportVoucherIds,
    selectedInstallments,
    setSelectedInstallments,
    studentFeePaymentReports = [],
    selectFeeSequentially,
    feeReceiptPageSize,
    feeReceiptCopy
}) => {
    const [showNumberContent, setShowNumberContent] = useState(false);
    const [selectedTableTab, setSelectedTableTab] = useState('installment');
    const [modalAddNotesOpen, setModalAddNotesOpen] = useState(false);
    const [selectedFeeInstallments, setSelectedFeeInstallments] = useState([]);
    const [modalPrintOpen, setModalPrintOpen] = useState(false);


    const {
        data,
        setData,
        errors,
        patch,
        reset,
        processing
    } = useForm({
        guardian_phone: selectedStudent?.guardians['Father']?.[0]?.sms_phone ?? "",
    });


    // Function to handle input field changes
    const handleNumberChange = (e) => {
        setData('guardian_phone', e.target.value);
    };

    // handle form success start
    const handleSuccess = () => {
        const form_data = {
            student_id: selectedStudent?.id,
            request_type: "fetch_fee_installments",
        }

        getStudentFeeInstallments(form_data);
        reset();
    }
    // handle form success start


    // handle update phone number form submit start
    const handleUpdateNumberClick = (e) => {
        e.preventDefault();

        patch(route("fee.update_guardian_phone", guardians['Father'][0].id), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                handleSuccess()
            },
        });
    };
    // handle update phone number form submit end

    const handleToggleNumberContent = () => {
        setShowNumberContent(!showNumberContent);
    };

    const handleTableClick = (tab) => {
        setSelectedTableTab(tab);
        // old code
        // setSelectedFeeInstallments([]);
        // setSelectedFeeIds([]);
    };

    //add notes popup
    const handleModalAddNotesClick = () => {
        setModalAddNotesOpen(!modalAddNotesOpen);
    };

    const selectedFeeInstallmentsFromChild = (data, fee_payment_type) => {
        // setSelectedFeeInstallments((prevData) => {
        //     const updatedPrevData = prevData?.filter(item => item?.fee_payment_type != fee_payment_type);

        //     return [
        //         ...updatedPrevData,
        //         ...data
        //     ];
        // });
        // setSelectedFeeInstallments(data);

        sendSelectedFeeInstallmentDataToParent([
            ...selectedFeeInstallments,
            ...data?.filter(item => selectedInstallments[fee_payment_type]?.includes(item?.fee?.id))
        ]);
    }

    // useEffect(() => {
    //     sendSelectedFeeInstallmentDataToParent(selectedFeeInstallments);
    // }, [selectedFeeInstallments]);



    //print popup
    const handleModalPrintClick = () => {
        setModalPrintOpen(!modalPrintOpen);
    };


    return (
        <>
            <div className="educare-classroom-table-wrapper mt-5">
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-card-title flex gap-2.5 pb-none flex-wrap justify-between">
                            <h5>
                                <i className="icon-man"></i>
                                Fee Details
                            </h5>
                            <div className='inline-flex gap-1 flex-wrap'>
                                <button type='button'
                                    className="educare-secondary-btn-md-stroke"
                                    onClick={handleToggleNumberContent}
                                >
                                    {showNumberContent ? 'Hide' : 'Show'}
                                </button>
                                <button type='button'
                                    className="educare-primary-btn-md-stroke"
                                    onClick={handleModalAddNotesClick}
                                >
                                    <i className='icon-PlusCircle'></i> Add Notes
                                </button>
                            </div>
                        </div>
                        {showNumberContent && (
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 mt-4 pt-5">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 md:col-span-6">
                                        <div>
                                            <span className='text-[15px] font-medium text-headingLight block mb-2'>{`${selectedStudent?.first_name} ${selectedStudent?.middle_name} ${selectedStudent?.last_name} is ${selectedStudent?.boarding_type}, ${selectedStudent?.student_status != 'New' ? 'Old' : selectedStudent?.student_status} Student`}</span>
                                            <span className='text-[15px] font-medium text-headingLight block'>{guardians['Father'][0].first_name} is the father</span>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <form onSubmit={handleUpdateNumberClick}>
                                            <div className="educare-input-field-styles mb-2.5">
                                                <TextInput
                                                    value={data.guardian_phone}
                                                    data={data.guardian_phone}
                                                    onChange={handleNumberChange}
                                                    className="block"
                                                    placeHolder="New Number"
                                                    type="number"
                                                />
                                            </div>
                                            <div>
                                                <button type='submit'
                                                    className="educare-primary-btn-md-stroke"
                                                >
                                                    Update Mobile No.
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='inline-flex gap-5 mb-0.5 maxXs:gap-2.5 flex-wrap'>
                    <button type='button'
                        className="educare-secondary-btn-md-fill count-circle"
                        onClick={() => {
                            handleTableClick('installment')
                            setFeePaymentType('fee_installment');
                        }}
                    >
                        Installment
                        <span className='bg-white text-supportingA'>{Object.keys(feeInstallments)?.length}</span>
                    </button>

                    {Object.keys(feeVouchers)?.length > 0 &&
                        <button type='button'
                            className="educare-tertiary-btn-md-fill count-circle"
                            onClick={() => {
                                handleTableClick('voucher')
                                setFeePaymentType('general_voucher');
                            }}
                        >
                            Voucher
                            <span className='bg-white text-supportingC'>{feeVouchers?.length}</span>
                        </button>
                    }

                    {Object.keys(transportVouchers)?.length > 0 &&
                        <button type='button'
                            className="educare-warning-btn-md-fill count-circle"
                            onClick={() =>{
                                handleTableClick('transport_voucher')
                                setFeePaymentType('transport_voucher');
                            }}
                        >
                            Transport Voucher
                            <span className='bg-white text-warning'>{transportVouchers?.length}</span>
                        </button>
                    }

                    <button type='button'
                        className="educare-gray-btn-md-fill count-circle"
                        onClick={() => {
                            handleModalPrintClick()
                        }}
                    >
                        Print/Cancel
                    </button>
                </div>
                {selectedTableTab === 'installment' &&
                    <PaymentInstallmentList
                        feeInstallments={feeInstallments}
                        sendSelectedFeeInstallmentDataToParent={selectedFeeInstallmentsFromChild}
                        selectedFeeIds={selectedFeeIds}
                        setSelectedFeeIds={setSelectedFeeIds}
                        selectedInstallments ={selectedInstallments}
                        setSelectedInstallments ={setSelectedInstallments}
                        selectFeeSequentially={selectFeeSequentially}
                    />
                }
                {(selectedTableTab === 'voucher' && Object.keys(feeVouchers)?.length > 0) &&
                    <PaymentVoucherList
                        feeVouchers={feeVouchers}
                        sendSelectedFeeVoucherDataToParent={selectedFeeInstallmentsFromChild}
                        selectedVoucherIds={selectedVoucherIds}
                        setSelectedVoucherIds={setSelectedVoucherIds}
                        selectedInstallments ={selectedInstallments}
                        setSelectedInstallments ={setSelectedInstallments}
                    />
                }
                {(selectedTableTab === 'transport_voucher' && Object.keys(transportVouchers)?.length > 0) &&
                    <PaymentTransportVoucher
                        sendSelectedTransportVoucherDataToParent={selectedFeeInstallmentsFromChild}
                        transportVouchers={transportVouchers}
                        selectedTransportVoucherIds={selectedTransportVoucherIds}
                        setSelectedTransportVoucherIds={setSelectedTransportVoucherIds}
                        selectedInstallments ={selectedInstallments}
                        setSelectedInstallments ={setSelectedInstallments}
                    />
                }
            </div>

            <AddNotesPopup
                student={selectedStudent}
                guardians={guardians}
                modalAddNotesOpen={modalAddNotesOpen}
                setModalAddNotesOpen={setModalAddNotesOpen}
                getStudentFeeInstallments={getStudentFeeInstallments}
            />

            <PrintPopup
                modalPrintOpen={modalPrintOpen}
                setModalPrintOpen={setModalPrintOpen}
                studentFeePaymentReports={studentFeePaymentReports}
                getStudentFeeInstallments={getStudentFeeInstallments}
                student={selectedStudent}
                feeReceiptPageSize={feeReceiptPageSize}
                feeReceiptCopy={feeReceiptCopy}
            />
        </>
    );
};

export default FeeDetails;
