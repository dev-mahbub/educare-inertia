import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegistrationReportInnerLayout from './Partials/RegistrationReport/RegistrationReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RegistrationReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    academicYears,
    months,
    classWiseReports,
    dayWiseReports
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Report</h2>}
        >
            <Head title="Registration Report" />

            <RegistrationReportInnerLayout
                academicYears = {academicYears}
                months = {months}
                classWiseReports={classWiseReports}
                dayWiseReports={dayWiseReports}
            />
        </DashboardLayout>
    );
}
