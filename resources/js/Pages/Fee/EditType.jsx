import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditFeeTypeInnerLayout from "./Partials/Master/EditFeeType/EditFeeTypeInnerLayout";


export default function Type({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    types,
    type,
    installment_types,
    fee_categories,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Fee Type
                </h2>
            }
        >
            <Head title="Fee Type" />

            <EditFeeTypeInnerLayout
                types={types}
                type={type}
                installment_types={installment_types}
                fee_categories={fee_categories}
            />
        </DashboardLayout>
    );
}
