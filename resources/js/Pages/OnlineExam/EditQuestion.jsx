import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditQuestionInnerLayout from './Partials/EditQuestion/EditQuestionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EditQuestion({
    auth,
    siteData,
    subjects,
    classNames,
    onlineTopics,
    questionTypes,
    difficultyLevels,
    languages,
    virtualAssets,
    shareAudienceTypes,
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
        <EditQuestionInnerLayout
            subjects={subjects}
            classNames={classNames}
            onlineTopics={onlineTopics}
            questionTypes={questionTypes}
            difficultyLevels={difficultyLevels}
            languages={languages}
            virtualAssets={virtualAssets}
            shareAudienceTypes={shareAudienceTypes}
            virtualQuestion={virtualQuestion}
        />
      </>
    </DashboardLayout>
  );
}
