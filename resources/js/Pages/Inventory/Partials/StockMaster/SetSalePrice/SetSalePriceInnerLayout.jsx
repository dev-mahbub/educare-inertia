import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import SetSalePriceTables from "./SetSalePriceTables";


const SetSalePriceInnerLayout = ({
    productNames,
    product,
    username,
    salePriceProduct,
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
                     <SetSalePriceTables
                        productNames={productNames}
                        product={product}
                        username={username}
                        salePriceProduct={salePriceProduct}
                     />
                </div>
            </div>
        </div>
    );
};

export default SetSalePriceInnerLayout;
