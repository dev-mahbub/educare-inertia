import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LiveExamInnerLayout from './Partials/LiveExam/LiveExamInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function LiveExam({ auth, siteData, mustVerifyEmail, status, schools }) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

      <>
        <LiveExamInnerLayout />
      </>
    </DashboardLayout>
  );
}
