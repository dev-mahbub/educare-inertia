import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffEditInnerLayout from './Partials/Edit/StaffEditInnerLayout';

export default function Edit({
    auth,
    siteData,
    userRolls,
    staff,
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Staff</h2>}
        >
            <Head title="Edit Staff" />

            <StaffEditInnerLayout
                staff={staff}
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
