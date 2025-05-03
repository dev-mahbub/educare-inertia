import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentViewInnerLayout from './Partials/StudentView/StudentViewInnerLayout';

export default function StudentViewSyllabus({ auth, siteData, mustVerifyEmail, students, academicSyllabuses, studentId }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student View Syllabus</h2>}
        >
            <Head title="Student View Syllabus" />

            <StudentViewInnerLayout 
                students={students}
                academicSyllabuses={academicSyllabuses}
                studentId={studentId}
            />
        </DashboardLayout>
    );
}
