import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ActivityDateWiseInnerLayout from './Partials/Enquiry/Activity/ActivityDateWiseInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EnquiryReportDateWiseActivity({ auth, siteData, mustVerifyEmail, status, schools, timezones, countries, states, enqueryReportList }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Activity Date Wise Report</h2>}
        >
            <Head title="Activity Date Wise Report" />

            <ActivityDateWiseInnerLayout enqueryReportList = {enqueryReportList} />
        </DashboardLayout>
    );
}