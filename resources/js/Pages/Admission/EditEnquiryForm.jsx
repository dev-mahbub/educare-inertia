import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditEnquiryInnerLayout from './Partials/Enquiry/Add/EditEnquiryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EditEnquiryForm({
    auth,
    siteData,
    enqueryData,
    enqueryGuardianData,
    admissionSources,
    users,
    states,
    ScholarBoardingType,
    academicYears,
    classes,
    totalEnquiryCount,
    genderType,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Admission Enquiry</h2>}
        >
            <Head title="Edit Admission Enquiry" />

            <EditEnquiryInnerLayout
                enqueryData={enqueryData}
                enqueryGuardianData={enqueryGuardianData}
                admissionSources={admissionSources}
                users={users}
                states={states}
                ScholarBoardingType={ScholarBoardingType}
                academicYears={academicYears}
                classes={classes}
                totalEnquiryCount={totalEnquiryCount}
                genderType={genderType}
            />
        </DashboardLayout>
    );
}
