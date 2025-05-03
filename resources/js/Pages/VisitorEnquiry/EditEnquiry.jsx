import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditEnquiryInnerLayout from './Partials/EditEnquiry/EditEnquiryInnerLayout';

export default function EditEnquiry({ auth, siteData, mustVerifyEmail, status, schools, visitorEnquiry, activeVisitorTypes }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Enquiry</h2>}
        >
            <Head title="Edit Enquiry" />

            <EditEnquiryInnerLayout activeVisitorTypes={activeVisitorTypes} visitorEnquiry={visitorEnquiry}/>
        </DashboardLayout>
    );
}