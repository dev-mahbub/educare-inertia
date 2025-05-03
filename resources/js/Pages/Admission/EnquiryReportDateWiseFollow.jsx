import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FollowDateWiseInnerLayout from './Partials/Enquiry/Follow/FollowDateWiseInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EnquiryReportDateWiseFollow({ auth, siteData, mustVerifyEmail, status, schools, timezones, countries, states,dateWiseReport }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Follow Date Wise Report</h2>}
        >
            <Head title="Follow Date Wise Report" />

            <FollowDateWiseInnerLayout
            dateWiseReport = {dateWiseReport}
            />
        </DashboardLayout>
    );
}