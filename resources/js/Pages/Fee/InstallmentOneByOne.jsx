import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeInstallmentCreateInnerLayout from './Partials/Master/FeeInstallmentCreate/FeeInstallmentCreateInnerLayout';

export default function Installment({ auth, siteData, mustVerifyEmail, classrooms, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Installment One By One</h2>}
        >
            <Head title="Installment One By One" />

            <FeeInstallmentCreateInnerLayout  />
        </DashboardLayout>
    );
}