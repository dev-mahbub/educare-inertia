import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateTemplateInnerLayout from './Partials/CreateTemplate/CreateTemplateInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CertTemplate({
    auth,
    siteData,
    certTypes,
    viewNames,
    audiences,
    certificates,
    // added
    classrooms,
    studentNames,
    students,
    academicSession,
    feeTypes,
    feeTitles,
    teacherNames,
    classroomWithExam
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Template</h2>}
        >
            <Head title="Create Template" />

            <CreateTemplateInnerLayout
                certTypes={certTypes}
                viewNames={viewNames}
                audiences={audiences}
                certificates={certificates}

                classrooms={classrooms}
                studentNames={studentNames}
                students={students}
                academicSession={academicSession}
                feeTypes={feeTypes}
                feeTitles={feeTitles}
                teacherNames={teacherNames}
                classroomWithExam={classroomWithExam}
            />
        </DashboardLayout>
    );
}
