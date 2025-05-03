import AudiencewiseReportList from './AudiencewiseReportList';
import AudiencwiseFilter from './AudiencwiseFilter';

const AudiencewiseReportLayout = ({
    surveys,
    audienceTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AudiencwiseFilter
                        surveys={surveys}
                        audienceTypes={audienceTypes}
                    />
                    <AudiencewiseReportList
                        surveys={surveys}
                    />
                </div>
            </div>
        </div>
    );
};

export default AudiencewiseReportLayout;
