import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegistrationListInnerLayout from './Partials/Registration/RegistrationListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, mustVerifyEmail, status, schools, timezones, countries, states, }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration List</h2>}
        >
            <Head title="Registration List" />

            <RegistrationListInnerLayout />
        </DashboardLayout>
    );
}
