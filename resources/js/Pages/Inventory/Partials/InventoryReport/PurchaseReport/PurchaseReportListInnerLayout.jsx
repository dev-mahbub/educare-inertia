import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import PurchaseReportFilter from "./PurchaseReportFilter";
import PurchaseReportTable from "./PurchaseReportTable";
import PurchaseReportTopbar from "./PurchaseReportTopbar";

const PurchaseReportListInnerLayout = ({
    purchaseReport,
    partyAccountNames,
 }) => {
    const [loading, setLoading] = useState(false);

    const {
        data,
        setData
    } = useForm({
        start_date: new Date(),
        end_date: new Date(),
        party_account_id: "",
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
                    <PurchaseReportTopbar
                        formData={data}
                        purchaseReportLength={purchaseReport.length}
                    />
                    <PurchaseReportFilter
                        partyAccountNames={partyAccountNames}
                        purchaseReportLength={purchaseReport.length}
                        setLoading={setLoading}
                        data={data}
                        setData={setData}
                    />
                    <PurchaseReportTable
                        purchaseReport={purchaseReport}
                        loading={loading}
                        setLoading={setLoading}
                        formData={data}
                    />
                </div>
            </div>
        </div>
    );
};

export default PurchaseReportListInnerLayout;
