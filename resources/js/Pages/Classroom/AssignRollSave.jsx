import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassRollInnerLayout from './Partials/ClassRollInnerLayout';

export default function AssignRollSave({ auth, siteData, classroom, studentsSortData, students, rolls }) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Assign Roll</h2>}
        >
            <Head title="Class time table List" />

            <ClassRollInnerLayout
                classroom={classroom}
                studentsSortData={studentsSortData}
                students={students}
                rolls={rolls}
            />
        </DashboardLayout>
    );
}
