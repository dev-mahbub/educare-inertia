import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BuyQuestionsInnerLayout from './Partials/BuyQuestion/BuyQuestionsInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function BuyQuestion({
    auth,
    siteData,
    classNames,
    subjects,
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

        <>
            <BuyQuestionsInnerLayout
                classNames={classNames}
                subjects={subjects}
            />
        </>
    </DashboardLayout>
  );
}
