import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import YearlyHeadWiseDuesInnerLayout from './Partials/YearlyHeadWiseDuesSummary/YearlyHeadWiseDuesInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function YearlyHeadWiseDuesSummary({ auth, siteData, mustVerifyEmail, status, schools, fees, headWiseDueSummary, installmentWiseAmounts }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Yearly Head Wise Dues Summary</h2>}
        >
            <Head title="Fee Yearly Head Wise Dues Summary" />

            <YearlyHeadWiseDuesInnerLayout
                fees={fees}
                headWiseDueSummary={headWiseDueSummary}
                installmentWiseAmounts={installmentWiseAmounts}
            />
        </DashboardLayout>
    );
}
