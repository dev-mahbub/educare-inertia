import MonthFeesCollectionChart from "./FeeCharts/MonthFeesCollectionChart";

const MonthFeesCollection = ({
    monthWiseFeeCollection = []
}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-2">
            <div className="educare-card-header mb-[20px] px-6">
                <h4 className='educare-chart-title'>Month wise fees collection</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <MonthFeesCollectionChart
                    monthWiseFeeCollection={monthWiseFeeCollection}
                />
            </div>
        </div>
    );
};

export default MonthFeesCollection;
