import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AdmissionExamSummaryInnerLayout from './Partials/AdmissionExamSummary/AdmissionExamSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AdmissionExamSummary({ auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    boarding,
    admissionExamSummary,
    registrations
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admission Exam Summary</h2>}
        >
            <Head title="Admission Exam Summary" />

            <AdmissionExamSummaryInnerLayout
                boarding = {boarding}
                admissionExamSummary={admissionExamSummary}
                registrations={registrations}
            />
        </DashboardLayout>
    );
}
