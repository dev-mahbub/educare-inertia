import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherTransportReportInnerLayout from './Partials/TeacherTransportReport/TeacherTransportReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TeacherTransportReport({
    auth,
    siteData,
    routeData,
    teacherData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher Transport Report</h2>}
        >
            <Head title="Teacher Transport Report" />

            <TeacherTransportReportInnerLayout
                routeData={routeData}
                teacherData={teacherData}
            />
        </DashboardLayout>
    );
}
