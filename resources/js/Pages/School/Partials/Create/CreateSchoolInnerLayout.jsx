import React from "react";
import CreateSchoolForm from "./CreateSchoolForm";
import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";

const CreateSchoolInnerLayout = ({ timezones, countries, states, boards, durations, academicYears }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <AdmissionHeaderMenus title="Create School" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateSchoolForm
                        timezones={timezones}
                        countries={countries}
                        states={states}
                        boards={boards}
                        durations={durations}
                        academicYears={academicYears}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateSchoolInnerLayout;
