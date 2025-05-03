import FeeMisQuickReport from './FeeMisQuickReport';
import MonthFeesCollection from './MonthFeesCollection';
import TenDaysFeesCollection from './TenDaysFeesCollection';

import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';

const FeeMisReportInnerLayout = ({
    currentMonth,
    currentAcademicYear,
    totalDiscountAmount,
    currentDayTotalCollection,
    currentMonthTotalCollection,
    currentAcademicYearTotalCollection,
    monthWiseFeeCollection = [],
    lastTenDaysFeeCollection = []
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    <FeeHeaderMenus title="Manage Fees" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeMisQuickReport
                        currentMonth={currentMonth}
                        currentAcademicYear={currentAcademicYear}
                        totalDiscountAmount={totalDiscountAmount}
                        currentDayTotalCollection={currentDayTotalCollection}
                        currentMonthTotalCollection={currentMonthTotalCollection}
                        currentAcademicYearTotalCollection={currentAcademicYearTotalCollection}
                    />
                    <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                        <div className="col-span-12 lg:col-span-6">
                            <MonthFeesCollection
                                monthWiseFeeCollection={monthWiseFeeCollection}
                            />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <TenDaysFeesCollection
                                lastTenDaysFeeCollection={lastTenDaysFeeCollection}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeeMisReportInnerLayout;
