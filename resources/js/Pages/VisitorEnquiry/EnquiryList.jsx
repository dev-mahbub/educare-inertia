import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EnquiryListInnerLayout from './Partials/EnquiryList/EnquiryListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EnquiryList({ auth, siteData, mustVerifyEmail, status, schools, visitorsEnquiry, visitorEnquiryDetailType }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Visitor Enquiry List</h2>}
        >
            <Head title="Visitor Enquiry List" />

            <EnquiryListInnerLayout visitorsEnquiry = {visitorsEnquiry} visitorEnquiryDetailType={visitorEnquiryDetailType}/>
        </DashboardLayout>
    );
}