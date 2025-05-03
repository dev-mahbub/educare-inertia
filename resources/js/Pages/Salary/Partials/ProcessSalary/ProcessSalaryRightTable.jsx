import { Tooltip } from "@mui/material";
import Cookies from 'js-cookie';
import { useState } from "react";
import CancelPopup from './Popup/CancelPopup';

const ProcessSalaryRightTable = ({
    staffSalaryPayments,
    data
}) => {

    const [selectedStaffSalaryPayment, setSelectedStaffSalaryPayment] = useState({});
    const [cancelPopup, setCancelPopup] = useState(false);

    const handleCancelPopupClick = (id) => {
        setCancelPopup(!cancelPopup);

        setSelectedStaffSalaryPayment(staffSalaryPayments?.find(item => item?.id == id) ?? {});
    };

    // handle print salary slip start
    const handlePrintSalrySlip = (id) => {
        Cookies.set('staff_salary_payment_id', id);

        window.open(route('pdf_salary.salary_slip'));
    }
    // handle print salary slip end

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    Previous Payment Details
                </h5>
            </div>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.</th>
                                <th>Month</th>
                                <th>Total Earning</th>
                                <th>Total Deduction</th>
                                <th>Amount Paid</th>
                                <th>Due</th>
                                <th>Payment Date</th>
                                <th>Publish</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffSalaryPayments?.length > 0 ? (
                                staffSalaryPayments.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.payment_month?.title}</td>
                                        <td>
                                            {
                                                (parseInt((item?.total_earning_amount ?? 0)) + parseInt(item?.bonus_amount ?? 0) + parseInt(item?.paid_due_amount ?? 0) + parseInt(item?.advance_amount ?? 0) + parseInt(item?.extra_duty_amount ?? 0)) - parseInt((item?.advance_deducted_amount ?? 0))
                                            }
                                        </td>
                                        <td>{parseInt(item?.total_deduction_amount ?? 0)}</td>
                                        <td>{parseInt(item?.paid_amount ?? 0)}</td>
                                        <td>{parseInt(item?.due_amount ?? 0)}</td>
                                        <td>{item?.payment_date}</td>
                                        <td>{item?.is_published == true ? 'Yes' : 'No'}</td>
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

                                                <div>
                                                    <Tooltip
                                                        title="Delete"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            onClick={() => handleCancelPopupClick(item?.id)}
                                                            type="button"
                                                            className="educare-danger-btn-sm-fill"
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)
                                )
                            :
                                <tr>
                                    <td
                                        className="text-center text-red-500"
                                        colSpan="10"
                                    >
                                        Data not found
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <CancelPopup
                cancelPopup={cancelPopup}
                setCancelPopup={setCancelPopup}
                selectedStaffSalaryPayment={selectedStaffSalaryPayment}
                setSelectedStaffSalaryPayment={setSelectedStaffSalaryPayment}
                formData={data}
            />
        </>
    );
};

export default ProcessSalaryRightTable;
