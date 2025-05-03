import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import QuestionBankInnerLayout from './Partials/QuestionBank/QuestionBankInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function QuestionBank({ auth, siteData, mustVerifyEmail, status, schools, virtualQuestionBanks, virtualSigleQuestion }) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

      <>
        <QuestionBankInnerLayout virtualQuestionBanks={virtualQuestionBanks} />
      </>
    </DashboardLayout>
  );
}
