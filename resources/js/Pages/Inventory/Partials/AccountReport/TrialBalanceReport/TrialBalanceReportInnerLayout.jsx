import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import TrialBalanceReportTables from "./TrialBalanceReportTables";

const TrialBalanceReportInnerLayout = ({
    accountGroupSummary
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
                    <TrialBalanceReportTables
                        accountGroupSummary={accountGroupSummary}
                    />
                </div>
            </div>
        </div>
    );
};

export default TrialBalanceReportInnerLayout;
