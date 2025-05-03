import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AdmissionProcessInnerLayout from './Partials/Process/AdmissionProcessInnerLayout';

export default function Edit({
    auth,
    siteData,
    academicYears,
    admissionDataDetails,
    admissionClassroomDetails,
    academicYearId,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admission Process</h2>}
        >
            <Head title="Admission Process" />

            <AdmissionProcessInnerLayout
                academicYears={academicYears}
                admissionDataDetails={admissionDataDetails}
                admissionClassroomDetails={admissionClassroomDetails}
                academicYearId={academicYearId}
            />
        </DashboardLayout>
    );
}
