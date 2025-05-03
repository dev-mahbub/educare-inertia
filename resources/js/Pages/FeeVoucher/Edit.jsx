import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditVoucherInnerLayout from './Partials/EditVoucher/EditVoucherInnerLayout';


export default function Edit({
    auth,
    siteData,
    mustVerifyEmail,
    timezones,
    countries,
    states,
    status,
    classrooms,
    students,
    voucher_modes,
    feeTypes,
    studentFeeVoucher,
    feeVouchersByStudent
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Voucher Edit</h2>}
        >
            <Head title="Fee Voucher Edit" />
            <EditVoucherInnerLayout classrooms={classrooms} students={students} voucher_modes={voucher_modes} feeTypes={feeTypes} studentFeeVoucher={studentFeeVoucher} feeVouchersByStudent={feeVouchersByStudent} />
        </DashboardLayout>
    );
}
