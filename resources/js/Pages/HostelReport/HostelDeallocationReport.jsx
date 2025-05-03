import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HostelDeallocationReportInnerLayout from './Partials/HostelDeallocationReport/HostelDeallocationReportInnerLayout';

export default function HostelDeallocationReport({
    auth,
    siteData,
    classroomNames,
    studentDetails,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hostel Deallocation Report</h2>}
        >
            <Head title="Hostel Deallocation Report" />

            <HostelDeallocationReportInnerLayout
                classroomNames={classroomNames}
                studentDetails={studentDetails}
            />
        </DashboardLayout>
    );
}
