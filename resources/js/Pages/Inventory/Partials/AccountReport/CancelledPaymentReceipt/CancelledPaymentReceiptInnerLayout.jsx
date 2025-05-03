import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import CancelledPaymentReceiptFilter from "./CancelledPaymentReceiptFilter";
import CancelledPaymentReceiptTable from "./CancelledPaymentReceiptTable";

const CancelledPaymentReceiptInnerLayout = ({
    paymentTypes,
    paymentReport
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
                    <CancelledPaymentReceiptFilter
                        paymentTypes={paymentTypes}
                        paymentReport={paymentReport}
                    />
                    <CancelledPaymentReceiptTable
                        paymentReport={paymentReport}
                    />
                </div>
            </div>
        </div>
    );
};

export default CancelledPaymentReceiptInnerLayout;
