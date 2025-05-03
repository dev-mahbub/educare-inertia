import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateLessonPlanInnerLayout from './Partials/Create/CreateLessonPlanInnerLayout';

export default function Create({
    auth,
    siteData,
    subjects,
    classNames,
    classrooms,
    teachers
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create lesson plan" />

            <CreateLessonPlanInnerLayout
                subjects={subjects}
                classNames={classNames}
                classrooms={classrooms}
                teachers={teachers}
            />
        </DashboardLayout>
    );
}
