import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ImprovePresenceInnerLayout from './Partials/ImprovePresenceInnerLayout';

export default function Edit({
    auth,
    siteData,
    presenceSettings,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Email Setting</h2>}
        >
            <Head title="Create Email Setting" />
            <ImprovePresenceInnerLayout
                presenceSettings={presenceSettings}
            />
        </DashboardLayout>
    );
}
