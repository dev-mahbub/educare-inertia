import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import InfraLevelForm from "./InfraLevelForm";

const InfraLevelInnerLayout = ({infraLevels, childLevels, infraLavelIds, infraLavelIdString, currentLavelId, is_open}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <InfraLevelForm
                        infraLevels={infraLevels}
                        childLevels={childLevels}
                        infraLavelIds={infraLavelIds}
                        infraLavelIdString={infraLavelIdString}
                        currentLavelId={currentLavelId}
                        is_open={is_open}
                    />
                </div>
            </div>
        </div>
    );
};

export default InfraLevelInnerLayout;
