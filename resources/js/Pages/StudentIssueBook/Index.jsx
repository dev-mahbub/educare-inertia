import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentIssueBookInnerLayout from './Partials/StudentIssueBookInnerLayout';

export default function Show({ auth, siteData, ebookList, students, assessments, issuedBookLists }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Issue Book</h2>}
        >
            <Head title="Student Issue Book" />

            <StudentIssueBookInnerLayout ebookList={ebookList} students={students} assessments={assessments} issuedBookLists={issuedBookLists} />
        </DashboardLayout>
    );
}
