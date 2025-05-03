import SiteGuestLayout from '@/Layouts/SiteGuestLayout';
import { Head } from '@inertiajs/react';
import StaffAttendanceInnerLayout from './Partials/StaffAttendance/StaffAttendanceInnerLayout';

export default function staffAttendance({currentSchoolInfo, messageData}) {
    return (
        <SiteGuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Attendance</h2>}
        >
            <Head title="Staff Attendance" />
            
            <StaffAttendanceInnerLayout currentSchoolInfo={currentSchoolInfo} messageData={messageData} />
        </SiteGuestLayout>
    );
}