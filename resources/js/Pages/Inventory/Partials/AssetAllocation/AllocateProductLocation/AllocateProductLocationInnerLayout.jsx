import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import AllocateProductLocationTabels from "./AllocateProductLocationTabels";


const AllocateProductLocationInnerLayout = ({
    products,
    infraLevels
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
                    <AllocateProductLocationTabels
                        products={products}
                        infraLevels={infraLevels}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllocateProductLocationInnerLayout;
