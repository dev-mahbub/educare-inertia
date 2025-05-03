import SchoolGrowthAnalyticsChart from "./AdmissionsCharts/SchoolGrowthAnalyticsChart";

const SchoolGrowthAnalytics = ({
    sessionWiseRegistrations
 }) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-6">
                <h4 className='educare-chart-title'>School growth analytics - Admisison wise</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <SchoolGrowthAnalyticsChart
                    sessionWiseRegistrations={sessionWiseRegistrations}
                />
            </div>
        </div>
    );
};

export default SchoolGrowthAnalytics;
