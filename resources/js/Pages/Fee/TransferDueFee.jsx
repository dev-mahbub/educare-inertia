import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TransferDueInnerLayout from './Partials/Master/TransferDue/TransferDueInnerLayout';

export default function TransferDueFee({
    auth,
    siteData,
    classrooms,
    academicYears,
    currentAcademicYear
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transfer Fee Due</h2>}
        >
            <Head title="Transfer Fee Due" />

            <TransferDueInnerLayout
                academicYears={academicYears}
                classrooms={classrooms}
                currentAcademicYear={currentAcademicYear}
                siteData={siteData}
            />
        </DashboardLayout>
    );
}
