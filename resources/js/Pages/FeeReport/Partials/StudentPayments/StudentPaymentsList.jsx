import Loader from "@/Components/Loader";
import { Tooltip } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const StudentPaymentsList = ({
    studentFeePaymentReports,
    loading,
    totalPaidAmount,
    feeReceiptPageSize,
    feeReceiptCopy
}) => {


    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(new Array(Object.keys(studentFeePaymentReports)?.length)?.fill(false));

    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i == index ? !value : false);
            return newState;
        });
    };

    useEffect(() => {
        setEnqInnerActive(new Array(Object.keys(studentFeePaymentReports)?.length)?.fill(false));
    }, [studentFeePaymentReports])
    //table inner toggle collapse end


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

        if (url != "") {
            window.open(url, '_blank')
        }
    }
    // handle export report pdf end


    const AdmissionListData = (e) => {
        e.preventDefault();

        // post(route('school.save'), {
        //     preserveScroll: true,
        //     onSuccess: () => reset(),
        //     onError: (errors) => {
        //         // if (errors.city) {
        //         //     reset('city', 'zip');
        //         //     cityInput.current.focus();
        //         // }
        //     },
        // });
    };
    //form validation end


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
                                            <th>Admin.No</th>
                                            <th>Student Name</th>
                                            <th>Title</th>
                                            <th>Tot. Amt</th>
                                            <th>Concession</th>
                                            <th>Pay Amt</th>
                                            <th>Tot. Paid</th>
                                            <th>Due</th>
                                            <th>Pay Mode</th>
                                            <th>Receipt No.</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <Loader></Loader>
                                    :
                                        <tbody>
                                            {Object.keys(studentFeePaymentReports)?.length > 0 ?
                                                <>
                                                    {Object.values(studentFeePaymentReports)?.map((report, parentIndex) => (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    {report?.student_admission_no}{" "}

                                                                    {report?.is_cancelled == true &&
                                                                        <span className="mx-1 badge danger">Cancelled</span>
                                                                    }

                                                                    <button
                                                                        type="button"
                                                                        className="educare-enq-arrow"
                                                                        onClick={() => handleEnqToggle(parentIndex)}
                                                                    >
                                                                        <i
                                                                            className={`${enqInnerActive[parentIndex]
                                                                                ? "icon-arrow-up"
                                                                                : "icon-down-arrow"}`}
                                                                        ></i>
                                                                    </button>
                                                                </td>
                                                                <td>{report?.student_name}</td>
                                                                <td>{report?.title}</td>
                                                                <td>{report?.total_amount}</td>
                                                                <td>{report?.total_discount}</td>
                                                                <td>{report?.total_payable}</td>
                                                                <td>{report?.total_paid}</td>
                                                                <td>{report?.total_due}</td>
                                                                <td>{report?.payment_mode}</td>
                                                                <td>{report?.receipt_no}</td>
                                                                <td>{report?.payment_date}</td>
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
                                                                                    className="educare-warning-btn-sm-fill"
                                                                                    onClick={(e) => {
                                                                                        handlePaymentReportPdfExport(report?.id, report?.is_cancelled)
                                                                                    }}
                                                                                >
                                                                                    <i className="icon-printer"></i>
                                                                                </button>
                                                                            </Tooltip>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr className={`transition duration-300 ${enqInnerActive[parentIndex] ? "" : "hidden"}`}>
                                                                <td colSpan="12" className="educare-admission-list-enq-inner-wrap">

                                                                    <table className="educare-admission-list-enq-inner">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Title</th>
                                                                                <th>Tot. Amt</th>
                                                                                <th>Concession</th>
                                                                                <th>Pay Amt</th>
                                                                                <th>Tot. Paid</th>
                                                                                <th>Due</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {Object.keys(report?.fee_type_amounts)?.length > 0 ?
                                                                                Object.values(report?.fee_type_amounts)?.map((item, index) => (
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            {`${item?.fee_type_title} - ${item?.fee_title}`}
                                                                                        </td>
                                                                                        <td>{item?.amount}</td>
                                                                                        <td>{item?.discount_amount}</td>
                                                                                        <td>{item?.payable_amount}</td>
                                                                                        <td>{item?.paid_amount}</td>
                                                                                        <td>{item?.due_amount}</td>
                                                                                    </tr>
                                                                                ))
                                                                            :
                                                                                <tr>
                                                                                    <td className="text-center text-red-500" colSpan="12">
                                                                                        Data not found
                                                                                    </td>
                                                                                </tr>
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}

                                                    <tr>
                                                        <td colSpan={6}>
                                                            <h5 className='text-headingLight font-bold'>Total</h5>
                                                        </td>
                                                        <td colSpan={6}>
                                                            <h5 className='text-headingLight font-bold'>{totalPaidAmount}</h5>
                                                        </td>
                                                    </tr>
                                                </>
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="12">
                                                        Data not found
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentPaymentsList;
