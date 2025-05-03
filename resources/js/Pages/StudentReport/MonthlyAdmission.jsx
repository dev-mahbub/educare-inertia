import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MonthlyAdmissionInnerLayout from './Partials/MonthlyAdmission/MonthlyAdmissionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MonthlyAdmission({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    academicYears,
    monthlyAdmissionReports
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Monthly Admission</h2>}
        >
            <Head title="Monthly Admission" />

            <MonthlyAdmissionInnerLayout
                academicYears={academicYears}
                monthlyAdmissionReports={monthlyAdmissionReports}
            />
        </DashboardLayout>
    );
}
