import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SettingSalaryInnerLayout from "./Partials/SettingSalary/SettingSalaryInnerLayout";

export default function SettingSalary({
    auth,
    siteData,
    siteSettings
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Setting Salary
                </h2>
            }
        >
            <Head title="Setting Salary" />

            <SettingSalaryInnerLayout
                siteSettings={siteSettings}
            />
        </DashboardLayout>
    );
}
