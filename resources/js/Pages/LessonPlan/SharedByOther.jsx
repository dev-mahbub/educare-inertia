import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ListLessonPlanInnerLayout from './Partials/SharedByOtherList/ListLessonPlanInnerLayout';

export default function SharedByOther({
    auth,
    siteData,
    lessonPlans
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Lesson Plans shared with you" />

            <ListLessonPlanInnerLayout
                lessonPlans={lessonPlans}
            />
        </DashboardLayout>
    );
}
