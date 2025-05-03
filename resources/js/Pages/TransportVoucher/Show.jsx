import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TransportVoucherInnerLayout from './Partials/TransportVoucher/TransportVoucherInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    vouchers,
    classNames,
    classrooms,
    voucherStatusArray,
    transportVoucherReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transport Voucher</h2>}
        >
            <Head title="Transport Voucher" />

            <TransportVoucherInnerLayout
                vouchers={vouchers}
                classNames={classNames}
                classrooms={classrooms}
                voucherStatusArray={voucherStatusArray}
                transportVoucherReport={transportVoucherReport}
            />
        </DashboardLayout>
    );
}



