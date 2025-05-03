import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import GroupSummaryReportTables from "./GroupSummaryReportTables";


const GroupSummaryReportInnerLayout = ({
    accountGroups,
    groupSummary
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
                    <GroupSummaryReportTables
                        accountGroups={accountGroups}
                        groupSummary={groupSummary}
                    />
                </div>
            </div>
        </div>
    );
};

export default GroupSummaryReportInnerLayout;
