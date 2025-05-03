import React from 'react';
import HostelHeaderMenus from "@/Components/Partials/Menus/Hostel/HostelHeaderMenus";
import SetupHostelTables from "./SetupHostelTables"
const SetupHostelInnerLayout = ({
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
    hostelStaffArr,
    teacherData,
    hostelStaffDetails,
    roomTypeData,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <HostelHeaderMenus title="HOSTEL MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <SetupHostelTables
                            infraLevels={infraLevels}
                            childLevels={childLevels}
                            infraLavelIds={infraLavelIds}
                            infraLavelIdString={infraLavelIdString}
                            currentLavelId={currentLavelId}
                            is_open={is_open}
                            type={type}
                            hostelStaffArr={hostelStaffArr}
                            teacherData={teacherData}
                            hostelStaffDetails={hostelStaffDetails}
                            roomTypeData={roomTypeData}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetupHostelInnerLayout;
