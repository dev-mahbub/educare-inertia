import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateClassFeeStructureInnerLayout from './Partials/Master/CreateClassFeeStructure/CreateClassFeeStructureInnerLayout';

export default function CreateClassFeeStructure({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    feeStructures,
    class_names,
    fees,
    feeTypes,
    structureTypes,
    semesters,
    hostelAvailable,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Class Fee Structure</h2>}
        >
            <Head title="Create Class Fee Structure" />

            <CreateClassFeeStructureInnerLayout
                feeStructures={feeStructures}
                class_names={class_names}
                fees={fees}
                feeTypes={feeTypes}
                structureTypes={structureTypes}
                semesters={semesters}
                hostelAvailable={hostelAvailable}
            />
        </DashboardLayout>
    );
}
