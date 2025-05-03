import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import BasicSalaryReportInnerLayout from "./Partials/BasicSalaryReport/BasicSalaryReportInnerLayout";

export default function BasicSalaryReport({
    auth,
    siteData,
    staffEarnings
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Basic Salary Report
                </h2>
            }
        >
            <Head title="Basic Salary Report" />

            <BasicSalaryReportInnerLayout
                staffEarnings={staffEarnings}
            />
        </DashboardLayout>
    );
}
