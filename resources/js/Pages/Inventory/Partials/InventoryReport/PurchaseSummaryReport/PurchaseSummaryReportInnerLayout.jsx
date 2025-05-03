import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import PurchaseSummaryReportTables from "./PurchaseSummaryReportTables";

const PurchaseSummaryReportInnerLayout = ({
    purchaseSummaryReport
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
                    <PurchaseSummaryReportTables
                        purchaseSummaryReport={purchaseSummaryReport}
                    />
                </div>
            </div>
        </div>
    );
};

export default PurchaseSummaryReportInnerLayout;
