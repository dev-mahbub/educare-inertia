import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SetBulkExamRoasterInnerLayout from './Partials/SetBulkExamRoaster/SetBulkExamRoasterInnerLayout';

export default function SetBulkExamRoaster({
    auth,
    siteData,
    bulkExamRoaster = [],
    exams,
    classnames,
    examRoasterData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Set Bulk Exam Roaster</h2>}
        >
            <Head title="Set Bulk Exam Roaster" />

            <SetBulkExamRoasterInnerLayout
                bulkExamRoaster={bulkExamRoaster}
                exams={exams}
                classnames={classnames}
                examRoasterData={examRoasterData}
            />
        </DashboardLayout>
    );
}
