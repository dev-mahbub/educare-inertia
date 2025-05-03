import { router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

const AdjustFeeReportList = ({ adjustFeePayments = [], filterText = "", setTotalCount }) => {

    const [totalAdjustAmount, setTotalAdjustAmount] = useState(0);

    // filter adjust fee payment data
    const filteredAdjustFeePayments = useMemo(() => {
        return adjustFeePayments?.filter(item => {
            const inputText = filterText?.toLowerCase().trim();

            const admissionNo = item?.student?.admission_no?.toLowerCase();
            const studentName = `${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`.toLowerCase();
            const classroomTitle = item?.student?.classroom?.title?.toLowerCase();
            const adjust_date = item?.adjust_date?.toLowerCase();
            const from_fee_title = item?.from_fee?.title?.toLowerCase();
            const to_fee_title = item?.to_fee?.title?.toLowerCase();
            const total_adjust_amount = String(item?.adjust_fee_payment_amounts?.map(item => parseFloat(item?.adjust_amount)).reduce((total, amount) => total + amount, 0))?.toLowerCase();
            const adjust_note = item?.adjust_note?.toLowerCase();

            return (
                (studentName && studentName.includes(inputText)) ||
                (admissionNo && admissionNo.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (adjust_date && adjust_date.includes(inputText)) ||
                (from_fee_title && from_fee_title.includes(inputText)) ||
                (to_fee_title && to_fee_title.includes(inputText)) ||
                (total_adjust_amount && total_adjust_amount.includes(inputText)) ||
                (adjust_note && adjust_note.includes(inputText)) ||
                (
                    item?.adjust_fee_payment_amounts?.some(itemAmount => itemAmount?.fee_type?.fee_type?.toLowerCase().includes(inputText)) ||
                    item?.adjust_fee_payment_amounts?.some(itemAmount => String(itemAmount?.adjust_amount).toLowerCase().includes(inputText))
                )
            );
        })
    }, [adjustFeePayments, filterText])
    // filter adjust fee payment data


    // count and store total refund amount
    useEffect(() => {
        setTotalAdjustAmount(() => {
            let total_amount = 0;

            filteredAdjustFeePayments?.map(item => {
                total_amount += item?.adjust_fee_payment_amounts?.map(item => parseFloat(item?.adjust_amount)).reduce((total, amount) => total + amount, 0)
            })

            return total_amount;
        });

        setTotalCount(filteredAdjustFeePayments?.length);
    }, [filteredAdjustFeePayments])
    //end count and store total refund amount



    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(new Array(filteredAdjustFeePayments?.length).fill(false))
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end



    const AdmissionListData = (e) => {
        e.preventDefault();
    };
    //form validation end


    // handle remove adjusted fee
    const handleRemoveAdjustedFee = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('fee_refund.adjust_fee_report.destroy', id));
            }
        });
    }
    // end handle remove adjusted fee

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;

        // if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
        //     return parseFloat(num).toFixed(2);
        // } else {
        //     return num.toString();
        // }
    }
    // format number end

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
                                            <th>Adjust Date</th>
                                            <th>By Installment</th>
                                            <th>Adjust Amt.</th>
                                            <th>Note</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {filteredAdjustFeePayments?.length > 0 ?
                                            filteredAdjustFeePayments?.map((item, index) => (
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
                                                        <td>{`${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`}</td>
                                                        <td>{item?.student?.classroom?.title}</td>
                                                        <td>{item?.adjust_date}</td>
                                                        <td>{item?.from_fee?.title} -&gt; {item?.to_fee?.title}</td>
                                                        <td>{formatNumber(item?.adjust_fee_payment_amounts?.map(item => parseFloat(item?.adjust_amount)).reduce((total, amount) => total + amount, 0))}</td>
                                                        <td>{item?.adjust_note}</td>
                                                        <td>
                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Cancel Adjust Fee"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <button type='button'
                                                                            className="educare-danger-btn-sm-fill"
                                                                            onClick={() => {
                                                                                handleRemoveAdjustedFee(item?.id)
                                                                            }}
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className={`${enqInnerActive[index] ? "" : "hidden"}`}>
                                                        <td
                                                            colSpan="12"
                                                            className="educare-admission-list-enq-inner-wrap"
                                                        >
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
                                                                    {item?.adjust_fee_payment_amounts?.length > 0 &&
                                                                        item?.adjust_fee_payment_amounts?.map((amountItem, index) => (
                                                                            <tr key={index}>
                                                                                <td>
                                                                                    {amountItem?.fee_type?.fee_type}
                                                                                </td>
                                                                                <td>
                                                                                    {formatNumber(amountItem?.adjust_amount ?? 0)}
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

                                        {filteredAdjustFeePayments?.length > 0 &&
                                            <tr>
                                                <td colSpan={5}>
                                                    <h5 className='font-bold text-headingLight text-[15px]'>Total</h5>
                                                </td>
                                                <td colSpan={3}>
                                                    <h5 className='font-bold text-headingLight text-[14px]'>{formatNumber(totalAdjustAmount)}</h5>
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

export default AdjustFeeReportList;
