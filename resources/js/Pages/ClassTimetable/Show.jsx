import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassTimeTableInnerLayout from './Partials/ClassTimeTableInnerLayout';

export default function Show({ auth, siteData, shiftTypes, classrooms, timetables }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Classroom</h2>}
        >
            <Head title="Classroom" />
            <ClassTimeTableInnerLayout shiftTypes={shiftTypes} classrooms={classrooms} timetables={timetables} />
        </DashboardLayout>
    );
}