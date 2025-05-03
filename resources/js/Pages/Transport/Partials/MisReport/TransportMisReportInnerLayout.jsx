import React from 'react';
import TransportMisQuickReport from './TransportMisQuickReport';
import ClassTransportAnalyticsGraph from './ClassTransportAnalyticsGraph';
import AreaTransportAnalyticsGraph from './AreaTransportAnalyticsGraph';
import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';

const TransportMisReportInnerLayout = ({ transports, misCounts, classroomTransports, areaTransports }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    <TransportHeaderMenus title="Manage Transportation" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TransportMisQuickReport
                        transports={transports}
                        misCounts={misCounts} />
                    <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                        <div className="col-span-12">
                            <ClassTransportAnalyticsGraph classroomTransports={classroomTransports} />
                        </div>
                        <div className="col-span-12">
                            <AreaTransportAnalyticsGraph areaTransports={areaTransports} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransportMisReportInnerLayout;
