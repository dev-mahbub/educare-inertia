import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import ProductReportList from "./ProductReportList";

const ProductReportInnerLayout = ({
    proCats,
    subProCats,
    productArrType,
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
                    <ProductReportList
                        proCats={proCats}
                        subProCats={subProCats}
                        productArrType={productArrType}
                        products={products}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductReportInnerLayout;
