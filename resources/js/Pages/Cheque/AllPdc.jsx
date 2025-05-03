import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeAllPDCListInnerLayout from './Partials/Cheque/FeeAllPDC/FeeAllPDCListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AllPdc({ auth, siteData, mustVerifyEmail, status, schools, cheques, cheque_all_status, classrooms }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee All PDC</h2>}
        >
            <Head title="Fee All PDC" />

            <FeeAllPDCListInnerLayout cheques={cheques} cheque_all_status={cheque_all_status} classrooms={classrooms}/>
        </DashboardLayout>
    );
}
