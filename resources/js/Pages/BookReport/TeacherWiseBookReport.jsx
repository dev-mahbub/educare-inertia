import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherWiseBookReportInnerLayout from './Partials/TeacherWiseBookReport/TeacherWiseBookReportInnerLayout';

export default function BookSearchByLocation({
    auth,
    siteData,
    teacherBookReport,
    teacherData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">TeacherWiseBookReport</h2>}
        >
            <Head title="TeacherWiseBookReport" />

            <TeacherWiseBookReportInnerLayout
                teacherBookReport={teacherBookReport}
                teacherData={teacherData}
            />
        </DashboardLayout>
    );
}
