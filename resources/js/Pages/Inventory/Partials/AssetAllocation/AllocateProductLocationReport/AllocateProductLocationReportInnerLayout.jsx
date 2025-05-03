import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import AllocateProductLocationReportFilter from "./AllocateProductLocationReportFilter";
import AllocateProductLocationReportTable from "./AllocateProductLocationReportTable";


const AllocateProductLocationReportInnerLayout = ({
    productLocationReport,
    products,
    statusArray
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
                     <AllocateProductLocationReportFilter
                        productLocationReport={productLocationReport}
                        products={products}
                        statusArray={statusArray}
                     />
                     <AllocateProductLocationReportTable
                        productLocationReport={productLocationReport}
                     />
                </div>
            </div>
        </div>
    );
};

export default AllocateProductLocationReportInnerLayout;
