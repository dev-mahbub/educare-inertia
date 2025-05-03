import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import GuardianWiseDueReportInnerLayout from './Partials/GuardianWiseDueReport/GuardianWiseDueReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function GuardianWiseDueReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    fees,
    student_status_array,
    guardian_array,
    payment_status_array,
    guardianWiseReport,
    transport_routes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Guardian Wise Due Report</h2>}
        >
            <Head title="Fee Guardian Wise Due Report" />

            <GuardianWiseDueReportInnerLayout
                classrooms={classrooms}
                fees={fees}
                student_status_array={student_status_array}
                guardian_array={guardian_array}
                payment_status_array={payment_status_array}
                transport_routes={transport_routes}
                guardianWiseReport={guardianWiseReport}
            />
        </DashboardLayout>
    );
}
