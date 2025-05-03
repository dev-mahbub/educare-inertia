import React, { useState } from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import AllocationReturnReportFilter from "./AllocationReturnReportFilter";
import AllocationReturnReportTable from "./AllocationReturnReportTable";

const AllocationReturnReportInnerLayout = ({
    allocationReturnProducts,
}) => {

    const [loading, setLoading] = useState(false);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AllocationReturnReportFilter
                        setLoading={setLoading}
                        returnProductLength = {allocationReturnProducts.length}
                    />
                    <AllocationReturnReportTable
                        allocationReturnProducts={allocationReturnProducts}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllocationReturnReportInnerLayout;
