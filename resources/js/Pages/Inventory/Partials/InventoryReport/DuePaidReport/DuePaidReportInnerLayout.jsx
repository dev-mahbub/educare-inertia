import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import DuePaidReportList from "./DuePaidReportList";

const DuePaidReportInnerLayout = ({
    dueReportForStudent,
    paidReportForStudent,
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
                    <DuePaidReportList
                        dueReportForStudent={dueReportForStudent}
                        paidReportForStudent={paidReportForStudent}
                    />
                </div>
            </div>
        </div>
    );
};

export default DuePaidReportInnerLayout;
