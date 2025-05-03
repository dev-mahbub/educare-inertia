import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MySalaryInnerLayout from './Partials/MySalary/MySalaryInnerLayout';

export default function MySalary({
    auth,
    siteData,
    salaryPayments
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Salary</h2>}
        >
            <Head title="My Salary" />

            <MySalaryInnerLayout
                salaryPayments={salaryPayments}
            />
        </DashboardLayout>
    );
}
