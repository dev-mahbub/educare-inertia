import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BuySmsInnerLayout from './Partials/BuySms/BuySmsInnerLayout';

export default function BuySms({
    auth,
    siteData,
    smsQuantities,
    // selectedSmsQuantities,
    // orderId,
    // keyId,
    // amount
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Holidays</h2>}
        >
            <Head title="Holidays" />

            <BuySmsInnerLayout
                smsQuantities={smsQuantities}
                // selectedSmsQuantities={selectedSmsQuantities}
                // orderId={orderId}
                // keyId={keyId}
                // amount={amount}
            />
        </DashboardLayout>
    );
}
