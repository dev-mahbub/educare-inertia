import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EnquirySettingInnerLayout from './Partials/EnquirySetting/EnquirySettingInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EnquirySetting({ auth, siteData, mustVerifyEmail, status, schools, gatepass }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Enquiry Setting</h2>}
        >
            <Head title="Enquiry Setting" />

            <EnquirySettingInnerLayout gatepass={gatepass} />
        </DashboardLayout>
    );
}