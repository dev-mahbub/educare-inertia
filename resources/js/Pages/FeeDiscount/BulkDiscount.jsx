import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BulkDiscountInnerLayout from './Partials/Discount/BulkDiscount/BulkDiscountInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function BulkDiscount({ auth, siteData, mustVerifyEmail, status, schools, classrooms, discounts, feeTypes, fees, students }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Set Bulk Concession</h2>}
        >
            <Head title="Set Bulk Concession" />

            <BulkDiscountInnerLayout classrooms={classrooms} discounts={discounts} feeTypes={feeTypes} fees={fees} students={students}/>
        </DashboardLayout>
    );
}
