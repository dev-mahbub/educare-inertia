import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import React, { useState } from 'react';
import TeacherTransportReportFilter from './TeacherTransportReportFilter';
import TeacherTransportReportList from './TeacherTransportReportList';

const TeacherTransportReportInnerLayout = ({
    routeData,
    teacherData,
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
                    <TeacherTransportReportFilter
                        routeData={routeData}
                        setLoading={setLoading}
                    />
                    <TeacherTransportReportList
                        teacherData={teacherData}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherTransportReportInnerLayout;
