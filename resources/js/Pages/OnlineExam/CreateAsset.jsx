import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateAssetInnerLayout from './Partials/CreateAsset/CreateAssetInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CreateAsset({
  auth,
  siteData,
  subjects,
  classNames,
  onlineTopics,
  virtualAssetTypes}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Online Exam</h2>}
    >
      <Head title="Online Exam" />

      <>
        <CreateAssetInnerLayout 
          subjects={subjects}
          classNames={classNames}
          onlineTopics={onlineTopics}
          virtualAssetTypes={virtualAssetTypes} />
      </>
    </DashboardLayout>
  );
}
