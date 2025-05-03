import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentViewInnerLayout from './Partials/StudentView/StudentViewInnerLayout';

export default function StudentView({ auth, siteData, mustVerifyEmail, students, studentId, homeWorks, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Homework List</h2>}
        >
            <Head title="Homework List" />

            <StudentViewInnerLayout 
                students={students}
                studentId={studentId}
                homeWorks={homeWorks}
            />
        </DashboardLayout>
    );
}
