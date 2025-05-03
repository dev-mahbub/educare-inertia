import Loader from "@/Components/Loader";
import { useEffect, useState } from 'react';

const VoucherList = ({
    studentFeeVouchers = [],
    loading
 }) => {

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(Array(studentFeeVouchers.length).fill(false))

    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    useEffect(() => {
        setEnqInnerActive(Array(studentFeeVouchers.length).fill(false));
    }, [studentFeeVouchers]);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Adm No</th>
                                            <th>Student Name</th>
                                            <th>Class</th>
                                            <th>Title</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Amount</th>
                                            <th>Paid</th>
                                            <th>Due</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <Loader></Loader>
                                    :
                                        <tbody>
                                            {studentFeeVouchers?.length > 0 ? (
                                                studentFeeVouchers?.map((item, parentIndex) => (
                                                    <><tr key={parentIndex}>
                                                        <td>
                                                            {item?.student?.admission_no}
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
                                                        <td>{`${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`}</td>
                                                        <td>{item?.student?.classroom?.title ?? ""}</td>
                                                        <td>{item?.title}</td>
                                                        <td>{item?.start_date}</td>
                                                        <td>{item?.end_date}</td>
                                                        <td>{item?.total_amount}</td>
                                                        <td>{item?.total_paid}</td>
                                                        <td>{item?.total_due}</td>
                                                        <td>
                                                            {item?.payment_status === 'Due' &&
                                                                <span className='badge danger'>Due</span>
                                                            }

                                                            {item?.payment_status === 'Paid' &&
                                                                <span className='badge success'>Paid</span>
                                                            }

                                                            {item?.payment_status === 'Partial' &&
                                                                <span className='badge primary'>Partial</span>
                                                            }
                                                        </td>
                                                    </tr><tr
                                                        className={`${enqInnerActive[parentIndex]
                                                            ? ""
                                                            : "hidden"}`}
                                                    >
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
                                                                        { item?.fee_type_amounts?.length > 0 &&
                                                                            item?.fee_type_amounts?.map((fee_type_amount, index)=> (
                                                                                <tr key={fee_type_amount?.id}>
                                                                                    <td>
                                                                                        {fee_type_amount?.fee_type?.title}
                                                                                    </td>
                                                                                    <td>
                                                                                        {fee_type_amount?.amount}
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr></>
                                                ))
                                            ) : (
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                    </tr>
                                            )}
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VoucherList;
