import React, { useEffect, useMemo, useState } from "react";

const PaymentReportTable = ({
    data,
    salaryPaymentReport
}) => {

    // filter staff salary payment start
    const filteredSalaryPaymentReport = useMemo(() => {
        return salaryPaymentReport?.filter(item => {
            const filterText = data?.search?.trim()?.toLowerCase();
            const employeeId = String(item?.employee_id)?.toLowerCase();
            const staffName = item?.staff_name?.toLowerCase();
            const uan = item?.uan?.toLowerCase();
            const paidAmount = String(item?.paid_amount)?.toLowerCase();
            const hasEarning = Object.values(item?.earnings)?.some(earning => earning?.title?.toLowerCase()?.includes(filterText));
            const hasDeduction = Object.values(item?.deductions)?.some(deduction => deduction?.title?.toLowerCase()?.includes(filterText));

            return (
                (employeeId && employeeId.includes(filterText)) ||
                (staffName && staffName.includes(filterText)) ||
                (uan && uan.includes(filterText)) ||
                (paidAmount && paidAmount.includes(filterText)) ||
                hasEarning ||
                hasDeduction
            );
        });
    }, [data?.search, salaryPaymentReport]);
    // filter staff salary payment end

    // State to handle which rows are toggled open
    const [activeRows, setActiveRows] = useState(Array(salaryPaymentReport.length).fill(false));

    useEffect(() => {
        setActiveRows(Array(salaryPaymentReport.length).fill(false));
    }, [salaryPaymentReport]);

    // Toggle function for expanding/collapsing rows
    const handleEnqToggle = (index) => {
        setActiveRows((prevState) =>
            prevState.map((value, i) => (i === index ? !value : false))
        );
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th> Sr. No. </th>
                                        <th>Emp Id</th>
                                        <th>Name</th>
                                        <th>UAN</th>
                                        <th>Earnings</th>
                                        <th>Deductions</th>
                                        <th>Paid</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSalaryPaymentReport?.length > 0 ?
                                        filteredSalaryPaymentReport.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.employee_id}</td>
                                                    <td>{item?.staff_name}</td>
                                                    <td>{item?.uan}</td>
                                                    <td>{Object.values(item?.earnings)?.length}</td>
                                                    <td>{Object.values(item?.deductions)?.length}</td>
                                                    <td>{item?.paid_amount}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="educare-enq-arrow"
                                                            onClick={() => handleEnqToggle(index)}
                                                        >
                                                            <i
                                                                className={`${activeRows[index]
                                                                    ? "icon-arrow-up"
                                                                    : "icon-down-arrow"
                                                                    }`}
                                                            ></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                {activeRows[index] && (
                                                    <tr>
                                                        <td
                                                            colSpan="8"
                                                            className="educare-admission-list-enq-inner-wrap"
                                                        >
                                                            <table className="educare-admission-list-enq-inner">
                                                                <tbody>
                                                                    {Object.values(item?.earnings)?.length > 0 &&
                                                                        <React.Fragment key={index + 1}>
                                                                            {Object.values(item.earnings).map((earning, earningIndex) => (
                                                                                <tr key={earningIndex}>
                                                                                    <td colSpan={4}></td>
                                                                                    <td>
                                                                                        <span
                                                                                            className={`badge success`}
                                                                                        >
                                                                                            {earning?.title}
                                                                                        </span>
                                                                                    </td>
                                                                                    <td></td>
                                                                                    <td>
                                                                                        <span>
                                                                                            {earning?.amount}
                                                                                        </span>
                                                                                    </td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            ))}

                                                                            <tr>
                                                                                <td colSpan={4}></td>
                                                                                <td>
                                                                                    <span
                                                                                        className={`badge danger`}
                                                                                    >
                                                                                        Total Earning
                                                                                    </span>
                                                                                </td>
                                                                                <td></td>
                                                                                <td>
                                                                                    <span className="font-bold">
                                                                                        {item?.earning_amount}
                                                                                    </span>
                                                                                </td>
                                                                                <td></td>
                                                                            </tr>
                                                                        </React.Fragment>
                                                                    }
                                                                    {Object.values(item?.deductions)?.length > 0 &&
                                                                        <React.Fragment key={index + 2}>
                                                                            {Object.values(item.deductions).map((deduction, deductionIndex) => (
                                                                                <tr key={deductionIndex}>
                                                                                    <td colSpan={5}></td>
                                                                                    <td>
                                                                                        <span
                                                                                            className={`badge success`}
                                                                                        >
                                                                                            {deduction?.title}
                                                                                        </span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <span>
                                                                                            {deduction?.amount}
                                                                                        </span>
                                                                                    </td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            ))}

                                                                            <tr>
                                                                                <td colSpan={5}></td>
                                                                                <td>
                                                                                    <span
                                                                                        className={`badge danger`}
                                                                                    >
                                                                                        Total Deduction
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span className="font-bold">
                                                                                        {item?.deduction_amount}
                                                                                    </span>
                                                                                </td>
                                                                                <td></td>
                                                                            </tr>
                                                                        </React.Fragment>
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))
                                        :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="8">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentReportTable;
