import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import RegSourceReportList from './RegSourceReportList';

const RegSourceReportInnerLayout = ({
    registrationByReport,
    sourceByReport
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <RegSourceReportList
                        registrationByReport={registrationByReport}
                        sourceByReport={sourceByReport}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegSourceReportInnerLayout;
