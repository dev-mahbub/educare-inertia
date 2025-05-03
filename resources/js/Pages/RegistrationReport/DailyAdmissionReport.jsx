import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DailyAdmissionReportInnterLayout from './Partials/DailyAdmissionReport/DailyAdmissionReportInnterLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DailyAdmissionReport({
    auth,
    siteData,
    mustVerifyEmail,
    status, schools,
    academicYears,
    dailyAdmissionReport
    }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daily Admission Report</h2>}
        >
            <Head title="Daily Admission Report" />

           <DailyAdmissionReportInnterLayout
                academicYears = {academicYears}
                dailyAdmissionReport = {dailyAdmissionReport}
           />
        </DashboardLayout>
    );
}
