import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssignSubjectsInnerLayout from './Partials/AssignSubjectsInnerLayout';

export default function AssignToClass({
    auth,
    siteData,
    dataArray,
    subjects,
    classrooms,
    assignedSubjects,
    classId,
    classSubjectTypes,
    academic_grade_data
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Academics Management</h2>}
        >
            <Head title="Academics Management" />
            <AssignSubjectsInnerLayout
                dataArray={dataArray}
                subjects={subjects}
                classrooms={classrooms}
                assignedSubjects={assignedSubjects}
                classId={classId}
                classSubjectTypes={classSubjectTypes}
                academic_grade_data={academic_grade_data}
            />
        </DashboardLayout>
    );
}
