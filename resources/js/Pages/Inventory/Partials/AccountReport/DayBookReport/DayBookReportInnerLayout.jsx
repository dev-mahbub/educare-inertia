import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useState } from "react";
import DayBookReportFilter from "./DayBookReportFilter";
import DayBookReportTable from "./DayBookReportTable";

const DayBookReportInnerLayout = ({
    dayBookReport
}) => {

    const [filterText, setFilterText] = useState("");

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <DayBookReportFilter
                        dayBookReport={dayBookReport}
                        setFilterText={setFilterText}
                    />
                    <DayBookReportTable
                        dayBookReport={dayBookReport}
                        filterText={filterText}
                    />
                </div>
            </div>
        </div>
    );
};

export default DayBookReportInnerLayout;
