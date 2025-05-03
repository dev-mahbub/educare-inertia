import React from "react";
import EditSchoolForm from "./EditSchoolForm";
import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";

const EditSchoolInnerLayout = ({
    school,
    timezones,
    countries,
    states,
    boards,
    durations,
    academicYears,
    image,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <AdmissionHeaderMenus title="Edit School" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditSchoolForm
                        school={school}
                        timezones={timezones}
                        countries={countries}
                        states={states}
                        boards={boards}
                        durations={durations}
                        academicYears={academicYears}
                        imageData={image}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditSchoolInnerLayout;
