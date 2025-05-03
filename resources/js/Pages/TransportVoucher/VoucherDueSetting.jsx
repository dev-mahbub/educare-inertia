import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import VoucherDueInnerLayout from './Partials/VoucherDue/VoucherDueInnerLayout';

export default function Setting({
    auth,
    siteData,
    transportFeeStructureSetting,
    academicYearData,
    currentAcademicYear,
    classNames,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Voucher Due Setting</h2>}
        >
            <Head title="Voucher Due Setting" />

            <VoucherDueInnerLayout
                transportFeeStructureSetting={transportFeeStructureSetting}
                academicYearData={academicYearData}
                currentAcademicYear={currentAcademicYear}
                classNames={classNames}
            />
        </DashboardLayout>
    );
}
