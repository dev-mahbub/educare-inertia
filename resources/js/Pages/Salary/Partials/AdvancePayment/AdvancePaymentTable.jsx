import { Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import CancelPopup from './Popup/CancelPopup';

const AdvancePaymentTable = ({
    staffAdvancePayments,
    staffId
}) => {

    const [selectedStaffAdvancePayment, setSelectedStaffAdvancePayment] = useState({});
    const [cancelPopup, setCancelPopup] = useState(false);

    const handleCancelPopupClick = (id) => {
        setCancelPopup(!cancelPopup);

        setSelectedStaffAdvancePayment(staffAdvancePayments?.find(item => item?.id == id) ?? {});
    };

    // handle print advance payment receipt start
    const handlePrintAdvancePaymentReceipt = (id) => {
        Cookies.set('staff_advance_payment_id', id);

        const url = route('pdf_salary.advance_payment_slip');

        window.open(url);
    }
    // handle print advance payment receipt end

    return (
        <>
            <div className="educare-admission-list-inner-wrapper mt-8">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.</th>
                                <th>Month</th>
                                <th>Paid</th>
                                <th>Deducted</th>
                                <th>By Salary</th>
                                <th>Payment Note</th>
                                <th>Payment Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffAdvancePayments?.length > 0 ?
                                staffAdvancePayments.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.payment_month?.title}</td>
                                        <td>{parseInt(item?.paid_amount ?? 0)}</td>
                                        <td>{item?.deducted_amount ? parseInt(item.deducted_amount) : ''}</td>
                                        <td>{item?.by_salary ? 'Yes' : 'No'}</td>
                                        <td>{item?.payment_note}</td>
                                        <td>{item?.payment_date}</td>
                                        <td>
                                            {item?.by_salary == false &&
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
                                                                    handlePrintAdvancePaymentReceipt(item.id)
                                                                }}
                                                            >
                                                                <i className="icon-printer"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip title="Delete" placement="top" arrow>
                                                            <button
                                                                type="button"
                                                                className="educare-danger-btn-sm-fill"
                                                                onClick={() => handleCancelPopupClick(item?.id)}
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                ))
                            :
                                <tr>
                                    <td
                                        className="text-center text-red-500"
                                        colSpan="8"
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
                selectedStaffAdvancePayment={selectedStaffAdvancePayment}
                setSelectedStaffAdvancePayment={setSelectedStaffAdvancePayment}
                staffId={staffId}
            />
        </>
    );
};

export default AdvancePaymentTable;
