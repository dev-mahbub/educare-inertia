import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";

import { useState } from "react";
import RegistrationDailyCollectionFilter from "./RegistrationDailyCollectionFilter";
import RegistrationDailyCollectionFilterTopbar from "./RegistrationDailyCollectionFilterTopbar";
import RegistrationDailyCollectionTable from "./RegistrationDailyCollectionTable";

const RegistrationDailyCollectionInnerLayout = ({
    registrationReport,
    academicYears
}) => {

    const [params, setParams] = useState({});

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                   <RegistrationDailyCollectionFilterTopbar
                        params={params}
                        registrationReport={registrationReport}
                    />
                   <RegistrationDailyCollectionFilter
                        registrationReport={registrationReport}
                        academicYears={academicYears}
                        params={params}
                        setParams={setParams}
                        formatNumber={formatNumber}
                   />
                    <RegistrationDailyCollectionTable
                        registrationReport={registrationReport}
                        formatNumber={formatNumber}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrationDailyCollectionInnerLayout;
