import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ExamSummaryInnerLayout from './Partials/ExamSummary/ExamSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ExportExamMark({
    auth,
    siteData,
    virtualExams
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
        <Head title="Online Exam" />

        <>
            <ExamSummaryInnerLayout
                virtualExams={virtualExams}
            />
        </>
    </DashboardLayout>
  );
}
