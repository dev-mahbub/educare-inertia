import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SmsCreateInnerLayout from './Partials/Create/SmsCreateInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({ auth, siteData, mustVerifyEmail, classrooms, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Sms" />
            <SmsCreateInnerLayout classrooms={classrooms}  />
        </DashboardLayout>
    );
}