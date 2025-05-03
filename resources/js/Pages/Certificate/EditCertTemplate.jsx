import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateTemplateInnerLayout from './Partials/CreateTemplate/CreateTemplateInnerLayout';
import EditTemplateInnerLayout from './Partials/CreateTemplate/Edit/EditTemplateInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EditCertTemplate({
    auth,
    siteData,
    certificateData,
    certTypes,
    factoryRoles,
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
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Template</h2>}
        >
            <Head title="Create Template" />

            <EditTemplateInnerLayout
                certificateData={certificateData}
                certTypes={certTypes}
                factoryRoles={factoryRoles}
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
            />
        </DashboardLayout>
    );
}
