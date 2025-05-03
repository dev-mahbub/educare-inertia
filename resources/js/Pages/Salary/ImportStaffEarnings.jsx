import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ImportStaffEarningsInnerLayout from './Partials/ImportStaffEarnings/ImportStaffEarningsInnerLayout';

export default function ImportStaffEarnings({
    auth,
    siteData
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import Staff Earnings</h2>}
    >
      <Head title="Import Staff Earnings" />

      <ImportStaffEarningsInnerLayout />
    </DashboardLayout>
  );
}
