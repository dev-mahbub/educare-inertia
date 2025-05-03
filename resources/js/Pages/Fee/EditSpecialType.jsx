import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditSpecialFeeTypeInnerLayout from './Partials/Master/EditSpecialFeeType/EditSpecialFeeTypeInnerLayout';

export default function EditSpecialType({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    special_types,
    special_type,
    installment_types,
    fee_categories,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Special Fee Type
                </h2>
            }
        >
            <Head title="Special Fee Type" />

            <EditSpecialFeeTypeInnerLayout
                special_types={special_types}
                special_type={special_type}
                installment_types={installment_types}
                fee_categories={fee_categories}
            />
        </DashboardLayout>
    );
}
