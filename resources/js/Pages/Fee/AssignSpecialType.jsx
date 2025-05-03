import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssignSpecialFeeTypeListInnerLayout from './Partials/Master/AssignSpecialFeeType/AssignSpecialFeeTypeListInnerLayout';

export default function AssignSpecialType({
    auth,
    siteData,
    sections,
    classNames,
    classrooms,
    special_fee_types,
    students = [],
    feeInstallments,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Assign Special Fee Type
                </h2>
            }
        >
            <Head title="Assign Special Fee Type" />

            <AssignSpecialFeeTypeListInnerLayout
                sections={sections}
                classNames={classNames}
                classrooms={classrooms}
                special_fee_types={special_fee_types}
                feeInstallments={feeInstallments}
                students={students}
            />
        </DashboardLayout>
    );
}
