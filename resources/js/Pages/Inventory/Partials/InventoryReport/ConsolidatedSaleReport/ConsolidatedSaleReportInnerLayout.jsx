import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useMemo, useState } from "react";
import ConsolidatedSaleReportFilter from "./ConsolidatedSaleReportFilter";
import ConsolidatedSaleReportList from "./ConsolidatedSaleReportList";
import ConsolidatedSaleReportListTable from "./ConsolidatedSaleReportListTable";

const ConsolidatedSaleReportInnerLayout = ({
    consolidatedSaleReport,
    consolidatedSaleSummary
}) => {

    const [filterText, setFilterText] = useState("");

    const filteredConsolidatedSaleReport = useMemo(() => {
        return consolidatedSaleReport?.filter(item => {
            const inputText = filterText?.toLowerCase()?.trim();
            const invoiceNo = String(item?.invoice_no)?.toLowerCase();
            const saleDate = item?.sale_date?.toLowerCase();
            const admissionNo = item?.admission_no?.toLowerCase();
            const name = item?.name?.toLowerCase();
            const classroomTitle = item?.classroom_title?.toLowerCase();
            const paymentMode = item?.payment_mode?.toLowerCase();
            const saleAmount = String(item?.sale_amount)?.toLowerCase();
            const saleReturnAmount = String(item?.sale_return_amount)?.toLowerCase();

            return (invoiceNo && invoiceNo.includes(inputText)) ||
                (saleDate && saleDate.includes(inputText)) ||
                (admissionNo && admissionNo.includes(inputText)) ||
                (name && name.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (paymentMode && paymentMode.includes(inputText)) ||
                (saleAmount && saleAmount.includes(inputText)) ||
                (saleReturnAmount && saleReturnAmount.includes(inputText));
        });
    }, [consolidatedSaleReport, filterText]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ConsolidatedSaleReportFilter
                        setFilterText={setFilterText}
                        consolidatedSaleReport={filteredConsolidatedSaleReport}
                    />
                    <ConsolidatedSaleReportList
                        consolidatedSaleReport={filteredConsolidatedSaleReport}
                    />
                    <ConsolidatedSaleReportListTable
                        consolidatedSaleSummary={consolidatedSaleSummary}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConsolidatedSaleReportInnerLayout;
