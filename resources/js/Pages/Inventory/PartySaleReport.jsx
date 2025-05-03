import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PartySaleReportInnerLayout from './Partials/InventoryReport/PartySaleReport/PartySaleReportInnerLayout';

export default function PartySaleReport({
    auth,
    siteData,
    classroomNames,
    pendingSale,
    paidSale,
    teacherNames,
    pendingSaleItem,
    paidSaleItem,
    students,
    student
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <PartySaleReportInnerLayout
                classroomNames={classroomNames}
                pendingSale={pendingSale}
                paidSale={paidSale}
                teacherNames={teacherNames}
                pendingSaleItem={pendingSaleItem}
                paidSaleItem={paidSaleItem}
                students={students}
                student={student}
            />
        </DashboardLayout>
    );
}
