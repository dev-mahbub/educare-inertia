import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DeletedRegistrationInnerLayout from './Partials/DeletedRegistration/DeletedRegistrationInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DeletedRegistration({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    registrations,
    academicYears
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Deleted Registration</h2>}
        >
            <Head title="Deleted Registration" />

            <DeletedRegistrationInnerLayout
                registrations = {registrations}
                academicYears = {academicYears}
            />
        </DashboardLayout>
    );
}
