import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SchoolInnerLayout from './Partials/SchoolInnerLayout';

export default function Edit({ auth, siteData, mustVerifyEmail, domain_name, schools, timezones, countries, states, }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Domain List</h2>}
        >
            <Head title="Domain List" />

            <SchoolInnerLayout domain_name={domain_name} schools={schools} timezones={timezones} countries={countries} states={states} />
        </DashboardLayout>
    );
}
