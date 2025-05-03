import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentHeadWiseFeeReportInnerLayout from './Partials/StudentHeadWiseFeeReport/StudentHeadWiseFeeReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentHeadWiseFeeReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    fees,
    classrooms,
    student_status_array,
    studentHeadWiseReports
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Head Wise Fee Report</h2>}
        >
            <Head title="Student Head Wise Fee Report" />

            <StudentHeadWiseFeeReportInnerLayout
                fees={fees}
                classrooms={classrooms}
                student_status_array={student_status_array}
                studentHeadWiseReports={studentHeadWiseReports}
            />
        </DashboardLayout>
    );
}
