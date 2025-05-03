import { Tooltip } from "@mui/material";
import Cookies from 'js-cookie';
import React from "react";

const MyDetailAttendanceTable = ({
    salaryPayments
}) => {

    // handle print salary slip start
    const handlePrintSalrySlip = (id) => {
        Cookies.set('staff_salary_payment_id', id);

        window.open(route('pdf_salary.salary_slip'));
    }
    // handle print salary slip end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="flex flex-wrap justify-between  mb-2.5">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                My Salary
                            </h5>
                        </div>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Total Earning</th>
                                    <th>Total Deduction</th>
                                    <th>Amount Paid</th>
                                    <th>Due</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salaryPayments?.length > 0 ?
                                    salaryPayments.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.payment_month?.title}</td>
                                            <td>{item?.total_earning_amount}</td>
                                            <td>{item?.total_deduction_amount}</td>
                                            <td>{item?.paid_amount}</td>
                                            <td>{item?.due_amount}</td>
                                            <td>{item?.payment_date}</td>
                                            <td>
                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Print"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-warning-btn-sm-fill"
                                                                onClick={() => {
                                                                    handlePrintSalrySlip(item?.id)
                                                                }}
                                                            >
                                                                <i className="icon-printer"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                :
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="7">
                                            Data not found
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyDetailAttendanceTable;
