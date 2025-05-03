import InventoryCollectionChart from "./InventoryCharts/InventoryCollectionChart";

const InventoryCollectionGraph = ({
    monthWiseCollectionReport
}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-4">
            <div className="educare-card-header mb-[20px] px-5">
                <h4 className='educare-chart-title'>Graph Wise Monthly Collections</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <InventoryCollectionChart
                    monthWiseCollectionReport={monthWiseCollectionReport}
                />
            </div>
        </div>
    );
};

export default InventoryCollectionGraph;
