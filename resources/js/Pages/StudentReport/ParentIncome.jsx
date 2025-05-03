import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ParentIncomeInnerLayout from './Partials/ParentIncome/ParentIncomeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ParentIncome({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    parentIncomeReport,
    guardians
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parent Income</h2>}
        >
            <Head title="Parent Income" />

            <ParentIncomeInnerLayout
                parentIncomeReport={parentIncomeReport}
                guardians={guardians}
            />
        </DashboardLayout>
    );
}
