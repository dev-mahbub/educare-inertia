import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeInstallmentCreateInnerLayout from './Partials/Master/FeeInstallmentCreate/FeeInstallmentCreateInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, classrooms, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Installment</h2>}
        >
            <Head title="Create Installment" />

            <FeeInstallmentCreateInnerLayout />
        </DashboardLayout>
    );
}