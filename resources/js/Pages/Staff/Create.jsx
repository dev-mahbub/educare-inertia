import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffCreateInnerLayout from './Partials/Create/StaffCreateInnerLayout';

export default function Create({
    auth,
    siteData,
    userRolls,
    genders,
    teachingTypes,
    states,
    houses,
    categories,
    empCats,
    staffCats,
    religions,
    jobTypes,
    departments,
    designations,
    bloodGroups,
    customFields
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Staff</h2>}
        >
            <Head title="Create Staff" />

            <StaffCreateInnerLayout
                userRolls={userRolls}
                genders={genders}
                teachingTypes={teachingTypes}
                states={states}
                houses={houses}
                categories={categories}
                empCats={empCats}
                staffCats={staffCats}
                religions={religions}
                jobTypes={jobTypes}
                departments={departments}
                designations={designations}
                bloodGroups={bloodGroups}
                customFields={customFields}
            />
        </DashboardLayout>
    );
}
