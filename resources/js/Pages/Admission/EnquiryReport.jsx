import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EnquiryReportInnerLayout from './Partials/Enquiry/Report/EnquiryReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EnquiryReport({ auth, siteData, enqueryReportList, landmarks, classes, status, schoolAdmin, enquiryStatusArray }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Settings</h2>}
        >
            <Head title="Registration Settings" />

            <EnquiryReportInnerLayout
                enqueryReportList={enqueryReportList}
                landmarks={landmarks}
                classes={classes}
                status={status}
                schoolAdmin={schoolAdmin}
                enquiryStatusArray={enquiryStatusArray}
            />
        </DashboardLayout>
    );
}
