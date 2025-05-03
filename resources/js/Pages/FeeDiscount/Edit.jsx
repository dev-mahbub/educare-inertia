import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditDiscountInnerLayout from './Partials/Discount/EditDiscountType/EditDiscountInnerLayout';

export default function Edit({ auth, siteData, mustVerifyEmail, timezones, countries, states, status, feeTypes, discounts, discount }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Concession Template</h2>}
        >
            <Head title="Concession Template" />

            <EditDiscountInnerLayout feeTypes={feeTypes} discounts={discounts} discount={discount} />
        </DashboardLayout>
    );
}
