import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditParentDetailsInnerLayout from './Partials/Edit/EditParentDetailsInnerLayout';

export default function Edit({
    auth,
    siteData,
    parentData,
    states
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Edit</h2>}
        >
            <Head title="Student Edit" />

            <EditParentDetailsInnerLayout
                parentData={parentData}
                states={states}
            />
        </DashboardLayout>
    );
}
