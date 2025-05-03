import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeMisReportInnerLayout from './Partials/MisReport/FeeMisReportInnerLayout';

export default function MisReport({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    currentMonth,
    currentAcademicYear,
    totalDiscountAmount,
    currentDayTotalCollection,
    currentMonthTotalCollection,
    currentAcademicYearTotalCollection,
    monthWiseFeeCollection,
    lastTenDaysFeeCollection
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Main</h2>}
        >
            <Head title="Fee Main" />

           <FeeMisReportInnerLayout
                currentMonth={currentMonth}
                currentAcademicYear={currentAcademicYear}
                totalDiscountAmount={totalDiscountAmount}
                currentDayTotalCollection={currentDayTotalCollection}
                currentMonthTotalCollection={currentMonthTotalCollection}
                currentAcademicYearTotalCollection={currentAcademicYearTotalCollection}
                monthWiseFeeCollection={monthWiseFeeCollection}
                lastTenDaysFeeCollection={lastTenDaysFeeCollection}
           />
        </DashboardLayout>
    );
}
