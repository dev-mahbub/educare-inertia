import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UomInnerLayout from './Partials/Uom/UomInnerLayout';

export default function ProductUom({ auth, siteData, uoms }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <UomInnerLayout
                uoms={uoms}
            />
        </DashboardLayout>
    );
}
