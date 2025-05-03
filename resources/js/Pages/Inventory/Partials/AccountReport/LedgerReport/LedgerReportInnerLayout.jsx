import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useMemo, useState } from "react";
import LedgerReportFilter from "./LedgerReportFilter";
import LedgerReportTable from "./LedgerReportTable";


const LedgerReportInnerLayout = ({
    ledgers,
    ledgerReport,
    openingBalance,
    amountType
}) => {
    const [filterText, setFilterText] = useState("");

    const filteredLedgerReport = useMemo(() => {
        const inputText = filterText?.toLowerCase()?.trim();

        return ledgerReport?.filter((item) => {
            const date = item?.date?.toLowerCase();
            const ledgerTitle = item?.ledger_title?.toLowerCase();
            const voucherType = item?.voucher_type?.toLowerCase();
            const voucherNo = String(item?.receipt_no)?.toLowerCase();
            const description = item?.description?.toLowerCase();
            const debit = String(item?.debit);
            const credit = String(item?.credit);

            return (
                date?.includes(inputText) ||
                ledgerTitle?.includes(inputText) ||
                voucherType?.includes(inputText) ||
                voucherNo?.includes(inputText) ||
                description?.includes(inputText) ||
                debit?.includes(inputText) ||
                credit?.includes(inputText)
            );
        });
    }, [filterText, ledgerReport]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                   <LedgerReportFilter
                        ledgers={ledgers}
                        ledgerReport={ledgerReport}
                        setFilterText={setFilterText}
                   />
                   <LedgerReportTable
                        ledgerReport={ledgerReport}
                        openingBalance={openingBalance}
                        amountType={amountType}
                        filteredLedgerReport={filteredLedgerReport}
                   />
                </div>
            </div>
        </div>
    );
};

export default LedgerReportInnerLayout;
