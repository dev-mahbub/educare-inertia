import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SetAdmissionExamDateInnerLayout from './Partials/SetAdmissionExamDate/SetAdmissionExamDateInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function SetExamDate({ 
    auth, 
    siteData, 
    mustVerifyEmail, 
    status, 
    schools, 
    classNames, 
    academicYears,
    registrations,
    academicYearId
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Set Exam Date</h2>}
        >
            <Head title="Set Exam Date" />

            <SetAdmissionExamDateInnerLayout 
                classNames = {classNames}
                academicYears = {academicYears}
                registrations={registrations}
                academicYearId={academicYearId}
            />
        </DashboardLayout>
    );
}
