import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DownloadCategoryWiseReportInnerLayout from './Partials/DownloadCategoryWiseReport/DownloadCategoryWiseReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DownloadCategoryWiseReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Download Category Wise Report</h2>}
        >
            <Head title="Download Category Wise Report" />

            <DownloadCategoryWiseReportInnerLayout />
        </DashboardLayout>
    );
}
