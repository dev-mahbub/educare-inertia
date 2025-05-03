import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import LedgerSearchList from "./LedgerSearchList";

const LedgerSearchListLedgerInnerLayout = ({
    ledgers,
    accountGroupTitles,
    ledgerAmountArr,
    accountId,
    search,
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
                    <LedgerSearchList
                        ledgers={ledgers}
                        accountGroupTitles={accountGroupTitles}
                        ledgerAmountArr={ledgerAmountArr}
                        accountId={accountId}
                        search={search}
                    />
                </div>
            </div>
        </div>
    );
};

export default LedgerSearchListLedgerInnerLayout;
