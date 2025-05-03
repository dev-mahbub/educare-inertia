import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import EditLedgerForm from "./EditLedgerForm";

const EditLedgerInnerLayout = ({
    ledger,
    ledgers,
    accountGroupTitles,
    ledgerAmountArr,
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
                    <EditLedgerForm
                        ledger={ledger}
                        ledgers={ledgers}
                        accountGroupTitles={accountGroupTitles}
                        ledgerAmountArr={ledgerAmountArr}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditLedgerInnerLayout;
