import React from 'react';
import AreaTransportAnalyticsChart from "./TransportCharts/AreaTransportAnalyticsChart";

const AreaTransportAnalytics = ({areaTransports}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-6">
                <h4 className='educare-chart-title'>Area Wise Transport Analysis</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="area-wise-chart">
                <AreaTransportAnalyticsChart areaTransports={areaTransports} />
            </div>
        </div>
    );
};

export default AreaTransportAnalytics;