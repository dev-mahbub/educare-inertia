import InventoryExpensesChart from "./InventoryCharts/InventoryExpensesChart";

const InventoryExpensesGraph = ({
    monthWiseExpenseReport
}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-4">
            <div className="educare-card-header mb-[20px] px-5">
                <h4 className='educare-chart-title'>Graph Wise Monthly Expenses</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <InventoryExpensesChart
                    monthWiseExpenseReport={monthWiseExpenseReport}
                />
            </div>
        </div>
    );
};

export default InventoryExpensesGraph;
