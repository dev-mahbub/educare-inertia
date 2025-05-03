import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeInstallmentInnerLayout from './Partials/Master/FeeInstallment/FeeInstallmentInnerLayout';

export default function Voucher({ auth, siteData, mustVerifyEmail, classrooms, status, fees }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Fee Installments
                </h2>
            }
        >
            <Head title="Fee Installments" />

            <FeeInstallmentInnerLayout fees={fees} />
        </DashboardLayout>
    );
}
