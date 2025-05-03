import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeamReportInnerLayout from './Partials/TeamReport/TeamReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TeamReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Team Report</h2>}
        >
            <Head title="Team Report" />

            <TeamReportInnerLayout/>
        </DashboardLayout>
    );
}