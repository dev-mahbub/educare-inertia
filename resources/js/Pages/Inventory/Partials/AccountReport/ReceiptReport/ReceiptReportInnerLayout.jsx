import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import ReceiptReportList from "./ReceiptReportList";

const ReceiptReportInnerLayout = ({
    receiptReport,
    ledgerTitles,
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
                    <ReceiptReportList
                        receiptReport={receiptReport}
                        ledgerTitles={ledgerTitles}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReceiptReportInnerLayout;
