import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateQuestionInnerLayout from './Partials/CreateQuestion/CreateQuestionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CreateQuestion({
    auth,
    siteData,
    subjects,
    classNames,
    onlineTopics,
    questionTypes,
    difficultyLevels,
    languages,
    virtualAssets,
    shareAudienceTypes
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

      <>
        <CreateQuestionInnerLayout
            subjects={subjects}
            classNames={classNames}
            onlineTopics={onlineTopics}
            questionTypes={questionTypes}
            difficultyLevels={difficultyLevels}
            languages={languages}
            virtualAssets={virtualAssets}
            shareAudienceTypes={shareAudienceTypes}
        />
      </>
    </DashboardLayout>
  );
}
