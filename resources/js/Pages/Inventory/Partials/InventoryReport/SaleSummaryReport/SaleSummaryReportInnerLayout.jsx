import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import SaleSummaryReportTables from "./SaleSummaryReportTables";


const SaleSummaryReportInnerLayout = ({
    saleSummaryReport
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
                   <SaleSummaryReportTables
                        saleSummaryReport={saleSummaryReport}
                   />
                </div>
            </div>
        </div>
    );
};

export default SaleSummaryReportInnerLayout;
