import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditVoucherTypeInnerLayout from './Partials/VoucherType/Edit/EditVoucherTypeInnerLayout';

export default function ProductVoucherType({ auth, siteData, voucher, vouchers, voucherTypeArr, vendors }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <EditVoucherTypeInnerLayout
                voucher={voucher}
                vouchers={vouchers}
                voucherTypeArr={voucherTypeArr}
                vendors={vendors}
            />
        </DashboardLayout>
    );
}
