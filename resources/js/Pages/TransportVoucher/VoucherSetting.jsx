import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import VoucherSettingInnerLayout from './Partials/VoucherSetting/VoucherSettingInnerLayout';

export default function Setting({ auth, siteData, vouchers, installmentNo, transportFeeStructure }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Voucher Setting</h2>}
        >
            <Head title="Voucher Setting" />

            <VoucherSettingInnerLayout
                vouchers = {vouchers}
                installmentNo={installmentNo}
                transportFeeStructure={transportFeeStructure}
            />
        </DashboardLayout>
    );
}
