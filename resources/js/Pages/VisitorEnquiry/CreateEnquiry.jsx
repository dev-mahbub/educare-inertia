import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateEnquiryInnerLayout from './Partials/CreateEnquiry/CreateEnquiryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CreateEnquiry({ auth, siteData, mustVerifyEmail, status, schools, activeVisitorTypes }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Enquiry</h2>}
        >
            <Head title="Create Enquiry" />

            <CreateEnquiryInnerLayout activeVisitorTypes={activeVisitorTypes}/>
        </DashboardLayout>
    );
}