import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DeductionInnerLayout from './Partials/Deduction/DeductionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Deduction({
    auth,
    siteData,
    deductionTypes
}) {
  return (
    <DashboardLayout
        user={auth.user}
        siteData={siteData}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Deduction</h2>}
    >
        <Head title="Deduction" />

        <DeductionInnerLayout
            deductionTypes={deductionTypes}
        />
    </DashboardLayout>
  );
}
