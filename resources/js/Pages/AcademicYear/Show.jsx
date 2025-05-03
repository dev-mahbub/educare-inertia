import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AcademicYearContactInnerLayout from './Partials/AcademicYearContactInnerLayout';

export default function Show({ auth, siteData, academicYears }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Academic years</h2>}
        >
            <Head title="Academic years" />

            <AcademicYearContactInnerLayout academicYears={academicYears}  />
        </DashboardLayout>
    );
}
