import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentListInnerLayout from './Partials/List/StudentListInnerLayout';

export default function Show({
    auth,
    siteData,
    students,
    classrooms,
    boardingType,
    contextStatus
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student List</h2>}
        >
            <Head title="Student List" />

            <StudentListInnerLayout
                students={students}
                classrooms={classrooms}
                boardingType={boardingType}
                contextStatus={contextStatus}
            />
        </DashboardLayout>
    );
}
