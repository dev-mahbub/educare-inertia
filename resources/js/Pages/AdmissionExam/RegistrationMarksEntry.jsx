import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegistrationMarksEntryInnterLayout from './Partials/RegistrationMarksEntry/RegistrationMarksEntryInnterLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RegistrationMarksEntry({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    academicYears,
    classNames,
    enquiries,
    exams,
    academicYearId,
    studentRegistrationMarks
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Marks Entry</h2>}
        >
            <Head title="Registration Marks Entry" />

            <RegistrationMarksEntryInnterLayout
                academicYears={academicYears}
                classNames={classNames}
                enquiries={enquiries}
                exams={exams}
                academicYearId={academicYearId}
                studentRegistrationMarks={studentRegistrationMarks}
            />
        </DashboardLayout>
    );
}
