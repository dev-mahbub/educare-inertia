import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditFeeInstallmentInnerLayout from './Partials/Master/EditFeeInstallment/EditFeeInstallmentInnerLayout';

export default function Installment({ auth, siteData, mustVerifyEmail, classrooms, status, fees = "", fee = ""}) {
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

            <EditFeeInstallmentInnerLayout fees={fees} fee={fee} />
        </DashboardLayout>
    );
}
