import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditExamInnerLayout from './Partials/Masters/EditExam/EditExamInnerLayout';

export default function EditExam({
    auth,
    siteData,
    exam,
    exams,
    classrooms
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Exam</h2>}
        >
            <Head title="Edit Exam" />

            <EditExamInnerLayout
                exam={exam}
                exams={exams}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
