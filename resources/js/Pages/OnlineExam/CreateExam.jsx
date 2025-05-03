import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateExamInnerLayout from './Partials/CreateExam/CreateExamInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CreateExam({
    auth,
    siteData,
    virtualExamModes,
    classNames,
    subjects,
    virtualExam
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Online Exam</h2>}
    >
      <Head title="Online Exam" />

        <>
            <CreateExamInnerLayout
                virtualExamModes={virtualExamModes}
                classNames={classNames}
                subjects={subjects}
                virtualExam={virtualExam}
            />
        </>
    </DashboardLayout>
  );
}
