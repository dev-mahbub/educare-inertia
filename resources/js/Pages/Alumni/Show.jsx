import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AlumniListInnerLayout from './Partials/AlumniList/AlumniListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Show({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Alumni List</h2>}
        >
            <Head title="Alumni List" />
            <AlumniListInnerLayout />
        </DashboardLayout>
    );
}
