import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ImportInnerLayout from './Partials/CreateImport/ImportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ImportFee({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import Fee</h2>}
        >
            <Head title="Import Fee" />

            <ImportInnerLayout />
        </DashboardLayout>
    );
}
