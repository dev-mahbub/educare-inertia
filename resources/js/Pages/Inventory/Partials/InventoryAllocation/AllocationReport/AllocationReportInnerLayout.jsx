import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import AllocationReportFilter from "./AllocationReportFilter";
import AllocationReportTable from "./AllocationReportTable";

const AllocationReportInnerLayout = ({
    allocationProductReports,
    auth,
}) => {

    const [loading, setLoading] = useState(false);

    const {
        data,
        setData
    } = useForm({
        search_value: "",
        start_date: "",
        end_date: "",
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
                    <AllocationReportFilter
                        setLoading={setLoading}
                        allocationProductLength={allocationProductReports.length}
                        data={data}
                        setData={setData}
                    />
                    <AllocationReportTable
                        allocationProductReports={allocationProductReports}
                        auth={auth}
                        loading={loading}
                        setLoading={setLoading}
                        data={data}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllocationReportInnerLayout;
