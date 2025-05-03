import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SetExamDateInnerLayout from './Partials/SetExamDate/SetExamDateInnerLayout';

export default function ExamDates({
    auth,
    siteData,
    exams,
    classNames,
    classroomExamDateData
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Set Exam Date</h2>}
        >
            <Head title="Set Exam Date" />

            <SetExamDateInnerLayout
                exams={exams}
                classNames={classNames}
                classroomExamDateData={classroomExamDateData}
            />
        </DashboardLayout>
    );
}
