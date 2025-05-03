import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import AdmissionExamSummaryList from './AdmissionExamSummaryList';

const AdmissionExamSummaryInnerLayout = ({
    boarding,
    admissionExamSummary,
    registrations
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        {/* <FeeHeaderMenus title="Fee Management" /> */}
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AdmissionExamSummaryList
                        boarding = {boarding}
                        admissionExamSummary={admissionExamSummary}
                        registrations={registrations}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdmissionExamSummaryInnerLayout;
