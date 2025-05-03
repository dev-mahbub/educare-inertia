import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import ProductReturnForm from "./ProductReturnForm";

const ProductReturnInnerLayout = ({
    allocationStaffs,
    allocationProducts
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
                    <ProductReturnForm
                        allocationStaffs={allocationStaffs}
                        allocationProducts={allocationProducts}
                     />
                </div>
            </div>
        </div>
    );
};

export default ProductReturnInnerLayout;
