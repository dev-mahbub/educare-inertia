import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MonthReportInnerLayout from './Pertials/MonthReport/MonthReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MonthReport({
    auth,
    siteData,
    students,
    classrooms,
    academicSession,
    monthArr,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Month Report</h2>}
        >
            <Head title="Month Report" />

            <MonthReportInnerLayout
                students={students}
                classrooms={classrooms}
                academicSession={academicSession}
                monthArr={monthArr}
            />
        </DashboardLayout>
    );
}
