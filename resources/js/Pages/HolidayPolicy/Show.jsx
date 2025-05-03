import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateHolidayPolicyInnerLayout from './Partials/CreateHolidayPolicyInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, holiday_policy_days, holiday_policy_days_rule, holiday_polices, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Holiday Policy</h2>}
        >
            <Head title="Holiday Policy" />

            <CreateHolidayPolicyInnerLayout 
            holiday_policy_days={holiday_policy_days} 
            holiday_policy_days_rule={holiday_policy_days_rule} 
            holiday_polices={holiday_polices} 
            />
        </DashboardLayout>
    );
}