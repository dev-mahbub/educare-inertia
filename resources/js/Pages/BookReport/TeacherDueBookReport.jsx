import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherDueBookReportInnerLayout from './Partials/TeacherDueBookReport/TeacherDueBookReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TeacherDueBookReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">TeacherDueBookReport</h2>}
        >
            <Head title="TeacherDueBookReport" />

            <TeacherDueBookReportInnerLayout/>
        </DashboardLayout>
    );
}