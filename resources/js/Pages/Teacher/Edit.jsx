import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherEditInnerLayout from './Partials/Edit/TeacherEditInnerLayout';

export default function Edit({
    auth,
    siteData,
    teacher,
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
    bloodGroups
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Teacher</h2>}
        >
            <Head title="Edit Teacher" />

            <TeacherEditInnerLayout
                teacher={teacher}
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
            />
        </DashboardLayout>
    );
}
