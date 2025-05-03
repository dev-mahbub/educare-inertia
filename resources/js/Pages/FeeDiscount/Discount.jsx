import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddDiscountInnerLayout from './Partials/Discount/AddDiscountType/AddDiscountInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Discount({ auth, siteData, mustVerifyEmail, status, schools, feeTypes, discounts }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Concession Template</h2>}
        >
            <Head title="Concession Template" />

            <AddDiscountInnerLayout feeTypes={feeTypes} discounts={discounts}/>
        </DashboardLayout>
    );
}
