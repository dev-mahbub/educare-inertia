import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditClassFeeStructureInnerLayout from './Partials/Master/EditClassFeeStructure/EditClassFeeStructureInnerLayout';

export default function CreateClassFeeStructure({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    feeStructure,
    feeStructures,
    class_names,
    feeTypes,
    structureTypes,
    semesters,
    fees,
    hostelAvailable
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Class Fee Structure</h2>}
        >
            <Head title="Create Class Fee Structure" />

            <EditClassFeeStructureInnerLayout
                feeStructure={feeStructure}
                feeStructures={feeStructures}
                class_names={class_names}
                feeTypes={feeTypes}
                structureTypes={structureTypes}
                semesters={semesters}
                fees={fees}
                hostelAvailable={hostelAvailable}
            />
        </DashboardLayout>
    );
}
