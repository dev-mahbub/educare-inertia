import DaysCollectionAnalyticsChart from "./AdmissionsCharts/DaysCollectionAnalyticsChart";

const DaysCollectionAnalytics = ({
    last7DaysCollectionAnalysis
}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-2">
            <div className="educare-card-header mb-[20px] px-6">
                <h4 className='educare-chart-title'>Last 7 Days Collection Analysis</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <DaysCollectionAnalyticsChart
                    last7DaysCollectionAnalysis={last7DaysCollectionAnalysis}
                />
            </div>
        </div>
    );
};

export default DaysCollectionAnalytics;
