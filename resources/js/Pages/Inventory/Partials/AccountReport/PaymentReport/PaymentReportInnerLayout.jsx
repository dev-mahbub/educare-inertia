import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import PaymentReportList from "./PaymentReportList";

const PaymentReportInnerLayout = ({
    paymentReport,
    paymentModes
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
                    <PaymentReportList
                        paymentReport={paymentReport}
                        paymentModes={paymentModes}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentReportInnerLayout;
