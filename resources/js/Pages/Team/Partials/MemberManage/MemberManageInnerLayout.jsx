import TeamHeaderMenus from "@/Components/Partials/Menus/Team/TeamHeaderMenus";
import React from "react";
import MemberManageMain from "./MemberManageMain";
const MemberManageInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <TeamHeaderMenus title="TEAM MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                       <MemberManageMain />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberManageInnerLayout;
