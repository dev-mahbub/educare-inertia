import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeInstallmentInnerLayout from './Partials/Master/FeeInstallment/FeeInstallmentInnerLayout';

export default function Installment({ auth, siteData, mustVerifyEmail, classrooms, status, fees, next_installment_no }) {
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

            <FeeInstallmentInnerLayout fees={fees} next_installment_no={next_installment_no}/>
        </DashboardLayout>
    );
}
