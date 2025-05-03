import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SpecialFeeTypeReportInnerLayout from './Partials/SpecialFeeTypeReport/SpecialFeeTypeReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function SpecialFeeTypeReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    fees,
    specialFeeTypes,
    specialFeeTypeReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Special Fee Type Report</h2>}
        >
            <Head title="Special Fee Type Report" />

            <SpecialFeeTypeReportInnerLayout
                classrooms={classrooms}
                fees={fees}
                specialFeeTypes={specialFeeTypes}
                specialFeeTypeReport={specialFeeTypeReport}
            />
        </DashboardLayout>
    );
}
