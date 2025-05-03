import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import IncrementStaffSalaryInnerLayout from './Partials/IncrementStaffSalary/IncrementStaffSalaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function IncrementStaffSalary({
    auth,
    siteData,
    staffs,
    staffEarning,
    staff,
    incrementTypes,
    staffSalaryIncrements
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Increment Staff Salary</h2>}
    >
        <Head title="Increment Staff Salary" />

        <IncrementStaffSalaryInnerLayout
            staffs={staffs}
            staffEarning={staffEarning}
            staff={staff}
            incrementTypes={incrementTypes}
            staffSalaryIncrements={staffSalaryIncrements}
        />
    </DashboardLayout>
  );
}
