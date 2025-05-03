import { Tooltip } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import CancelRefundPopup from './Popup/CancelRefundPopup';

const RefundReportList = ({
    feePaymentRefunds = [],
    filterText = "",
    setTotalRefundCount
}) => {
    const [modalCancelRefundOpen, setModalCancelRefundOpen] = useState(false);

    const [selectedRefund, setSelectedRefund] = useState({});
    const [totalRefundAmount, setTotalRefundAmount] = useState(0);

    const handleCancelReportClick = (id) => {
        setSelectedRefund(feePaymentRefunds?.find(item => item?.id == id));

        setModalCancelRefundOpen(!modalCancelRefundOpen);
    };


    // filter refund data
    const filteredPaymentRefunds = useMemo(() => {
        return feePaymentRefunds.filter((item) => {
            const inputText = filterText?.toLowerCase().trim();

            const admissionNo = item?.student?.admission_no?.toLowerCase();
            const studentName = `${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`.toLowerCase();
            const classroomTitle = item?.student?.classroom?.title?.toLowerCase();
            const total_refund = String(item?.refund_amounts?.map(item => parseFloat(item?.refund_amount)).reduce((total, amount) => total + amount, 0))?.toLowerCase();
            const refund_date = item?.refund_date?.toLowerCase();
            const refund_mode = item?.refund_mode?.toLowerCase();
            const receipt_no = String(item?.receipt_no)?.toLowerCase();

            return (
                (studentName && studentName.includes(inputText)) ||
                (admissionNo && admissionNo.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (total_refund && total_refund.includes(inputText)) ||
                (refund_date && refund_date.includes(inputText)) ||
                (refund_mode && refund_mode.includes(inputText)) ||
                (receipt_no && receipt_no.includes(inputText)) ||
                (
                    item?.refund_amounts?.some(refundItem => refundItem?.fee_type?.fee_type?.toLowerCase().includes(inputText)) ||
                    item?.refund_amounts?.some(refundItem => String(refundItem?.refund_amount).toLowerCase().includes(inputText))
                )
            );

        });
    }, [feePaymentRefunds, filterText])
    //filter refund data


    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(new Array(filteredPaymentRefunds?.length).fill(false))

    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end


    // count and store total refund amount
    useEffect(() => {
        setTotalRefundAmount(() => {
            let total_amount = 0;

            filteredPaymentRefunds?.map(item => {
                total_amount += item?.refund_amounts?.map(item => parseFloat(item?.refund_amount)).reduce((total, amount) => total + amount, 0)
            })

            return total_amount;
        });

        setTotalRefundCount(filteredPaymentRefunds?.length);
    }, [filteredPaymentRefunds])
    //end count and store total refund amount



    const AdmissionListData = (e) => {
        e.preventDefault();
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
                                            <th>Adm No</th>
                                            <th>Student Name</th>
                                            <th>Class</th>
                                            <th>Refund Amount</th>
                                            <th>Refund Date</th>
                                            <th>Refund Mode</th>
                                            <th>Receipt No</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPaymentRefunds?.length > 0 ?
                                            filteredPaymentRefunds?.map((item, index) => (
                                                <>
                                                    <tr>
                                                        <td>
                                                            {item?.student?.admission_no}{" "}
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
                                                        <td>{`${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`}</td>
                                                        <td>{item?.student?.classroom?.title}</td>
                                                        <td>{item?.refund_amounts?.map(item => parseFloat(item?.refund_amount)).reduce((total, amount) => total+amount, 0)}</td>
                                                        <td>{item?.refund_date}</td>
                                                        <td>{item?.refund_mode}</td>
                                                        <td>{item?.receipt_no}</td>
                                                        <td>
                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                <div>
                                                                    <Tooltip
                                                                        // title="Print Refund"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <a
                                                                            target="_blank"
                                                                            href={route('pdf_fee.fee_refund_receipt', item?.id)}
                                                                            className="educare-tertiary-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-printer"></i>
                                                                        </a>
                                                                    </Tooltip>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Cancel Refund"
                                                                        placement="top"
                                                                        arrow
                                                                        onClick={()=> {
                                                                            handleCancelReportClick(item?.id)
                                                                        }}
                                                                    >
                                                                        <button type='button'
                                                                            className="educare-danger-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className={`${enqInnerActive[index]? "": "hidden"}`}>
                                                        <td colSpan="12" className="educare-admission-list-enq-inner-wrap">
                                                            <table className="educare-admission-list-enq-inner">
                                                                <thead>
                                                                    <tr>
                                                                        <th>
                                                                            Title
                                                                        </th>
                                                                        <th>
                                                                            Amount
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.refund_amounts?.length > 0 &&
                                                                        item?.refund_amounts?.map((refundAmount, index) => (
                                                                            <tr>
                                                                                <td>
                                                                                    {refundAmount?.fee_type?.fee_type}
                                                                                </td>
                                                                                <td>
                                                                                    {parseFloat(refundAmount?.refund_amount)}
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">
                                                    Data not found
                                                </td>
                                            </tr>
                                        }

                                        <tr>
                                            <td colSpan={3}>
                                                <h5 className='font-bold text-headingLight text-[15px]'>Total</h5>
                                            </td>
                                            <td colSpan={5}>
                                                <h5 className='font-bold text-headingLight text-[14px]'>{totalRefundAmount}</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CancelRefundPopup
                selectedRefund={selectedRefund}
                modalCancelRefundOpen={modalCancelRefundOpen}
                setModalCancelRefundOpen={setModalCancelRefundOpen}
            />
        </>
    );
};

export default RefundReportList;
