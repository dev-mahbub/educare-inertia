import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditHomeworkInnerLayout from './Partials/Edit/EditHomeworkInnerLayout';

export default function Edit({ auth, siteData, homeWork, subjects, classNames, classroomData, homeworkTypes}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Homework</h2>}
        >
            <Head title="Edit Homework" />

            <EditHomeworkInnerLayout
                homeWork={homeWork}
                subjects={subjects}
                classNames={classNames}
                homeworkTypes={homeworkTypes}
                classroomData={classroomData}
            />
        </DashboardLayout>
    );
}
