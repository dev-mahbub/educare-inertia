import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MyDetailAttendanceInnerLayout from './Partials/MyDetailAttendance/MyDetailAttendanceInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MyDetailAttendance({ auth, siteData, mustVerifyEmail, status, users }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Detail Attendance</h2>}
        >
            <Head title="My Detail Attendance" />

            <MyDetailAttendanceInnerLayout />
        </DashboardLayout>
    );
}