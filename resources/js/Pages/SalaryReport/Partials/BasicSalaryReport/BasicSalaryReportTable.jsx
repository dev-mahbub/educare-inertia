import { concatName } from "@/Hooks/GlobalFunction.js";
import React, { useMemo, useState } from "react";

const BasicSalaryReportTable = ({
    staffEarnings,
    data
}) => {

    // State to handle which rows are toggled open
    const [activeRows, setActiveRows] = useState(Array(staffEarnings.length).fill(false));

    // Toggle function for expanding/collapsing rows
    const handleEnqToggle = (index) => {
        setActiveRows((prevState) =>
            prevState.map((value, i) => (i === index ? !value : false))
        );
    };

    // filter staff earnings start
    const filteredStaffEarnings = useMemo(() => {
        return staffEarnings?.filter(item => {
            const filterText = data?.search?.trim()?.toLowerCase();
            const employeeId = String(item?.staff?.employee_id)?.toLowerCase();
            const staffName = concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)?.toLowerCase();
            const uan = item?.staff?.uan?.toLowerCase();
            const basicPay = String(item?.basic_pay)?.toLowerCase();
            const updatedOn = item?.updated_on?.toLowerCase();
            const hasEarning = item?.earnings?.some(earning => earning?.title?.toLowerCase()?.includes(filterText));
            const hasDeduction = item?.deductions?.some(deduction => deduction?.title?.toLowerCase()?.includes(filterText));

            return (
                (employeeId && employeeId.includes(filterText)) ||
                (staffName && staffName.includes(filterText)) ||
                (uan && uan.includes(filterText)) ||
                (basicPay && basicPay.includes(filterText)) ||
                (updatedOn && updatedOn.includes(filterText)) ||
                hasEarning ||
                hasDeduction
            );
        });
    }, [data?.search, staffEarnings]);
    // filter staff earnings end

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
                                        <th>Teacher</th>
                                        <th>UAN</th>
                                        <th>Earnings</th>
                                        <th>Deductions</th>
                                        <th>Current Basic Pay</th>
                                        <th>Last Updated On</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStaffEarnings?.length > 0 ?
                                        filteredStaffEarnings.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.staff?.employee_id}</td>
                                                    <td>{concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)}</td>
                                                    <td>{item?.staff?.uan}</td>
                                                    <td>{item?.earnings?.length}</td>
                                                    <td>{item?.deductions?.length}</td>
                                                    <td>{item?.basic_pay}</td>
                                                    <td>{item?.updated_on}</td>
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
                                                            colSpan="9"
                                                            className="educare-admission-list-enq-inner-wrap"
                                                        >
                                                            <table className="educare-admission-list-enq-inner">
                                                                <tbody>
                                                                    {item?.earnings?.length > 0 &&
                                                                        <React.Fragment key={index+1}>
                                                                            {item.earnings.map((earning, earningIndex) => (
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
                                                                    {item?.deductions?.length > 0 &&
                                                                        <React.Fragment key={index+2}>
                                                                            {item.deductions.map((deduction, deductionIndex) => (
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
                                            <td className="text-center text-red-500" colSpan="9">Data not found</td>
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

export default BasicSalaryReportTable;
