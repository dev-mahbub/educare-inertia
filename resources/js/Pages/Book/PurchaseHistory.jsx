import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PurchaseHistoryInnerLayout from './Partials/PurchaseHistory/PurchaseHistoryInnerLayout';

export default function PurchaseHistory({
    auth,
    siteData,
    bookPurchase,
    libraryVendor,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Purchase History</h2>}
        >
            <Head title="Purchase History" />

            <PurchaseHistoryInnerLayout
                bookPurchase={bookPurchase}
                libraryVendor={libraryVendor}
            />
        </DashboardLayout>
    );
}
