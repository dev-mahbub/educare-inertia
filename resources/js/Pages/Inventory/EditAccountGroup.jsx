import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditAccountGroupInnerLayout from './Partials/AccountType/Edit/EditAccountGroupInnerLayout';

export default function EditAccountGroup({ auth, siteData, parentTitles, accountGroup, accountGroups }) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <EditAccountGroupInnerLayout
                parentTitles={parentTitles}
                accountGroup={accountGroup}
                accountGroups={accountGroups}
            />
        </DashboardLayout>
    );
}
