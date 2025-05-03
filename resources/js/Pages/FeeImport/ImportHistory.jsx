import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ImportHistoryInnerLayout from './Partials/ImportHistory/ImportHistoryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ImportHistory({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Import History</h2>}
        >
            <Head title="Fee Import History" />

            <ImportHistoryInnerLayout />
        </DashboardLayout>
    );
}
