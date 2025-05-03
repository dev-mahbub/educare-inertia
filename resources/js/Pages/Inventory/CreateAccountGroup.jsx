import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateAccountGroupInnerLayout from './Partials/AccountType/Create/CreateAccountGroupInnerLayout';

export default function CreateAccountGroup({ auth, siteData, parentTitles, accountGroups }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <CreateAccountGroupInnerLayout
                parentTitles={parentTitles}
                accountGroups={accountGroups}
            />
        </DashboardLayout>
    );
}
