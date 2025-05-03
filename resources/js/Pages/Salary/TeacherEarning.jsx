import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffEarningDeductionInnerLayout from './Partials/StaffEarningDeduction/StaffEarningDeductionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TeacherEarning({
    auth,
    siteData,
    staffs,
    payScales,
    staffEarning,
    earningTypes,
    deductionTypes,
    staff
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher Earning</h2>}
    >
      <Head title="Teacher Earning" />

        <StaffEarningDeductionInnerLayout
            staffs={staffs}
            payScales={payScales}
            staffEarning={staffEarning}
              earningTypes={earningTypes}
              deductionTypes={deductionTypes}
              staff={staff}
        />
    </DashboardLayout>
  );
}
