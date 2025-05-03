import { useEffect, useMemo, useState } from 'react';

const NullifyFeeReportList = ({ nullifyFeeReports = [], setTotalReportCount , filterText = "" }) => {

    const [totalPayable, setTotalPayable] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalNullified, setTotalNullified] = useState(0);

    // filter report data start
    const filteredNullifyFeeReports = useMemo(() => {
        return nullifyFeeReports?.filter(item => {
            const inputText = filterText?.toLowerCase().trim();

            const admissionNo = item?.student?.admission_no?.toLowerCase();
            const studentName = `${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`.toLowerCase();
            const classroomTitle = item?.student?.classroom?.title?.toLowerCase();
            const totalPayable = String(item?.total_payable)?.toLowerCase();
            const totalPaid = String(item?.total_paid)?.toLowerCase();
            const totalNullified = String(item?.total_nullified)?.toLowerCase();
            const nullify_date = item?.nullify_date?.toLowerCase();
            const nullify_reason = item?.nullify_reason?.toLowerCase();

            return (
                (studentName && studentName.includes(inputText)) ||
                (admissionNo && admissionNo.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (totalPayable && totalPayable.includes(inputText)) ||
                (totalPaid && totalPaid.includes(inputText)) ||
                (totalNullified && totalNullified.includes(inputText)) ||
                (nullify_date && nullify_date.includes(inputText)) ||
                (nullify_reason && nullify_reason.includes(inputText)) ||
                (
                    Object.values(item?.nullify_fee_amounts)?.some(itemAmount => itemAmount?.fee_type_title?.toLowerCase().includes(inputText)) ||
                    Object.values(item?.nullify_fee_amounts)?.some(itemAmount => String(itemAmount?.nullified_amount).toLowerCase().includes(inputText))
                )
            );
        })
    },[nullifyFeeReports, filterText])
    // filter report data end

    // count total value and store them in state start
    useEffect(() => {
        setTotalPayable(filteredNullifyFeeReports?.map(item => item?.total_payable)?.reduce((total, amount) => total+amount , 0))
        setTotalPaid(filteredNullifyFeeReports?.map(item => item?.total_paid)?.reduce((total, amount) => total+amount , 0))
        setTotalNullified(filteredNullifyFeeReports?.map(item => item?.total_nullified)?.reduce((total, amount) => total+amount , 0))
        setTotalReportCount(filteredNullifyFeeReports?.length);
    }, [filteredNullifyFeeReports]);
    // count total value and store them in state end


    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(new Array(filteredNullifyFeeReports?.length)?.fill(false))
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end


    const handleNullify = (e) => {
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
                        <form onSubmit={handleNullify}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Adm No</th>
                                            <th>Student Name</th>
                                            <th>Class</th>
                                            <th>Total Payable</th>
                                            <th>Total Paid</th>
                                            <th>Nullified Amt.</th>
                                            <th>Nullify Date</th>
                                            <th>Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredNullifyFeeReports?.length > 0 &&
                                            filteredNullifyFeeReports?.map((item, index) => (
                                                <>
                                                    <tr>
                                                        <td>
                                                            {`${item?.student?.admission_no}`}
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
                                                        <td>{item?.total_payable}</td>
                                                        <td>{item?.total_paid}</td>
                                                        <td>{item?.total_nullified}</td>
                                                        <td>{item?.nullify_date}</td>
                                                        <td>{item?.nullify_reason}</td>
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
                                                                    {Object.keys(item?.nullify_fee_amounts)?.length > 0 ?
                                                                        Object.values(item?.nullify_fee_amounts)?.map((feeAmountData, innerIndex) => (
                                                                            <tr key={innerIndex}>
                                                                                <td>
                                                                                    {feeAmountData?.fee_type_title}
                                                                                </td>
                                                                                <td>
                                                                                    {parseFloat(feeAmountData?.nullified_amount)}
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    :
                                                                        <tr>
                                                                            <td
                                                                                className="text-center text-red-500"
                                                                                colSpan="7"
                                                                            >
                                                                                Data not found
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }

                                        <tr>
                                            <td colSpan={3}>
                                                <h5 className='font-bold text-headingLight text-[15px]'>Total</h5>
                                            </td>
                                            <td colSpan={1}>
                                                <h5 className='font-bold text-headingLight text-[14px]'>{totalPayable}</h5>
                                            </td>
                                            <td colSpan={1}>
                                                <h5 className='font-bold text-headingLight text-[14px]'>{totalPaid}</h5>
                                            </td>
                                            <td colSpan={3}>
                                                <h5 className='font-bold text-headingLight text-[14px]'>{totalNullified}</h5>
                                            </td>
                                        </tr>
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

export default NullifyFeeReportList;
