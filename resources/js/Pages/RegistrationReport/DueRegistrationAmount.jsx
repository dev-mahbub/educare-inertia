import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DueRegistrationAmountInnerLayout from './Partials/DueRegistrationAmount/DueRegistrationAmountInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DueRegistrationAmount({ auth, siteData, mustVerifyEmail, status, schools, academicYear }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Due Registration Amount</h2>}
        >
            <Head title="Due Registration Amount" />

            <DueRegistrationAmountInnerLayout academicYear = {academicYear} />
        </DashboardLayout>
    );
}
