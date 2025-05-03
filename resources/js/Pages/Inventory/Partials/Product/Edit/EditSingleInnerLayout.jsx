import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import CreateSingleForm from "./EditSingleForm";
import EditSingleForm from "./EditSingleForm";

const EditSingleInnerLayout = ({
    product,
    products,
    proCats,
    proSubCats,
    uomTitles,
    productArrType
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
                    <EditSingleForm
                        product={product}
                        products={products}
                        proCats={proCats}
                        proSubCats={proSubCats}
                        uomTitles={uomTitles}
                        productArrType={productArrType}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditSingleInnerLayout;
