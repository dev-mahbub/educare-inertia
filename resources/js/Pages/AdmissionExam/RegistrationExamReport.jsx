import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegistrationExamReportInnerLayout from './Partials/RegistrationExamReport/RegistrationExamReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RegistrationExamReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    statusArray,
    academicYears,
    classNames,
    academicYearId,
    registrationExamReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Exam Report</h2>}
        >
            <Head title="Registration Exam Report" />

            <RegistrationExamReportInnerLayout
                statusArray = {statusArray}
                academicYears={academicYears}
                classNames={classNames}
                academicYearId={academicYearId}
                registrationExamReport={registrationExamReport}
            />
        </DashboardLayout>
    );
}
