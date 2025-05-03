import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentWorkInnerLayout from './Partials/StudentView/StudentWork/StudentWorkInnerLayout';


export default function StudentWork({ auth, siteData, mustVerifyEmail, assessment, students, classworkTypes, comments, studentId, teacherId, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Assessment List</h2>}
        >
            <Head title="Assessment List" />

            <StudentWorkInnerLayout
                assessment={assessment} 
                students={students}
                classworkTypes={classworkTypes}
                comments={comments}
                studentId={studentId}
                teacherId={teacherId}
            />
        </DashboardLayout>
    );
}
