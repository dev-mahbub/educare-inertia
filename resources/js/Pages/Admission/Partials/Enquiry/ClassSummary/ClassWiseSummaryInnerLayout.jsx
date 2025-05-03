import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import ClassSummaryList from './ClassSummaryList';

const ClassWiseSummaryInnerLayout = ({
    classWiseAdmissionSummary
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
                    <ClassSummaryList
                        classWiseAdmissionSummary={classWiseAdmissionSummary}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassWiseSummaryInnerLayout;
