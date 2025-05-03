import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditFeePDCInnerLayout from './Partials/Cheque/EditFeePDC/EditFeePDCInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EditPdc({ auth, siteData, mustVerifyEmail, status, schools, classrooms, students, cheques, banks, cheque }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee PDC</h2>}
        >
            <Head title="Fee PDC" />

            <EditFeePDCInnerLayout classrooms={classrooms} students={students} cheques={cheques} banks={banks} cheque={cheque} />
        </DashboardLayout>
    );
}
