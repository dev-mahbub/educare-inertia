import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UpgradeInnerLayout from './Partials/Upgrade/UpgradeInnerLayout';
import BulkUploadImageInnerLayout from './Partials/BulkUploadImage/BulkUploadImageInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function BulkUploadImage({ auth, siteData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">BulkUploadImage</h2>}
        >
            <Head title="BulkUploadImage" />

            <BulkUploadImageInnerLayout/>
        </DashboardLayout>
    );
}
