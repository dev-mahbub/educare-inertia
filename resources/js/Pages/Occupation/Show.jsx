import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateOccupationInnerLayout from './Partials/CreateOccupationInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, occupations, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Occupations</h2>}
        >
            <Head title="Occupations" />
            
            <CreateOccupationInnerLayout occupations={occupations}  />
        </DashboardLayout>
    );
}