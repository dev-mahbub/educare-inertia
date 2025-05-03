import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentDueBookReportInnerLayout from './Partials/StudentDueBookReport/StudentDueBookReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentDueBookReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">StudentDueBookReport</h2>}
        >
            <Head title="StudentDueBookReport" />

            <StudentDueBookReportInnerLayout />
        </DashboardLayout>
    );
}