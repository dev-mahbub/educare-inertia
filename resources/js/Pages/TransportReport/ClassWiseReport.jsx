import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassWiseSummaryInnerLayout from './Partials/ClassWiseSummary/ClassWiseSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ClassWiseReport({
    auth,
    siteData,
    classrooms,
    studentData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class Wise Report</h2>}
        >
            <Head title="Class Wise Report" />

            <ClassWiseSummaryInnerLayout
                classrooms={classrooms}
                studentData={studentData}
            />
        </DashboardLayout>
    );
}
