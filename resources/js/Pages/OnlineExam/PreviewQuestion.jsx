import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PreviewQuestionInnerLayout from './Partials/PreviewQuestion/PreviewQuestionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function PreviewQuestion({
    auth,
    siteData,
    virtualQuestion
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

    <>
        <PreviewQuestionInnerLayout
            virtualQuestion={virtualQuestion}
        />
    </>
    </DashboardLayout>
  );
}
