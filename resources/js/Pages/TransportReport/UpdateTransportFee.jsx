import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UpdateTransportFeeInnerLayout from './Partials/UpdateTransportFee/UpdateTransportFeeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function UpdateTransportFee({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Transport Fee</h2>}
        >
            <Head title="Update Transport Fee" />

            <UpdateTransportFeeInnerLayout />
        </DashboardLayout>
    );
}
