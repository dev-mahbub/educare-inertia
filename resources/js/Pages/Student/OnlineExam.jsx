import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

import OnlineExamMainInnerLayout from './Partials/OnlineExam/OnlineExamMainInnerLayout';

export default function OnlineExam({ auth, siteData, students, studentId, virtualExamStatus, virtualExamModes, subjects, virtualExams }) {

  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Online Exam</h2>}
    >
      <Head title="Student Online Exam" />

      <>
        <OnlineExamMainInnerLayout students={students} studentId={studentId}  virtualExamStatus={virtualExamStatus} virtualExamModes={virtualExamModes} subjects={subjects} virtualExams={virtualExams} />
      </>
    </DashboardLayout>
  );
}
