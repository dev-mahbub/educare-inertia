import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CommunicationInnerLayout from './Partials/CommunicationInnerLayout';

export default function Create({ auth, siteData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Communication</h2>}
        >
            <Head title="Create Online Class" />
            <CommunicationInnerLayout siteData={siteData}  />
        </DashboardLayout>
    );
}