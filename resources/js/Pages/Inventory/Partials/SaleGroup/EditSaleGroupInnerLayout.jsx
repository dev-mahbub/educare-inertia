import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import EditSaleGroupForm from "./EditSaleGroupForm";

const EditSaleGroupInnerLayout = ({
    saleGroups,
    products,
    saleGroup,
    saleGroupProducts,
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
                    <EditSaleGroupForm
                        saleGroups={saleGroups}
                        products={products}
                        saleGroup={saleGroup}
                        saleGroupProducts={saleGroupProducts}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditSaleGroupInnerLayout;
