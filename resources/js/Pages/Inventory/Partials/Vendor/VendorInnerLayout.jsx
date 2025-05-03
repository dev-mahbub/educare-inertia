import React from "react";
import CategoryProductForm from "./VendorForm";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import UomForm from "./VendorForm";
import VendorForm from "./VendorForm";

const VendorInnerLayout = ({proVendors}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <VendorForm
                        proVendors={proVendors}
                    />
                </div>
            </div>
        </div>
    );
};

export default VendorInnerLayout;
