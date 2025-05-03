import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeTypeInnerLayout from './Partials/Master/FeeType/FeeTypeInnerLayout';

export default function Type({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    types,
    installment_types,
    categories,
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

            <FeeTypeInnerLayout
                types={types}
                installment_types={installment_types}
                categories={categories}
            />
        </DashboardLayout>
    );
}
