import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ExamFinishedInnerLayout from './Partials/ExamFinished/ExamFinishedInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CreateExam({
    auth,
    siteData,
    virtualExam
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

    <>
        <ExamFinishedInnerLayout
            virtualExam={virtualExam}
        />
    </>
    </DashboardLayout>
  );
}
