import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import LocationProductListTables from "./LocationProductListTables";


const LocationProductListInnerLayout = ({
    locationWiseProductReport,
    infraLevels,
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
                  <LocationProductListTables
                        locationWiseProductReport={locationWiseProductReport}
                        infraLevels={infraLevels}
                        statusArray={statusArray}
                  />
                </div>
            </div>
        </div>
    );
};

export default LocationProductListInnerLayout;
