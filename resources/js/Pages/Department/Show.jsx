import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateDepartmentContactInnerLayout from './Partials/CreateDepartmentContactInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, departments, status , message }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">School Department</h2>}
        >
            <Head title="School Department" />

            <CreateDepartmentContactInnerLayout departments={departments}  />
        </DashboardLayout>
    );
}