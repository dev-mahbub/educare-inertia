import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AdmissionMisReportInnerLayout from './Partials/MisReport/AdmissionMisReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MisReport({
    auth,
    siteData,
    totalAdmissions,
    totalRegistrations,
    todayRegistrations,
    todayAdmissions,
    sessionWiseRegistrations,
    last7DaysRegistrationAnalysis,
    last7DaysCollectionAnalysis,
    classWiseRegistrationSummary,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admission - Dashboard</h2>}
        >
            <Head title="Admission - Dashboard" />

            <AdmissionMisReportInnerLayout
                totalAdmissions={totalAdmissions}
                totalRegistrations={totalRegistrations}
                todayRegistrations={todayRegistrations}
                todayAdmissions={todayAdmissions}
                sessionWiseRegistrations={sessionWiseRegistrations}
                last7DaysRegistrationAnalysis={last7DaysRegistrationAnalysis}
                last7DaysCollectionAnalysis={last7DaysCollectionAnalysis}
                classWiseRegistrationSummary={classWiseRegistrationSummary}
            />
        </DashboardLayout>
    );
}
