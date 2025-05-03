import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentDocumentInnerLayout from './Partials/StudentDocumentReport/StudentDocumentInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentDocumentReport({ auth, siteData, students, classrooms }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Document Report</h2>}
        >
            <Head title="Student Document Report" />

            <StudentDocumentInnerLayout
                students={students}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
