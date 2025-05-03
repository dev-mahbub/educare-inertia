import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BirthdayInnerLayout from './Partials/Birthday/BirthdayInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ students, months, auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student List</h2>}
        >
            <Head title="Student Birthday List" />

            <BirthdayInnerLayout
                students={students}
                months={months}
            />
        </DashboardLayout>
    );
}
