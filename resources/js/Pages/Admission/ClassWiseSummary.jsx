import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassWiseSummaryInnerLayout from './Partials/Enquiry/ClassSummary/ClassWiseSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ClassWiseSummary({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    timezones,
    countries,
    states,
    classWiseAdmissionSummary
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class Wise Admission Summary</h2>}
        >
            <Head title="Class Wise Admission Summary" />

            <ClassWiseSummaryInnerLayout
                classWiseAdmissionSummary={classWiseAdmissionSummary}
            />
        </DashboardLayout>
    );
}
