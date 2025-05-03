import React from "react";
import CategoryProductForm from "./UomForm";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import UomForm from "./UomForm";

const UomInnerLayout = ({uoms}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <UomForm
                        uoms={uoms}
                    />
                </div>
            </div>
        </div>
    );
};

export default UomInnerLayout;
