import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import CreateProductionForm from "./CreateProductionForm";

const CreateProductionInnerLayout = ({ products, productTitles, vendorTitles }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateProductionForm
                        products={products}
                        productTitles={productTitles}
                        vendorTitles={vendorTitles}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateProductionInnerLayout;
