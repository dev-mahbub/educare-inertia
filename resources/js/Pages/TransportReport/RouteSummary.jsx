import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RouteSummaryReportInnerLayout from './Partials/RouteSummary/RouteSummaryReportInnerLayout';

export default function RouteSummary({
    auth,
    siteData,
    routeData,
    studentData,
    totalStudent,
    routeName,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Route Summary</h2>}
        >
            <Head title="Route Summary" />

            <RouteSummaryReportInnerLayout
                routeData={routeData}
                totalStudent={totalStudent}
                studentData={studentData}
                routeName={routeName}
            />
        </DashboardLayout>
    );
}
