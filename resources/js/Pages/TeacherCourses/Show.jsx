import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherCoursesInnerLayout from './Partials/TeacherCoursesInnerLayout';

export default function Show({
    auth,
    siteData,
    classrooms,
    subjects,
    classroomLearningMaterials,
    currentDate
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Classroom</h2>}
        >
            <Head title="Classroom" />
            <TeacherCoursesInnerLayout
                siteData={siteData}
                classrooms={classrooms}
                subjects={subjects}
                classroomLearningMaterials={classroomLearningMaterials}
                currentDate={currentDate}
            />
        </DashboardLayout>
    );
}
