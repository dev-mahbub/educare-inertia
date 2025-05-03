import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ManageBankAccountInnerLayout from './Partials/ManageBankAccount/ManageBankAccountInnerLayout';

export default function Create({ auth, siteData, bankAccounts, banks }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Bank Account</h2>}
        >
            <Head title="Manage Bank Account" />

            <ManageBankAccountInnerLayout bankAccounts={bankAccounts} banks={banks} />
        </DashboardLayout>
    );
}
