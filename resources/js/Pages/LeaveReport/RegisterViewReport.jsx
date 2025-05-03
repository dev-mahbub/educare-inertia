import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegisterViewReportInnerLayout from './Partials/RegisterViewReport/RegisterViewReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RegisterViewReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Register View Report</h2>}
        >
            <Head title="Register View Report" />

            <RegisterViewReportInnerLayout/>
        </DashboardLayout>
    );
}