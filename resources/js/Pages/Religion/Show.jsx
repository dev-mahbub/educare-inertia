import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateReligionContactInnerLayout from './Partials/CreateReligionContactInnerLayout';

export default function Show({ auth, siteData, religions }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Religion</h2>}
        >
            <Head title="Religion" />

            <CreateReligionContactInnerLayout religions={religions}  />
        </DashboardLayout>
    );
}