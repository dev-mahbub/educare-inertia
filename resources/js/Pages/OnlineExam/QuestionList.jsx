import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import QuestionListInnerLayout from './Partials/Questions/QuestionListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function QuestionList({
    auth,
    siteData,
    subjects,
    classNames,
    onlineTopics,
    questionTypes,
    difficultyLevels,
    languages,
    virtualAssets,
    virtualQuestions,
    statusTypes,
    publishStatusTypes
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

        <>
            <QuestionListInnerLayout
                subjects={subjects}
                classNames={classNames}
                onlineTopics={onlineTopics}
                questionTypes={questionTypes}
                difficultyLevels={difficultyLevels}
                languages={languages}
                virtualAssets={virtualAssets}
                virtualQuestions={virtualQuestions}
                statusTypes={statusTypes}
                publishStatusTypes={publishStatusTypes}
            />
        </>
    </DashboardLayout>
  );
}
