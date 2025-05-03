import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ListLessonPlanInnerLayout from './Partials/TeacherWiseReport/ListLessonPlanInnerLayout';

export default function TeacherWiseReport({
    auth,
    siteData,
    teacherWiseReport
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Teacher Wise Report" />

            <ListLessonPlanInnerLayout
                teacherWiseReport={teacherWiseReport}
            />
        </DashboardLayout>
    );
}
