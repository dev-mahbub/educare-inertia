import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ParentMonthlyIncomeInnerLayout from './Partials/ParentMonthlyIncome/ParentMonthlyIncomeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ParentMonthlyIncome({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parent Monthly Income</h2>}
        >
            <Head title="Parent Monthly Income" />
            <ParentMonthlyIncomeInnerLayout/>
        </DashboardLayout>
    );
}
