import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UpgradeInnerLayout from './Partials/Upgrade/UpgradeInnerLayout';

export default function UpgradeShow({
    auth,
    siteData,
    academicYearId,
    academicSession,
    classrooms,
    classroomStudents,
    students,
    classroomUpgradeStudents,
}) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student upgrade</h2>}
        >
            <Head title="Student upgrade" />

            <UpgradeInnerLayout
                academicYearId={academicYearId}
                academicSession={academicSession}
                classrooms={classrooms}
                classroomStudents={classroomStudents}
                students={students}
                classroomUpgradeStudents={classroomUpgradeStudents}
                user={auth?.user?.username}
            />
        </DashboardLayout>
    );
}
