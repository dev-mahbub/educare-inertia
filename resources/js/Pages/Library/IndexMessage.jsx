import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import IndexMessageInnerLayout from './Partials/IndexMessage/IndexMessageInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function IndexMessage({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Library</h2>}
        >
            <Head title="Library" />

            <IndexMessageInnerLayout />
        </DashboardLayout>
    );
}