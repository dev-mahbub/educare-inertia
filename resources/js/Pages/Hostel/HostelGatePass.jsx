import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HostelGatePassInnerLayout from './Partials/HostelGatePass/HostelGatePassInnerLayout';

export default function HostelGatePass({
    auth,
    siteData,
    classrooms,
    students,
    guardianData,
    studentGatePass,
    gateNextNo,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hostel Gate Pass</h2>}
        >
            <Head title="Hostel Gate Pass" />

            <HostelGatePassInnerLayout
                classrooms={classrooms}
                students={students}
                guardianData={guardianData}
                studentGatePass={studentGatePass}
                gateNextNo={gateNextNo}
            />
        </DashboardLayout>
    );
}
