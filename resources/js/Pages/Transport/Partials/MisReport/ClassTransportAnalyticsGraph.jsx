import React from 'react';
import ClassTransportAnalyticsChart from "./TransportCharts/ClassTransportAnalyticsChart";

const ClassTransportAnalyticsGraph = ({classroomTransports}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-5">
            <div className="educare-card-header mb-[20px] px-6">
                <h4 className='educare-chart-title'>Class Wise Transport Analysis</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="class-wise-chart">
                <ClassTransportAnalyticsChart classroomTransports={classroomTransports} />
            </div>
        </div>
    );
};

export default ClassTransportAnalyticsGraph;