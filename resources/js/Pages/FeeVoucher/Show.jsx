import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import VoucherListInnerLayout from './Partials/VoucherList/VoucherListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Show({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    studentFeeVouchers,
    classrooms,
    voucherStatusArray,
    students,
    student
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Vouchers</h2>}
        >
            <Head title="Fee Vouchers" />

            <VoucherListInnerLayout
                studentFeeVouchers={studentFeeVouchers}
                classrooms={classrooms}
                voucherStatusArray={voucherStatusArray}
                students={students}
                student={student}
            />
        </DashboardLayout>
    );
}
