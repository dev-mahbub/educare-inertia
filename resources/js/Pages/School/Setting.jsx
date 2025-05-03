import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SchoolSettingInnerLayout from './Partials/SchoolSettingInnerLayout';

export default function Edit({
    auth,
    siteData,
    school,
    timezones,
    countries,
    states,
    boards,
    durations,
    academicYears,
    image,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">School Setting</h2>}
        >
            <Head title="School Setting" />

            <SchoolSettingInnerLayout
                school={school}
                timezones={timezones}
                countries={countries}
                states={states}
                boards={boards}
                durations={durations}
                academicYears={academicYears}
                image={image}
            />
        </DashboardLayout>
    );
}
