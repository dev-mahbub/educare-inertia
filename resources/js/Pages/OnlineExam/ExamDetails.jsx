import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ExamDetailsInnerlayout from './Partials/ExamDetails/ExamDetailsInnerlayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ExamDetails({
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
            <ExamDetailsInnerlayout
                virtualExam={virtualExam}
            />
        </>
    </DashboardLayout>
  );
}
