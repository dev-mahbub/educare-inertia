import React from "react";
import CategoryProductForm from "./CategoryProductForm";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";

const CategoryProductInnerLayout = ({categories, proParentCats }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CategoryProductForm
                        categories={categories}
                        proParentCats={proParentCats}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryProductInnerLayout;
