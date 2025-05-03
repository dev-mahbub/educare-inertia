import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BulkAllocationInnerLayout from './Partials/BulkAllocation/BulkAllocationInnerLayout';

export default function Setting({
    auth,
    siteData,
    availableSeats,
    classrooms,
    students,
    vouchers,
    routes,
    transportTypeArr,
    amountPrice,
    stoppages,
    transportFeeStructureSetting,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bulk Allocation</h2>}
        >
            <Head title="Bulk Allocation" />

            <BulkAllocationInnerLayout
                availableSeats={availableSeats}
                classrooms={classrooms}
                students={students}
                vouchers={vouchers}
                routes={routes}
                transportTypeArr={transportTypeArr}
                amountPrice={amountPrice}
                stoppages={stoppages}
                transportFeeStructureSetting={transportFeeStructureSetting}
            />
        </DashboardLayout>
    );
}
