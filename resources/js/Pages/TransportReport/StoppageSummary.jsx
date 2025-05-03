import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StoppageSummaryReportInnerLayout from './Partials/StoppagesSummary/StoppageSummaryReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StoppageSummary({
    auth,
    siteData,
    stopPageData,
    totalStudent,
    studentData,
    stopPageName,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stoppage Summary</h2>}
        >
            <Head title="Stoppage Summary" />

            <StoppageSummaryReportInnerLayout
                stopPageData={stopPageData}
                totalStudent={totalStudent}
                studentData={studentData}
                stopPageName={stopPageName}
            />
        </DashboardLayout>
    );
}
