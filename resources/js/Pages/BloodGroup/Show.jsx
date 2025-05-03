import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateBloodGroupContactInnerLayout from './Partials/CreateBloodGroupContactInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, blood_groups, status , message }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blood group</h2>}
        >
            <Head title="BloodGroup" />

            <CreateBloodGroupContactInnerLayout blood_groups={blood_groups}  />
        </DashboardLayout>
    );
}