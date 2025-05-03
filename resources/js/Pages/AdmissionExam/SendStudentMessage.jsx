import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SendStudentMessageInnerLayout from './Partials/SendStudentMessage/SendStudentMessageInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function SendStudentMessage({ auth, siteData, mustVerifyEmail, status, schools, sendMessageData, academicYear, classRoomName,enquiryStatus,statusPrimary }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Send Student Message</h2>}
        >
            <Head title="Send Student Message" />

            <SendStudentMessageInnerLayout sendMessageData = {sendMessageData} 
            academicYear = {academicYear}
            classRoomName = {classRoomName}
            enquiryStatus = {enquiryStatus}
            statusPrimary = {statusPrimary}
            />
        </DashboardLayout>
    );
}
