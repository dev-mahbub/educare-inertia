import InventoryHeaderMenus from '@/Components/Partials/Menus/Inventory/InventoryHeaderMenus';
import InventoryCollectionGraph from './InventoryCollectionGraph';
import InventoryExpensesGraph from './InventoryExpensesGraph';
import MisReportList from './MisReportList';

const MisReporttInnerLayout = ( {
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
} ) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <InventoryHeaderMenus title="Manage Accountancy" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <MisReportList
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
                    />
                    <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                        <div className="col-span-12 lg:col-span-6">
                            <InventoryCollectionGraph
                                monthWiseCollectionReport={monthWiseCollectionReport}
                            />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <InventoryExpensesGraph
                                monthWiseExpenseReport={monthWiseExpenseReport}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MisReporttInnerLayout;
