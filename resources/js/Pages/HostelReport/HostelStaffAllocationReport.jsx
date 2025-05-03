import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HostelStaffAllocationReportInnerLayout from './Partials/HostelStaffAllocationReport/HostelStaffAllocationReportInnerLayout';

export default function HostelStaffAllocationReport({
    auth,
    siteData,
    hostelStaffReport,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hostel Staff Allocation Report</h2>}
        >
            <Head title="Hostel Staff Allocation Report" />

            <HostelStaffAllocationReportInnerLayout
                hostelStaffReport={hostelStaffReport}
            />
        </DashboardLayout>
    );
}
