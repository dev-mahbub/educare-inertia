import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MisReporttInnerLayout from './Partials/MisReport/MisReporttInnerLayout';

export default function MisReport({
    auth,
    siteData,
    totalPurchaseAmount,
    monthlyPurchaseAmount,
    totalReturnSaleAmount,
    monthlyReturnSaleAmount,
    totalPaidSaleAmount,
    monthlyPaidSaleAmount,
    totalUnpaidSaleAmount,
    monthlyUnpaidSaleAmount,
    totalSaleAmount,
    monthlySaleAmount,
    currentMonth,
    totalExpenseAmount,
    monthlyExpenseAmount,
    monthWiseCollectionReport,
    monthWiseExpenseReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quick Reports - Inventory</h2>}
        >
            <Head title="Quick Reports - Inventory" />

            <MisReporttInnerLayout
                totalPurchaseAmount={totalPurchaseAmount}
                monthlyPurchaseAmount={monthlyPurchaseAmount}
                totalReturnSaleAmount={totalReturnSaleAmount}
                monthlyReturnSaleAmount={monthlyReturnSaleAmount}
                totalPaidSaleAmount={totalPaidSaleAmount}
                monthlyPaidSaleAmount={monthlyPaidSaleAmount}
                totalUnpaidSaleAmount={totalUnpaidSaleAmount}
                monthlyUnpaidSaleAmount={monthlyUnpaidSaleAmount}
                totalSaleAmount={totalSaleAmount}
                monthlySaleAmount={monthlySaleAmount}
                currentMonth={currentMonth}
                totalExpenseAmount={totalExpenseAmount}
                monthlyExpenseAmount={monthlyExpenseAmount}
                monthWiseCollectionReport={monthWiseCollectionReport}
                monthWiseExpenseReport={monthWiseExpenseReport}
            />
        </DashboardLayout>
    );
}
