import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentAvailingDiscountInnerLayout from './Partials/Discount/StudentAvailingDiscount/StudentAvailingDiscountInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DiscountFeeReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    studentFeeDiscounts,
    feeTypes,
    classrooms,
    discounts
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Availing Concessions</h2>}
        >
            <Head title="Student Availing Concessions" />

            <StudentAvailingDiscountInnerLayout
                studentFeeDiscounts={studentFeeDiscounts}
                feeTypes={feeTypes}
                classrooms={classrooms}
                discounts={discounts}
            />
        </DashboardLayout>
    );
}
