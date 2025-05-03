import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FinancialInnerLayout from './Partials/FinancialInnerLayout';

export default function Create({ auth, siteData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Finance</h2>}
        >
            <Head title="Financial" />
            <FinancialInnerLayout siteData={siteData}  />
        </DashboardLayout>
    );
}