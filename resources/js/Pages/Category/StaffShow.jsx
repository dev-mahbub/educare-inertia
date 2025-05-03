import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateCategoryStaffInnerLayout from './Partials/Staff/CreateCategoryStaffInnerLayout';

export default function Show({ auth, siteData, staffCategories, staffParent }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Category</h2>}
        >
            <Head title="Staff category" />

            <CreateCategoryStaffInnerLayout
                staffCategories={staffCategories}
                staffParent={staffParent}
            />
        </DashboardLayout>
    );
}
