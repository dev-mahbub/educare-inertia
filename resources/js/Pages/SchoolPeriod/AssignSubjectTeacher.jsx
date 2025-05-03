import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssignSubjectTeacherInnerLayout from './Partials/AssignSubjectTeacherInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, timezones, countries, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create School" />

            <AssignSubjectTeacherInnerLayout timezones={timezones} countries={countries} states={states}  />
        </DashboardLayout>
    );
}