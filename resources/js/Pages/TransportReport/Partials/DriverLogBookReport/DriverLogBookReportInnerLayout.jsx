import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import React, { useState } from 'react';
import DriverLogBookReportFilter from './DriverLogBookReportFilter';
import DriverLogBookReportTable from './DriverLogBookReportTable';

const DriverLogBookReportInnerLayout = ({
    vehicleData,
    driverLogBooks,
}) => {
    const [loading, setLoading] = useState(false);
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <DriverLogBookReportFilter
                        vehicleData={vehicleData}
                        setLoading={setLoading}
                    />
                    <DriverLogBookReportTable
                        driverLogBooks={driverLogBooks}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default DriverLogBookReportInnerLayout;
