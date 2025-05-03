import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherSaleInnerLayout from './Partials/Transaction/TeacherSale/TeacherSaleInnerLayout';

export default function TeacherSaleProduct({
    auth,
    siteData,
    ledgerTitles,
    paymentArrType,
    products,
    teachers,
    teacherNames,
    discountTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <TeacherSaleInnerLayout
                ledgerTitles={ledgerTitles}
                paymentArrType={paymentArrType}
                products={products}
                teachers={teachers}
                teacherNames={teacherNames}
                discountTypes={discountTypes}
            />
        </DashboardLayout>
    );
}

