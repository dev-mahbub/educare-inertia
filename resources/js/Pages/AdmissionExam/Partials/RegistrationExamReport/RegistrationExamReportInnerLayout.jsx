import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import RegistrationExamReportFilter from "./RegistrationExamReportFilter";
import RegistrationExamReportFilterTopbar from "./RegistrationExamReportFilterTopbar";
import RegistrationExamReportTable from "./RegistrationExamReportTable";



const RegistrationExamReportInnerLayout = ({
    statusArray,
    academicYears,
    classNames,
    academicYearId,
    registrationExamReport
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
                    <RegistrationExamReportFilterTopbar />
                    <RegistrationExamReportFilter
                        statusArray={statusArray}
                        academicYears={academicYears}
                        classNames={classNames}
                        academicYearId={academicYearId}
                        registrationExamReport={registrationExamReport}
                    />
                    <RegistrationExamReportTable
                        registrationExamReport = {registrationExamReport}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrationExamReportInnerLayout;
