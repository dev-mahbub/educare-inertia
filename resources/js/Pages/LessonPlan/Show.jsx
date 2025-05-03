import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ListLessonPlanInnerLayout from './Partials/List/ListLessonPlanInnerLayout';

export default function Show({
    auth,
    siteData,
    lessonPlans,
    classrooms,
    subjects
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Lesson plan list" />

            <ListLessonPlanInnerLayout
                lessonPlans={lessonPlans}
                classrooms={classrooms}
                subjects={subjects}
            />
        </DashboardLayout>
    );
}
