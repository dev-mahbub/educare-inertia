import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditBankAccountInnerLayout from './Partials/EditBankAccount/EditBankAccountInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, timezones, countries, states, status, banks, bankAccounts, bankAccount}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Bank Account</h2>}
        >
            <Head title="Manage Bank Account" />

            <EditBankAccountInnerLayout banks={banks} bankAccounts={bankAccounts} bankAccount={bankAccount} />
        </DashboardLayout>
    );
}
