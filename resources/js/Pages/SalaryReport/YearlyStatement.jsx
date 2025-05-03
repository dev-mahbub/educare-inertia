import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import YearlyStatementInnerLayout from "./Partials/YearlyStatement/YearlyStatementInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function YearlyStatement({
    auth,
    siteData,
    staffs,
    staffSalaryPayments
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Yearly Statement
                </h2>
            }
        >
            <Head title="Yearly Statement" />

            <YearlyStatementInnerLayout
                staffs={staffs}
                staffSalaryPayments={staffSalaryPayments}
            />
        </DashboardLayout>
    );
}
