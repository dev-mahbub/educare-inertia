import TransportHeaderMenus from "@/Components/Partials/Menus/Transport/TransportHeaderMenus";
import React from "react";
import DriverLogBook from "./DriverLogBook";

const DriverLogBookInnerLayout = ({
    stoppageData,
    vehicleData,
    driverLogBooks,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <DriverLogBook
                        stoppageData={stoppageData}
                        vehicleData={vehicleData}
                        driverLogBooks={driverLogBooks}
                    />
                </div>
            </div>
        </div>
    );
};

export default DriverLogBookInnerLayout;
