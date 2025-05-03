import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MyDetailSalaryInnerLayout from './Partials/MyDetailSalary/MyDetailSalaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MyDetailSalary({ auth, siteData, mustVerifyEmail, status, users }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Profile Salary</h2>}
        >
            <Head title="My Profile Salary" />

            <MyDetailSalaryInnerLayout siteData={siteData} />
        </DashboardLayout>
    );
}