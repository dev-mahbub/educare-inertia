import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditAssignClassSubjectInnerLayout from './Partials/AcademicActions/Assign/EditAssignClassSubjectInnerLayout';

export default function Show({ auth, siteData, subjects,classSubjectTypes,grades,classroomSubjects,classroomSubject}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subjects</h2>}
        >
            <Head title="Subjects" />
            <EditAssignClassSubjectInnerLayout  
                subjects = {subjects}
                classSubjectTypes={classSubjectTypes}
                grades={grades}
                classroomSubjects={classroomSubjects}
                classroomSubject={classroomSubject}
            />
        </DashboardLayout>
    );
}