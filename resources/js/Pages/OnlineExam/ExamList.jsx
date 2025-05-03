import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ExamListInnerLayout from './Partials/ExamList/ExamListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ExamList({
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
            <ExamListInnerLayout
                virtualExams={virtualExams}
                virtualExamModes={virtualExamModes}
                classNames={classNames}
                subjects={subjects}
            />
        </>
    </DashboardLayout>
  );
}
