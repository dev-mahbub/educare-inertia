import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffDetailsInnerLayout from './Partials/Details/StaffDetailsInnerLayout';

export default function Edit({ auth, siteData, mustVerifyEmail, status, schools, staff, subjects }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Details</h2>}
        >
            <Head title="Staff Details" />

            <StaffDetailsInnerLayout staff={staff} subjects={subjects} />
        </DashboardLayout>
    );
}
