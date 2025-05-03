import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import AllocationSummaryTables from "./AllocationSummaryTables";

const AllocationSummaryInnerLayout = ({
    allocationSummary
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
                    <AllocationSummaryTables
                        allocationSummary={allocationSummary}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllocationSummaryInnerLayout;
