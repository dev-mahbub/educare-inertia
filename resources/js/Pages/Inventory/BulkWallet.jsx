import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BulkWalletInnerLayout from './Partials/Transaction/BulkWallet/BulkWalletInnerLayout';

export default function ImportItem({
    auth,
    siteData,
    boardingStudents,
    classrooms,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <BulkWalletInnerLayout
                boardingStudents={boardingStudents}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
