import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherSaleReturnInnerLayout from './Partials/Transaction/TeacherSaleReturn/TeacherSaleReturnInnerLayout';

export default function TeacherSaleProductReturn({
    auth,
    siteData,
    ledgerTitles,
    products,
    teachers,
    teacherNames,
    discountTypes,
    receiptNo,
    saleLedger
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <TeacherSaleReturnInnerLayout
                ledgerTitles={ledgerTitles}
                products={products}
                teachers={teachers}
                teacherNames={teacherNames}
                discountTypes={discountTypes}
                receiptNo={receiptNo}
                saleLedger={saleLedger}
            />
        </DashboardLayout>
    );
}

