import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SmsCircularGenerateInnerLayout from './Partials/SmsCircularGenerate/SmsCircularGenerateInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    smsCirculars,
    students,
    staffs,
    classrooms
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Sms" />
            <SmsCircularGenerateInnerLayout
                smsCirculars={smsCirculars}
                students={students}
                staffs={staffs}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
