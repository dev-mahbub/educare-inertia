import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import VendorsInnerLayout from './Partials/Vendors/VendorsInnerLayout';

export default function Vendors({ auth, siteData, libraryVendor }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vendors</h2>}
        >
            <Head title="Vendors" />

            <VendorsInnerLayout
                libraryVendor={libraryVendor}
            />
        </DashboardLayout>
    );
}
