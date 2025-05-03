import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentSaleInnerLayout from './Partials/Transaction/StudentSale/StudentSaleInnerLayout';

export default function StudentSaleProduct({
    auth,
    siteData,
    ledgerTitles,
    classroomTitles,
    paymentArrType,
    products,
    students,
    student,
    discountTypes
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <StudentSaleInnerLayout
                ledgerTitles={ledgerTitles}
                classroomTitles={classroomTitles}
                paymentArrType={paymentArrType}
                products={products}
                students={students}
                student={student}
                discountTypes={discountTypes}
            />
        </DashboardLayout>
    );
}
