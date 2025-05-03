import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ChangeStatusInnerLayout from './Partials/ChangeStatus/ChangeStatusInnerLayout';
import ChangeClassInnerLayout from './Partials/ChangeClass/ChangeClassInnerLayout';

export default function ChangeClass({
    auth,
    siteData,
    classrooms,
    changeStudents,
    classroom_id,
    session_year,
    selectedStudent,
    searchValue,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Change in class</h2>
            }
        >
            <Head title="Change in class" />
            <ChangeClassInnerLayout
                classrooms={classrooms}
                changeStudents={changeStudents}
                classroom_id={classroom_id}
                session_year={session_year}
                selectedStudent={selectedStudent}
                searchValue={searchValue}
            />
        </DashboardLayout>
    );
}
