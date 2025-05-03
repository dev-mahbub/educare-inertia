import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CancelledReportInnerLayout from './Partials/CancelledReport/CancelledReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CancelledReport({
    auth,
    siteData,
    paymentMonths,
    staffs,
    cancelledStaffSalaryPayments
  }) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cancelled Report</h2>}
    >
      <Head title="Cancelled Report" />

        <CancelledReportInnerLayout
            paymentMonths={paymentMonths}
            staffs={staffs}
            cancelledStaffSalaryPayments={cancelledStaffSalaryPayments}
        />
    </DashboardLayout>
  );
}
