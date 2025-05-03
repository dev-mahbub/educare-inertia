import Loader from "@/Components/Loader";
import { useEffect, useState } from 'react';

const ExpectedDiscountReportList = ({
    expectedStudentFeeDiscountsData = [],
    loading
}) => {
    const [totalAmount, setTotalAmount] = useState(0);

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(Array(Object.keys(expectedStudentFeeDiscountsData)?.length).fill(false))
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    useEffect(() => {
        setTotalAmount(() => {
            let total_amount = 0;

            for (const key in expectedStudentFeeDiscountsData) {
                if (Object.hasOwnProperty.call(expectedStudentFeeDiscountsData, key)) {
                    total_amount += expectedStudentFeeDiscountsData[key]?.total_discount
                }
            }

            return total_amount;
        });

        setEnqInnerActive(Array(Object.keys(expectedStudentFeeDiscountsData)?.length).fill(false))
    }, [expectedStudentFeeDiscountsData]);

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
    }
    // format number end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Adm No.</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Roll No</th>
                                        <th>Father Name</th>
                                        <th>Mother Name</th>
                                        <th>Concession Name</th>
                                        <th>Discount</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(expectedStudentFeeDiscountsData)?.length > 0 ? (
                                            <>
                                                {Object.values(expectedStudentFeeDiscountsData)?.map?.((discountItem, index) => (
                                                    <>
                                                        <tr>
                                                            <td colSpan={7}>
                                                                <strong className='text-[15px] block max-w-[220px]'>{discountItem?.discount?.title}
                                                                    <button
                                                                        type="button"
                                                                        className="educare-enq-arrow"
                                                                        onClick={() => handleEnqToggle(index)}
                                                                    >
                                                                        <i
                                                                            className={`${enqInnerActive[index]
                                                                                ? "icon-arrow-up"
                                                                                : "icon-down-arrow"}`}
                                                                        ></i>
                                                                    </button>
                                                                </strong>{" "}

                                                            </td>
                                                            <td>
                                                                <strong className='text-[15px]'>{formatNumber(discountItem?.total_discount ?? 0)}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr className={`${enqInnerActive[index] ? "" : "hidden"}`}>
                                                            <td colSpan="12" className="educare-admission-list-enq-inner-wrap">
                                                                <table className="educare-admission-list-enq-inner">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Adm No.</th>
                                                                            <th>Student Name</th>
                                                                            <th>Class</th>
                                                                            <th>Roll No</th>
                                                                            <th>Father Name</th>
                                                                            <th>Mother Name</th>
                                                                            <th>Concession Name</th>
                                                                            <th>Discount</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {Object.keys(discountItem?.data)?.length > 0 ?
                                                                            Object.values(discountItem?.data)?.map((item, index) => (
                                                                                <tr key={index}>
                                                                                    <td>{item?.student?.admission_no ?? ""}</td>
                                                                                    <td>{`${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`}</td>
                                                                                    <td>{item?.student?.classroom?.title ?? ""}</td>
                                                                                    <td>{item?.student?.classroom_roll?.roll_no ?? ""}</td>
                                                                                    <td>{`${item?.student?.father?.first_name ?? ""} ${item?.student?.father?.middle_name ?? ""} ${item?.student?.father?.last_name ?? ""}`}</td>
                                                                                    <td>{`${item?.student?.mother?.first_name ?? ""} ${item?.student?.mother?.middle_name ?? ""} ${item?.student?.mother?.last_name ?? ""}`}</td>
                                                                                    <td>{discountItem?.discount?.title ?? ""}</td>
                                                                                    <td>{formatNumber(item?.total_fee_discount ?? 0)}</td>
                                                                                </tr>
                                                                            ))
                                                                            :
                                                                            <tr>
                                                                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                                            </tr>
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                                < tr >
                                                    <td colSpan={7}>
                                                        <h5 className='font-bold text-headingLight text-[15px]'>GRAND TOTAL : </h5>
                                                    </td>
                                                    <td>
                                                        <h5 className='font-bold text-headingLight text-[15px]'>{formatNumber(totalAmount)}</h5>
                                                    </td>
                                                </ tr>
                                            </>
                                        )
                                            :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExpectedDiscountReportList;
