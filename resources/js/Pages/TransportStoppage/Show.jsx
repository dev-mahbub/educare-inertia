import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StoppageListInnerLayout from './Partials/List/StoppageListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, mustVerifyEmail, status, transports }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stoppage List</h2>}
        >
            <Head title="Stoppage List" />

            <StoppageListInnerLayout transports = {transports} />
        </DashboardLayout>
    );
}
