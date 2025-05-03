import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AdjustLeaveInnerLayout from './Partials/AdjustLeave/AdjustLeaveInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AdjustLeave({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Adjust Leave</h2>}
        >
            <Head title="Adjust Leave" />
            <AdjustLeaveInnerLayout/>
        </DashboardLayout>
    );
}