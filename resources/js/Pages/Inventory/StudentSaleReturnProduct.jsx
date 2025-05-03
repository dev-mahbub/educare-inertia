import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentSaleReturnInnerLayout from './Partials/Transaction/StudentSaleReturn/StudentSaleReturnInnerLayout';

export default function StudentSaleReturnProduct({
    auth,
    siteData,
    ledgerTitles,
    classroomTitles,
    products,
    discountTypes,
    receiptNo,
    students,
    student,
    saleLedger
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <StudentSaleReturnInnerLayout
                ledgerTitles={ledgerTitles}
                classroomTitles={classroomTitles}
                products={products}
                discountTypes={discountTypes}
                receiptNo={receiptNo}
                students={students}
                student={student}
                saleLedger={saleLedger}
            />
        </DashboardLayout>
    );
}
