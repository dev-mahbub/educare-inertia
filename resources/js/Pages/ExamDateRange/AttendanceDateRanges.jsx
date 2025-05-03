import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AttendanceDateRangeInnerLayout from './Partials/SetExamAttendanceDateRange/AttendanceDateRangeInnerLayout';

export default function AttendanceDateRanges({
    auth,
    siteData,
    classNames,
    examAttendances
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Set Exam Attendance Date Range</h2>}
        >
            <Head title="Set Exam Attendance Date Range" />

            <AttendanceDateRangeInnerLayout
                classNames={classNames}
                examAttendances={examAttendances}
            />
        </DashboardLayout>
    );
}
