import DashboardLayout from '@/Layouts/DashboardLayout';

import { Head } from '@inertiajs/react';
import UpdateStudentInnerLayout from './Partials/UpdateStudent/UpdateStudentInnerLayout';

export default function Edit({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    columns,
    columnLabels
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Student Data</h2>}
        >
            <Head title="Update Student Data" />

            <UpdateStudentInnerLayout
                classrooms={classrooms}
                columns={columns}
                columnLabels={columnLabels}
            />
        </DashboardLayout>
    );
}
