import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddEnquiryInnerLayout from './Partials/Enquiry/Add/AddEnquiryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EnquiryForm({
    auth,
    siteData,
    users,
    admissionSources,
    states,
    ScholarBoardingType,
    academicYears,
    genderType,
    classes,
    totalEnquiryCount,
    academicYearId
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Admission Enquiry</h2>}
        >
            <Head title="Add Admission Enquiry" />

            <AddEnquiryInnerLayout
                users = {users}
                states = {states}
                admissionSources = {admissionSources}
                ScholarBoardingType = {ScholarBoardingType}
                academicYears = {academicYears}
                genderType = {genderType}
                classes = {classes}
                totalEnquiryCount = {totalEnquiryCount}
                academicYearId={academicYearId}
            />
        </DashboardLayout>
    );
}
