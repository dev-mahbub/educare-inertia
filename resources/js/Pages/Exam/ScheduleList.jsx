import DashboardLayout from '@/Layouts/DashboardLayout';

import { Head } from '@inertiajs/react';
import ExamScheduleInnerLayout from './Partials/ExamScheduleInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ScheduleList({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Exam Schedules List</h2>}
        >
            <Head title="Exam Schedules List" />

            <ExamScheduleInnerLayout />
        </DashboardLayout>
    );
}