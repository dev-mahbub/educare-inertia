import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ListLessonPlanInnerLayout from './Partials/ClassWiseReport/ListLessonPlanInnerLayout';

export default function ClassWiseReport({
    auth,
    siteData,
    classWiseReport,
    classrooms
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Class Wise Report" />

            <ListLessonPlanInnerLayout
                classWiseReport={classWiseReport}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
