import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StatusSummaryInnerLayout from './Partials/Enquiry/StatusSummary/StatusSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EnquiryStatusSummary({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    timezones,
    countries,
    states,
    admissionStatusSummaryReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admission Status Summary</h2>}
        >
            <Head title="Admission Status Summary" />

            <StatusSummaryInnerLayout
                admissionStatusSummaryReport={admissionStatusSummaryReport}
            />
        </DashboardLayout>
    );
}
