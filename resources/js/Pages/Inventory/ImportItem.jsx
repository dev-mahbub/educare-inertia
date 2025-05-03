import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ImportItemPriceInnerLayout from './Partials/StockMaster/ImportItem/ImportItemPriceInnerLayout';

export default function ImportItem({ auth, siteData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <ImportItemPriceInnerLayout />
        </DashboardLayout>
    );
}
