import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import { useEffect, useState } from "react";
import AdvancePaymentForm from "./AdvancePaymentForm";
import AdvancePaymentTable from "./AdvancePaymentTable";

const AdvancePaymentInnerLayout = ({
    staffs,
    paymentModes,
    banks,
    paymentMonths,
    staffAdvancePayments
}) => {

    const [staffId, setStaffId] = useState(null);
    const [staffAdvancePaymentsData, setStaffAdvancePaymentsData] = useState([]);

    useEffect(() => {
        setStaffAdvancePaymentsData(staffAdvancePayments);
    }, [staffAdvancePayments]);

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <SalaryHeaderMenu title="Salary Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <div className="educare-parent-montly-income-area">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                                    <AdvancePaymentForm
                                        staffs={staffs}
                                        paymentModes={paymentModes}
                                        banks={banks}
                                        paymentMonths={paymentMonths}
                                        setStaffAdvancePaymentsData={setStaffAdvancePaymentsData}
                                        setStaffId={setStaffId}
                                    />
                                </div>
                                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                                    <AdvancePaymentTable
                                        staffAdvancePayments={staffAdvancePaymentsData}
                                        staffId={staffId}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvancePaymentInnerLayout;
