import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import { useState } from "react";
import DailyAdmissionReportFilter from "./DailyAdmissionReportFilter";
import DailyAdmissionReportFilterTopbar from "./DailyAdmissionReportFilterTopbar";
import DailyAdmissionReportTable from "./DailyAdmissionReportTable";

const DailyAdmissionReportInnterLayout = ({
    academicYears,
    dailyAdmissionReport
}) => {

    const [params, setParams] = useState({});

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <DailyAdmissionReportFilterTopbar
                        dailyAdmissionReport={dailyAdmissionReport}
                        params={params}
                    />
                    <DailyAdmissionReportFilter
                        academicYears={academicYears}
                        setParams={setParams}
                    />
                    <DailyAdmissionReportTable
                        dailyAdmissionReport={dailyAdmissionReport}
                    />
                </div>
            </div>
        </div>
    );
};

export default DailyAdmissionReportInnterLayout;
