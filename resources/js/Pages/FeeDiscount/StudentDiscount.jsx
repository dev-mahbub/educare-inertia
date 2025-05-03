import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentDiscountInnerLayout from './Partials/Discount/StudentDiscount/StudentDiscountInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentDiscount({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    discounts,
    feeTypes,
    students,
    studentUnpaidFees,
    student
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Set Student Concession</h2>}
        >
            <Head title="Set Student Concession" />

            <StudentDiscountInnerLayout
                classrooms={classrooms}
                discounts={discounts}
                feeTypes={feeTypes}
                students={students}
                studentUnpaidFees={studentUnpaidFees}
                student={student}
            />
        </DashboardLayout>
    );
}
