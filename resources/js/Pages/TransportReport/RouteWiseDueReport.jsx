import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RouteWiseDueReportInnerLayout from './Partials/RouteWiseDueReport/RouteWiseDueReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RouteWiseDueReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Route Wise Due Report</h2>}
        >
            <Head title="Route Wise Due Report" />

            <RouteWiseDueReportInnerLayout />
        </DashboardLayout>
    );
}
