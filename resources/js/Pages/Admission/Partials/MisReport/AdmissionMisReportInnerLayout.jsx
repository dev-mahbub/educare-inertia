import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import AdmissionMisQuickReport from './AdmissionMisQuickReport';
import AdmissionMisRegReport from './AdmissionMisRegReport';
import DaysCollectionAnalytics from './DaysCollectionAnalytics';
import RegistrationAnalytics from './RegistrationAnalytics';
import SchoolGrowthAnalytics from './SchoolGrowthAnalytics';

const AdmissionMisReportInnerLayout = ({
    totalAdmissions,
    totalRegistrations,
    todayRegistrations,
    todayAdmissions,
    sessionWiseRegistrations,
    last7DaysRegistrationAnalysis,
    last7DaysCollectionAnalysis,
    classWiseRegistrationSummary
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    <AdmissionHeaderMenus title="Manage Enrollment" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AdmissionMisQuickReport
                        totalAdmissions={totalAdmissions}
                        totalRegistrations={totalRegistrations}
                        todayRegistrations={todayRegistrations}
                        todayAdmissions={todayAdmissions}
                    />
                    <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                            <AdmissionMisRegReport
                                classWiseRegistrationSummary={classWiseRegistrationSummary}
                            />
                        </div>
                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-6 maxSm:col-span-12">
                            <SchoolGrowthAnalytics
                                sessionWiseRegistrations ={sessionWiseRegistrations}
                            />
                        </div>
                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-6 maxSm:col-span-12">
                            <RegistrationAnalytics
                                last7DaysRegistrationAnalysis={last7DaysRegistrationAnalysis}
                            />
                        </div>
                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                            <DaysCollectionAnalytics
                                last7DaysCollectionAnalysis={last7DaysCollectionAnalysis}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmissionMisReportInnerLayout;
