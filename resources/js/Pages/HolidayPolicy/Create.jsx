import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateHolidayPolicyInnerLayout from './Partials/CreateHolidayPolicyInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, holidayPolices, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">HolidayPolicys List</h2>}
        >
            <Head title="HolidayPolicys List" />

            <CreateHolidayPolicyInnerLayout holidayPolices={holidayPolices}  />
        </DashboardLayout>
    );
}