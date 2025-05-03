import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import SaleGroupForm from "./SaleGroupForm";

const SaleGroupInnerLayout = ({
    saleGroups,
    products,
 }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SaleGroupForm
                        saleGroups={saleGroups}
                        products={products}
                    />
                </div>
            </div>
        </div>
    );
};

export default SaleGroupInnerLayout;
