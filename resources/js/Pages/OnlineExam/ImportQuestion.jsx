import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ImportQuestionInnerLayout from './Partials/ImportQuestion/ImportQuestionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ImportQuestion({
    auth,
    siteData,
    subjects,
    classNames,
    onlineTopics,
    languages
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

        <>
            <ImportQuestionInnerLayout
                subjects={subjects}
                classNames={classNames}
                onlineTopics={onlineTopics}
                languages={languages}
            />
        </>
    </DashboardLayout>
  );
}
