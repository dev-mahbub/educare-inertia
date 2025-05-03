import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SchoolInnerLayout from './Partials/List/SchoolInnerLayout';

export default function Edit({ auth, siteData, schools, timezones, countries, states, domain_name, schoolCounts }) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Schools List</h2>}
        >
            <Head title="Schools List" />

            <SchoolInnerLayout
                schools={schools}
                timezones={timezones}
                countries={countries}
                states={states}
                domain_name={domain_name}
                schoolCounts={schoolCounts}

            />
        </DashboardLayout>
    );
}
