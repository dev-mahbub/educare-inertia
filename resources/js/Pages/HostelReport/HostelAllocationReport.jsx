import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HostelAllocationReportInnerLayout from './Partials/HostelAllocationReport/HostelAllocationReportInnerLayout';

export default function HostelAllocationReport({
    auth,
    siteData,
    studentDetails,
    classroomNames,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">HostelAllocationReport</h2>}
        >
            <Head title="HostelAllocationReport" />

            <HostelAllocationReportInnerLayout
                studentDetails={studentDetails}
                classroomNames={classroomNames}
            />
        </DashboardLayout>
    );
}
