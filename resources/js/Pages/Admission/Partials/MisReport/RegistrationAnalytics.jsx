import RegistrationAnalyticsChart from "./AdmissionsCharts/RegistrationAnalyticsChart";

const RegistrationAnalytics = ({
    last7DaysRegistrationAnalysis
}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-6">
                <h4 className='educare-chart-title'>Last 7 Days Registration Analysis</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <RegistrationAnalyticsChart
                    last7DaysRegistrationAnalysis={last7DaysRegistrationAnalysis}
                />
            </div>
        </div>
    );
};

export default RegistrationAnalytics;
