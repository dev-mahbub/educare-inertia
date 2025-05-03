import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PermissionInnerLayout from './Partials/PermissionInnerLayout';

export default function Edit({ auth, siteData, roles, users, selectedPermissions, checkData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Permissions</h2>}
        >
            <Head title="Permissions" />

            <PermissionInnerLayout 
                auth={auth} 
                siteData={siteData} 
                roles={roles} 
                users={users} 
                selectedPermissions={selectedPermissions} 
                checkData={checkData} />
        </DashboardLayout>
    );
}