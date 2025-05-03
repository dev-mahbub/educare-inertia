import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateSubjectInnerLayout from './Partials/CreateSubjectInnerLayout';

export default function Show({
    auth,
    siteData,
    subjects,
    eLearningSubjects,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subjects</h2>}
        >
            <Head title="Subjects" />
            <CreateSubjectInnerLayout
                subjects={subjects}
                eLearningSubjects={eLearningSubjects}
            />
        </DashboardLayout>
    );
}
