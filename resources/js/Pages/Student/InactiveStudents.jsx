import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import InactiveStudentInnerLayout from './Partials/Inactive/InactiveStudentInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({
    auth,
    siteData,
    students,
    classrooms,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student List</h2>}
        >
            <Head title="Student List" />

            <InactiveStudentInnerLayout
                students={students}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
