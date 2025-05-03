import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentTeacherLedgerInnerLayout from './Partials/AccountMaster/StudentTeacherLedger/StudentTeacherLedgerInnerLayout';

export default function StudentTeacherLedger({
    auth,
    siteData,
    classrooms,
    stuTeaTypeArr,
    students,
    teachers,
    dataList,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <StudentTeacherLedgerInnerLayout
                classrooms={classrooms}
                stuTeaTypeArr={stuTeaTypeArr}
                students={students}
                teachers={teachers}
                dataList={dataList}
            />
        </DashboardLayout>
    );
}
