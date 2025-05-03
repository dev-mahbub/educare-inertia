import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AcademicContentInnerLayout from './Partials/AcademicContentInnerLayout';

export default function Edit({ auth, siteData, mustVerifyEmail, timezones, countries, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Academic Content</h2>}
        >
            <Head title="Academic Content" />
            <AcademicContentInnerLayout timezones={timezones} countries={countries} states={states} />
        </DashboardLayout>
    );
}