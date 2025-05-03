import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ExamChangeStatusInnerLayout from './Partials/ExamChangeStatus/ExamChangeStatusInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ChangeSelectedStatus({ 
    auth, 
    siteData, 
    mustVerifyEmail, 
    status, 
    schools, 
    academicYears,
    examStatusArray,
    classNames,
    registrations,
    academicYearId
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Change Selected Status</h2>}
        >
            <Head title="Change Selected Status" />

            <ExamChangeStatusInnerLayout 
                academicYears = {academicYears}
                examStatusArray = {examStatusArray}
                classNames = {classNames}
                registrations = {registrations}
                academicYearId={academicYearId}
            />
        </DashboardLayout>
    );
}
