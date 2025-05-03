import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegistrationMonthlyCollectionInnerLayout from './Partials/RegistrationMonthlyCollection/RegistrationMonthlyCollectionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RegistrationMonthlyCollection({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    academicYears,
    monthWiseRegistrationReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Monthly Collection</h2>}
        >
            <Head title="Registration Monthly Collection" />

            <RegistrationMonthlyCollectionInnerLayout
                academicYears = {academicYears}
                monthWiseRegistrationReport={monthWiseRegistrationReport}
            />
        </DashboardLayout>
    );
}
