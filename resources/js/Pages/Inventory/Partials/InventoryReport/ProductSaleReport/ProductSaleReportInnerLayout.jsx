import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useEffect, useState } from "react";
import ProductSaleReportFilter from "./ProductSaleReportFilter";
import ProductSaleReportList from "./ProductSaleReportList";

const ProductSaleReportInnerLayout = ({
    ledgerSummary,
    categories,
    products,
    partyTypes
}) => {
    const [ledgerSummaryData, setLedgerSummaryData] = useState(ledgerSummary);
    const [ledgerSummaryItemData, setLedgerSummaryItemData] = useState([]);
    const [partyType, setPartyType] = useState('Student');


    useEffect(() => {
        setLedgerSummaryData(ledgerSummary);
    }, [ledgerSummary]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ProductSaleReportFilter
                        categories={categories}
                        products={products}
                        partyTypes={partyTypes}
                        setPartyType={setPartyType}
                        setLedgerSummaryData={setLedgerSummaryData}
                        setLedgerSummaryItemData={setLedgerSummaryItemData}
                    />
                    <ProductSaleReportList
                        ledgerSummary={ledgerSummary}
                        partyType={partyType}
                        ledgerSummaryData={ledgerSummaryData}
                        ledgerSummaryItemData={ledgerSummaryItemData}
                        setLedgerSummaryItemData={setLedgerSummaryItemData}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductSaleReportInnerLayout;
