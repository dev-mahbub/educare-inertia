import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import CancelPaymentPopup from "./CancelPaymentPopup";

export default function PrintPopup({
    modalPrintOpen,
    setModalPrintOpen,
    studentFeePaymentReports = [],
    getStudentFeeInstallments,
    student,
    feeReceiptPageSize,
    feeReceiptCopy
}) {
    const [cancelPaymentPopup, setCancelPaymentPopup] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState(null);
    // const [studentId, setStudentId] = useState(null);

    // handle modal start
    const closeModal = () => {
        setModalPrintOpen(false);
    };
    // handle modal end


    // handle cancel payment start
    const handleCancelPaymentClick = (payment_method_id, student_id) => {
        Swal.fire({
            title: 'Are you sure to cancel this payment ?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                setPaymentMethodId(payment_method_id);
                // setStudentId(student_id);
                setCancelPaymentPopup(true);
            }
        });
    }
    // handle cancel payment end


    // handle export report pdf start
    const handlePaymentReportPdfExport = (id, isCancelled) => {
        let url = "";

        Cookies.set('feeId', id);

        if (isCancelled) {
            if (feeReceiptPageSize == "Small" && feeReceiptCopy != "Single") {
                url = route('pdf_fee.student_cancelled_office_small');
            }
            else if (feeReceiptPageSize == "Small" && feeReceiptCopy == "Single") {
                url = route('pdf_fee.student_cancelled_office_single_small');
            }
            else if (feeReceiptPageSize == "Large" && feeReceiptCopy != "Single") {
                url = route('pdf_fee.student_cancelled_office_large');
            }
            else if (feeReceiptPageSize == "Large" && feeReceiptCopy == "Single") {
                url = route('pdf_fee.student_cancelled_office_single_large');
            }
        }
        else {
            if (feeReceiptPageSize == "Small" && feeReceiptCopy != "Single") {
                url = route('pdf_fee.student_paid_small');
            }
            else if (feeReceiptPageSize == "Small" && feeReceiptCopy == "Single") {
                url = route('pdf_fee.student_paid_single_small');
            }
            else if (feeReceiptPageSize == "Large" && feeReceiptCopy != "Single") {
                url = route('pdf_fee.student_paid_large');
            }
            else if (feeReceiptPageSize == "Large" && feeReceiptCopy == "Single") {
                url = route('pdf_fee.student_paid_single_large');
            }
        }

        if(url != "") {
            window.open(url, '_blank')
        }
    }
    // handle export report pdf end


    return (

        <>
            <section className="educare-admission-follow-up-area space-y-6">
                <Modal show={modalPrintOpen} onClose={closeModal} className="educare-xl-width-modal">
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                            <div className="educare-popup-form-header py-3 flex flex-wrap gap-2.5 justify-between">
                                <h5>Payments</h5>
                                <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Close</PrimaryButton>
                            </div>
                            <div className="educare-popup-form pt-5 maxSm:pt-4 flex flex-col gap-3">
                                <div className="educare-admission-list-inner bg-supportingA/10">
                                    <div className="educare-admission-list-inner-wrapper">
                                        <div className="educare-admission-list pb-none">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Receipt No.</th>
                                                        <th>Title</th>
                                                        <th>Amount</th>
                                                        <th>Con.</th>
                                                        <th>Payable</th>
                                                        <th>Paid</th>
                                                        <th>Due </th>
                                                        <th>PaidDate</th>
                                                        <th>Mode</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(studentFeePaymentReports)?.length > 0 ?
                                                        Object.values(studentFeePaymentReports)?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    {item?.is_cancelled == true &&
                                                                        <span className="badge bg-danger mr-px">Cancelled</span>
                                                                    }
                                                                    {item?.receipt_no}
                                                                </td>
                                                                <td>{item?.title}</td>
                                                                <td>{item?.total_amount}</td>
                                                                <td>{item?.total_discount}</td>
                                                                <td>{item?.total_payable}</td>
                                                                <td>{item?.total_paid}</td>
                                                                <td>{item?.total_due}</td>
                                                                <td>{item?.payment_date}</td>
                                                                <td>{item?.payment_mode}</td>
                                                                <td>
                                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                        <div>
                                                                            <Tooltip
                                                                                title="Print Receipt"
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <button type='button'
                                                                                    className="educare-tertiary-btn-sm-fill"
                                                                                    onClick={() => {
                                                                                        handlePaymentReportPdfExport(item?.id, item?.is_cancelled)
                                                                                    }}
                                                                                >
                                                                                    <i className="icon-printer"></i>
                                                                                </button>
                                                                            </Tooltip>
                                                                        </div>
                                                                    {item?.is_cancelled == false &&
                                                                        <div>
                                                                            <Tooltip
                                                                                title="Cancel Payment"
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <button type='button'
                                                                                    className="educare-danger-btn-sm-fill"
                                                                                    onClick={() => {
                                                                                        handleCancelPaymentClick(item?.id, item?.student_id)
                                                                                    }}
                                                                                >
                                                                                    <i className="icon-TrashSimple"></i>
                                                                                </button>
                                                                            </Tooltip>
                                                                        </div>
                                                                    }
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    :
                                                        <tr>
                                                            <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>

            <CancelPaymentPopup
                cancelPaymentPopup={cancelPaymentPopup}
                setCancelPaymentPopup={setCancelPaymentPopup}
                paymentMethodId={paymentMethodId}
                studentId={student?.id}
                getStudentFeeInstallments={getStudentFeeInstallments}
            />
        </>
    );
}
