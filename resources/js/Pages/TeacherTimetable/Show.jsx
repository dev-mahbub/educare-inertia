import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherTimeTableInnerLayout from './Partials/TeacherTimeTableInnerLayout';

export default function Show({ auth, siteData, shiftTypes, timetables }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Classroom</h2>}
        >
            <Head title="Classroom" />
            <TeacherTimeTableInnerLayout shiftTypes={shiftTypes} timetables={timetables} />
        </DashboardLayout>
    );
}