import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AlumniPaymentInnerLayout from './Partials/AlumniPayment/AlumniPaymentInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AlumniPayment({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Alumni Payment</h2>}
        >
            <Head title="Alumni Payment" />

            <AlumniPaymentInnerLayout/>
        </DashboardLayout>
    );
}
