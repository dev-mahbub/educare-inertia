import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UomInnerLayout from './Partials/Uom/UomInnerLayout';
import VendorInnerLayout from './Partials/Vendor/VendorInnerLayout';

export default function ProductVendor({ auth, siteData, proVendors }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <VendorInnerLayout
                proVendors={proVendors}
            />
        </DashboardLayout>
    );
}
