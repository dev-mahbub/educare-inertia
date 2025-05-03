import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddNewAreaInnerLayout from './Partials/Create/AddNewAreaInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Show({ auth, siteData, areas }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Area</h2>}
        >
            <Head title="Add New Area" />

            <AddNewAreaInnerLayout areas={areas} />
        </DashboardLayout>
    );
}