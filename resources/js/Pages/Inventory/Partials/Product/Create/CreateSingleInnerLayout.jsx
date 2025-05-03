import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import CreateSingleForm from "./CreateSingleForm";

const CreateSingleInnerLayout = ({ products, proCats, uomTitles, productArrType, proSubCats }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateSingleForm
                        products={products}
                        proCats={proCats}
                        uomTitles={uomTitles}
                        productArrType={productArrType}
                        proSubCats={proSubCats}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateSingleInnerLayout;
