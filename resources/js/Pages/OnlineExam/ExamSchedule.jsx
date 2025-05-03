import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ExamScheduleInnerLayout from './Partials/ExamSchedule/ExamScheduleInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ExamSchedule({
    auth,
    siteData,
    virtualExams,
    virtualExamModes,
    classNames,
    subjects
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

    <>
        <ExamScheduleInnerLayout
            virtualExams={virtualExams}
            virtualExamModes={virtualExamModes}
            classNames={classNames}
            subjects={subjects}
        />
    </>
    </DashboardLayout>
  );
}
