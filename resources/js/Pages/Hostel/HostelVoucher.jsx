import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HostelVoucherInnerLayout from './Partials/HostelVoucher/HostelVoucherInnerLayout';

export default function HostelVoucher({
    auth,
    siteData,
    hostelVoucherSetting,
    hostelVoucher,
    installmentNo,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hostel Voucher</h2>}
        >
            <Head title="Hostel Voucher" />

            <HostelVoucherInnerLayout
                hostelVoucherSetting={hostelVoucherSetting}
                hostelVoucher={hostelVoucher}
                installmentNo={installmentNo}
            />
        </DashboardLayout>
    );
}
