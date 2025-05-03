import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeStudentFollowUpInnerLayout from './Partials/FeeStudentFollowUp/FeeStudentFollowUpInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function FeeStudentFollowUp({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    followUpReports
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Student Follow Up</h2>}
        >
            <Head title="Fee Student Follow Up" />

            <FeeStudentFollowUpInnerLayout
                classrooms={classrooms}
                followUpReports={followUpReports}
            />
        </DashboardLayout>
    );
}
