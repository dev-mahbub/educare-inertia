import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import DateWisePaymentReceiptForm from "./DateWisePaymentReceiptForm";
import DateWisePaymentTable from "./DateWisePaymentTable";

const DateWisePaymentReceiptInnerLayout = ({
    paymentTypes,
    ledgers,
    headWisePaymentReport,
    ledgerTitles,
    headWiseSummary
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
                    <DateWisePaymentReceiptForm
                        paymentTypes={paymentTypes}
                        ledgers={ledgers}
                        headWisePaymentReport={headWisePaymentReport}
                    />
                    <DateWisePaymentTable
                        headWisePaymentReport={headWisePaymentReport}
                        ledgerTitles={ledgerTitles}
                        headWiseSummary={headWiseSummary}
                    />
                </div>
            </div>
        </div>
    );
};

export default DateWisePaymentReceiptInnerLayout;
