import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SetExamRemarkInnerLayout from './Partials/SetExamRemark/SetExamRemarkInnerLayout';

export default function ExamRemarks({ auth, siteData, exams, classrooms, remarkForStudent }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Set Exam Remark</h2>}
        >
            <Head title="Set Exam Remark" />

            <SetExamRemarkInnerLayout
                exams={exams}
                classrooms={classrooms}
                remarkForStudent={remarkForStudent}
            />
        </DashboardLayout>
    );
}
