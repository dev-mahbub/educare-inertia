import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import SaleReturnReportFilter from "./SaleReturnReportFilter";
import SaleReturnReportTable from "./SaleReturnReportTable";

const SaleReturnReportInnerLayout = ({ saleReturnReport }) => {
    const [loading, setLoading] = useState(false);

    const {
        data,
        setData
    } = useForm({
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
                    <SaleReturnReportFilter
                        setLoading={setLoading}
                        saleReturnLength={saleReturnReport.length}
                        data={data}
                        setData={setData}
                    />
                    <SaleReturnReportTable
                        saleReturnReport={saleReturnReport}
                        loading={loading}
                        setLoading={setLoading}
                        formData={data}
                    />
                </div>
            </div>
        </div>
    );
};

export default SaleReturnReportInnerLayout;
