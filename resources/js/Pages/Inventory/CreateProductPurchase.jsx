import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TransactionPurchaseInnerLayout from './Partials/Transaction/Purchase/TransactionPurchaseInnerLayout';

export default function CreateProductPurchase({
    auth,
    siteData,
    productNames,
    ledgerNames,
    partyAccountNames,
    receiptNo,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <TransactionPurchaseInnerLayout
                productNames={productNames}
                ledgerNames={ledgerNames}
                partyAccountNames={partyAccountNames}
                receiptNo={receiptNo}
            />
        </DashboardLayout>
    );
}
