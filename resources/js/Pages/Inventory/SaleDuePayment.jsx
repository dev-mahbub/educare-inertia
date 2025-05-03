import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SaleDuePaymentInnerLayout from './Partials/Transaction/SaleDuePayment/SaleDuePaymentInnerLayout';

export default function SaleDuePayment({
    auth,
    siteData,
    classrooms,
    students,
    student,
    paymentModes,
    staffs,
    staff,
    saleLedgers,
    filteredStudents
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <SaleDuePaymentInnerLayout
                classrooms={classrooms}
                students={students}
                student={student}
                paymentModes={paymentModes}
                staffs={staffs}
                staff={staff}
                saleLedgers={saleLedgers}
                filteredStudents={filteredStudents}
            />
        </DashboardLayout>
    );
}
