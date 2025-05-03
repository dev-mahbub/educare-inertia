import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import CashBookReportForm from "./CashBookReportForm";

const CashBookReportInnerLayout = ({
    cashBookReport,
    cashBookSummary
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
                    <CashBookReportForm
                        cashBookReport={cashBookReport}
                        cashBookSummary={cashBookSummary}
                    />
                </div>
            </div>
        </div>
    );
};

export default CashBookReportInnerLayout;
