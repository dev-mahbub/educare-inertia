import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import { useForm } from "@inertiajs/react";
import PaymentReportFilter from "./PaymentReportFilter";
import PaymentReportTable from "./PaymentReportTable";

const PaymentReportInnerLayout = ({
    paymentMonths,
    staffTypes,
    statusArr,
    salaryPaymentReport
}) => {

    const {
        data,
        setData
    } = useForm({
        search: "",
        staff_type: "",
        status: "",
        // payment_month_id: "",
        payment_month_ids: []
    });

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
                        <PaymentReportFilter
                            paymentMonths={paymentMonths}
                            staffTypes={staffTypes}
                            statusArr={statusArr}
                            data={data}
                            setData={setData}
                            salaryPaymentReport={salaryPaymentReport}
                        />
                        <PaymentReportTable
                            data={data}
                            salaryPaymentReport={salaryPaymentReport}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentReportInnerLayout;
