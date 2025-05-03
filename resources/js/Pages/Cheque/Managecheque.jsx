import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ManageChequeInnerLayout from './Partials/Cheque/ManageCheque/ManageChequeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ManageCheque({ auth, siteData, mustVerifyEmail, status, schools, chequeReports, classrooms }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Cheques</h2>}
        >
            <Head title="Manage Cheques" />

            <ManageChequeInnerLayout chequeReports={chequeReports} classrooms={classrooms}/>
        </DashboardLayout>
    );
}
