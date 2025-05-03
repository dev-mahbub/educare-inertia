import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import OnlineFeeTransectionInnerLayout from './Partials/OnlineFeeTransection/OnlineFeeTransectionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function OnlineFeeTransaction({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Online Fee Transaction</h2>}
        >
            <Head title="Online Fee Transaction" />

            <OnlineFeeTransectionInnerLayout />
        </DashboardLayout>
    );
}
