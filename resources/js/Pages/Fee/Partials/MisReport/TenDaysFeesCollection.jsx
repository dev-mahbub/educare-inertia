import TenDaysFeesCollectionChart from "./FeeCharts/TenDaysFeesCollectionChart";

const TenDaysFeesCollection = ({
    lastTenDaysFeeCollection = []
}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-6">
                <h4 className='educare-chart-title'>Last 10 days Fees Collection</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <TenDaysFeesCollectionChart
                    lastTenDaysFeeCollection={lastTenDaysFeeCollection}
                />
            </div>
        </div>
    );
};

export default TenDaysFeesCollection;
