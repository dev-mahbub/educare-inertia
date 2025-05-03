import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import GeneratedTCReportInnerLayout from './Partials/GeneratedTCReport/GeneratedTCReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function GeneratedTCReport({
    auth,
    siteData,
    generatedTc,
    classrooms,
    academicSession,
    statusArr,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Generated TC Report</h2>}
        >
            <Head title="Generated TC Report" />

            <GeneratedTCReportInnerLayout
                generatedTc={generatedTc}
                classrooms={classrooms}
                academicSession={academicSession}
                statusArr={statusArr}
            />
        </DashboardLayout>
    );
}
