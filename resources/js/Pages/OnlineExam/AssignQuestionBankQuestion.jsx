import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssignQuestionBankInnerLayout from './Partials/AssignQuestionBankQuestion/AssignQuestionBankInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AssignQuestionBankQuestion({ auth, siteData, mustVerifyEmail, status, schools, virtualQuestions, virtualAssignedQusetionsIds }) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

      <>
        <AssignQuestionBankInnerLayout virtualQuestions={virtualQuestions} virtualAssignedQusetionsIds={virtualAssignedQusetionsIds} />
      </>
    </DashboardLayout>
  );
}
