import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentBookWiseReportInnerLayout from './Partials/StudentBookWiseReport/StudentBookWiseReportInnerLayout';

export default function StudentBookWiseReport({ auth, siteData, studentBooks }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">StudentBookWiseReport</h2>}
        >
            <Head title="StudentBookWiseReport" />

            <StudentBookWiseReportInnerLayout
                studentBooks={studentBooks}
            />
        </DashboardLayout>
    );
}
