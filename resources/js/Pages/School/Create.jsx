import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateSchoolInnerLayout from './Partials/Create/CreateSchoolInnerLayout';

export default function Edit({ auth, siteData, timezones, countries, states, boards, durations, academicYears }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create School" />

            <CreateSchoolInnerLayout
                timezones={timezones}
                countries={countries}
                states={states}
                boards={boards}
                durations={durations}
                academicYears={academicYears}

                />
        </DashboardLayout>
    );
}
