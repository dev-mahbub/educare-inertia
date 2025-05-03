import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateVoucherInnerLayout from './Partials/CreateVoucher/CreateVoucherInnerLayout';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    timezones,
    countries,
    states,
    status,
    classrooms,
    voucher_modes,
    feeTypes,
    students,
    student,
    studentFeeVouchers
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Create Voucher</h2>}
        >
            <Head title="Fee Create Voucher" />

            <CreateVoucherInnerLayout
                classrooms={classrooms}
                voucher_modes={voucher_modes}
                feeTypes={feeTypes}
                students={students}
                student={student}
                studentFeeVouchers={studentFeeVouchers}
            />
        </DashboardLayout>
    );
}
