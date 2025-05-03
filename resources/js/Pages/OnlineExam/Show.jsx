import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

import OnlineExamMainInnerLayout from './Partials/OnlineExamMain/OnlineExamMainInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, status, schools }) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

      <>
        <OnlineExamMainInnerLayout />
      </>
    </DashboardLayout>
  );
}
