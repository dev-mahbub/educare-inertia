import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useState } from "react";
import ProductTransactionReportFilter from "./ProductTransactionReportFilter";
import PTRPurchaseReportTable from "./PTRPurchaseReportTable";
import PTRSalesReportTable from "./PTRSalesReportTable";

const ProductTransactionReportInnerLayout = ({
    transactionPurchaseReport,
    sumOpeningStock,
    productNames,
    transactionSaleReport,
    availableStock
}) => {

    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ProductTransactionReportFilter
                        sumOpeningStock={sumOpeningStock}
                        productNames={productNames}
                        setLoading={setLoading}
                        availableStock={availableStock}
                        setParams={setParams}
                    />
                    <PTRPurchaseReportTable
                        transactionPurchaseReport={transactionPurchaseReport}
                        loading={loading}
                        setLoading={setLoading}
                        params={params}
                    />
                    <PTRSalesReportTable
                        transactionSaleReport={transactionSaleReport}
                        loading={loading}
                        setLoading={setLoading}
                        params={params}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductTransactionReportInnerLayout;
