import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateHouseContactInnerLayout from './Partials/CreateHouseContactInnerLayout';

export default function Show({ auth, siteData, houses }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">House</h2>}
        >
            <Head title="House" />

            <CreateHouseContactInnerLayout houses={houses}  />
        </DashboardLayout>
    );
}