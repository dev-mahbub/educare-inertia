import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AcademicContentInnerLayout from './Partials/AcademicContentInnerLayout';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    classNames,
    subjects,
    learningMaterialGroups,
    onlineTopics,
    resourceTypes,
    studentClassNames,
    classrooms,
    classSubjects,
    shareLearningMaterialGroups
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Academic Content</h2>}
        >
            <Head title="Academic Content" />
            <AcademicContentInnerLayout
                classNames={classNames}
                subjects={subjects}
                learningMaterialGroups={learningMaterialGroups}
                user={auth.user}
                onlineTopics={onlineTopics}
                resourceTypes={resourceTypes}
                studentClassNames={studentClassNames}
                classrooms={classrooms}
                classSubjects={classSubjects}
                shareLearningMaterialGroups={shareLearningMaterialGroups}
            />
        </DashboardLayout>
    );
}
