import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RazorpayFormInnerLayout from './Partials/RazorpayFormInnerLayout';

export default function Create({
    auth,
    siteData,
    orderId,
    keyId

}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Test Razorpay Payments</h2>}
        >
            <Head title="Academic Content" />
            <RazorpayFormInnerLayout orderId={orderId} keyId={keyId} />
        </DashboardLayout>
    );
}