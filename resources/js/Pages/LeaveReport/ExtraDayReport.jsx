import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ExtraDayReportInnerLayout from './Partials/ExtraDayReport/ExtraDayReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ExtraDayReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Extra Day Report</h2>}
        >
            <Head title="Extra Day Report" />

            <ExtraDayReportInnerLayout />
        </DashboardLayout>
    );
}