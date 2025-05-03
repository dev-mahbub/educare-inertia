import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssignExamInnerLayout from './Partials/AssignExamQuestion/AssignExamInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CreateExam({
    auth,
    siteData,
    virtualExam,
    onlineTopics,
    virtualAssets,
    questionTypes,
    difficultyLevels,
    languages,
    virtualQuestions,
    assignedQuestions
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Head title="Online Exam" />

        <>
            <AssignExamInnerLayout
                virtualExam={virtualExam}
                onlineTopics={onlineTopics}
                virtualAssets={virtualAssets}
                questionTypes={questionTypes}
                difficultyLevels={difficultyLevels}
                languages={languages}
                virtualQuestions={virtualQuestions}
                assignedQuestions={assignedQuestions}
            />
        </>
    </DashboardLayout>
  );
}
