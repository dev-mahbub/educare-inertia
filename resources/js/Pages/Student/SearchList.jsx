import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentSearchInnerLayout from './Partials/Search/StudentSearchInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Search({
    auth,
    siteData,
    students,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Search List</h2>}
        >
            <Head title="Student Search List" />

            <StudentSearchInnerLayout
                students={students}
            />
        </DashboardLayout>
    );
}
