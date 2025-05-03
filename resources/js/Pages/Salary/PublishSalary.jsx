import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PublishSalaryInnerLayout from './Partials/PublishSalary/PublishSalaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function PublishSalary({
    auth,
    siteData,
    paymentMonths,
    staffSalaryPayments
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Publish Salary</h2>}
    >
        <Head title="Publish Salary" />

        <PublishSalaryInnerLayout
            paymentMonths={paymentMonths}
            staffSalaryPayments={staffSalaryPayments}
        />
    </DashboardLayout>
  );
}
