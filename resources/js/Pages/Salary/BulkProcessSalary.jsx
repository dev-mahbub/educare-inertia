import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import BulkProcessSalaryInnerLayout from "./Partials/BulkProcessSalary/BulkProcessSalaryInnerLayout";

export default function BulkProcessSalary({
    auth,
    siteData,
    paymentMonths,
    staffEarnings,
    paymentModes,
    banks,
    bankAccounts,
    staffCategories
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Bulk Process Salary
                </h2>
            }
        >
            <Head title="Bulk Process Salary" />

            <BulkProcessSalaryInnerLayout
                paymentMonths={paymentMonths}
                staffEarnings={staffEarnings}
                paymentModes={paymentModes}
                banks={banks}
                bankAccounts={bankAccounts}
                staffCategories={staffCategories}
            />
        </DashboardLayout>
    );
}
