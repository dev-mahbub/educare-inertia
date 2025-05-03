import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditAssetInnerLayout from './Partials/EditAsset/EditAssetInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EditAsset({
  auth,
  siteData,
  subjects,
  classNames,
  onlineTopics,
  virtualAssetTypes,
  asset}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Online Exam</h2>}
    >
      <Head title="Online Exam" />

      <>
        <EditAssetInnerLayout 
          subjects={subjects}
          classNames={classNames}
          onlineTopics={onlineTopics}
          virtualAssetTypes={virtualAssetTypes} 
          asset={asset}/>
      </>
    </DashboardLayout>
  );
}
