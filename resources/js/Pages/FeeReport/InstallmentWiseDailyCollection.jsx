import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function InstallmentWiseDailyCollection({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Installment Wise Daily Collection</h2>}
        >
            <Head title="Fee Installment Wise Daily Collection" />

            <div>Fee Installment Wise Daily Collection</div>
        </DashboardLayout>
    );
}
