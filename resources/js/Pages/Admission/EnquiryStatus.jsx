import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EnquiryStatusInnerLayout from './Partials/EnquiryStatus/EnquiryStatusInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, enquiryStatus}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Enquiry Status</h2>}
        >
            <Head title="Enquiry Status" />

            <EnquiryStatusInnerLayout 
            enquiryStatus = {enquiryStatus}
            />
        </DashboardLayout>
    );
}
