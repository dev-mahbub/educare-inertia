import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SpecialFeeTypeInnerLayout from './Partials/Master/SpecialFeeType/SpecialFeeTypeInnerLayout';

export default function SpecialType({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    special_types,
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

            <SpecialFeeTypeInnerLayout
                special_types={special_types}
                installment_types={installment_types}
                fee_categories={fee_categories}
            />
        </DashboardLayout>
    );
}
