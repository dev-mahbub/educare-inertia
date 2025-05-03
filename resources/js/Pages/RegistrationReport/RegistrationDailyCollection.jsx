import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegistrationDailyCollectionInnerLayout from './Partials/RegistrationDailyCollection/RegistrationDailyCollectionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RegistrationDailyCollection({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    registrationReport,
    academicYears
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Daily Collection</h2>}
        >
            <Head title="Registration Daily Collection" />

            <RegistrationDailyCollectionInnerLayout
                registrationReport = {registrationReport}
                academicYears = {academicYears}
            />
        </DashboardLayout>
    );
}
