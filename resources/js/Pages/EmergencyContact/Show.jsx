import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateEmergencyContactInnerLayout from './Partials/CreateEmergencyContactInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, contacts, status , message }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Emergency Contacts</h2>}
        >
            <Head title="Emergency Contacts" />

            <CreateEmergencyContactInnerLayout contacts={contacts}  />
        </DashboardLayout>
    );
}