import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditLessonPlanInnerLayout from './Partials/Edit/EditLessonPlanInnerLayout';

export default function Edit({
    auth,
    siteData,
    subjects,
    classNames,
    classrooms,
    teachers,
    lessonPlan,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit lesson plan" />

            <EditLessonPlanInnerLayout
                subjects={subjects}
                classNames={classNames}
                classrooms={classrooms}
                teachers={teachers}
                lessonPlan={lessonPlan}
            />
        </DashboardLayout>
    );
}
