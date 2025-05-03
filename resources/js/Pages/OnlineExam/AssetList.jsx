import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssetListInnerLayout from './Partials/AssetList/AssetListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AssetList({ auth, siteData, subjects, classNames, onlineTopics, examAssets }) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Assets of Online Exam</h2>}
    >
      <Head title="Assets of Online Exam" />

      <>
        <AssetListInnerLayout 
          subjects={subjects} 
          classNames={classNames}
          onlineTopics={onlineTopics}
          examAssets={examAssets}
          />
      </>
    </DashboardLayout>
  );
}
