import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import SaleRegisterReportFilter from "./SaleRegisterReportFilter";
import SaleRegisterReportTable from "./SaleRegisterReportTable";

const SaleRegisterReportInnerLayout = ({
    saleReport,
    ledgers,
    paymentModeSummary,
    takenBySummary
}) => {
    const [loading, setLoading] = useState(false);

    const {
        data,
        setData
    } = useForm({
        ledger_id: "",
        start_date: new Date(),
        end_date: new Date(),
        search_value: "",
    });

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SaleRegisterReportFilter
                        setLoading={setLoading}
                        saleReportLength={saleReport.length}
                        ledgers={ledgers}
                        data={data}
                        setData={setData}
                    />
                    <SaleRegisterReportTable
                        saleReport={saleReport}
                        loading={loading}
                        setLoading={setLoading}
                        formData={data}
                        paymentModeSummary={paymentModeSummary}
                        takenBySummary={takenBySummary}
                    />
                </div>
            </div>
        </div>
    );
};

export default SaleRegisterReportInnerLayout;
