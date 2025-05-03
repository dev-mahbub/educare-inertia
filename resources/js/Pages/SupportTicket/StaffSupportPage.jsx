import SiteGuestLayout from '@/Layouts/SiteGuestLayout';
import { Head } from '@inertiajs/react';
import StaffSupportInnerLayout from './Partials/StaffSupport/StaffSupportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StaffSupportPage({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <SiteGuestLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Support Page</h2>}
        >
            <Head title="Staff Support Page" />

            <StaffSupportInnerLayout />
        </SiteGuestLayout>
    );
}