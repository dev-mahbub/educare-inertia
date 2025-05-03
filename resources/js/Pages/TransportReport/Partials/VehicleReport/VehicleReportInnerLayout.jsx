import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import React, { useState } from 'react';
import VehicleReportFilter from './VehicleReportFilter';
import VehicleStudentReport from './VehicleStudentReport';
import VehicleTeacherReport from './VehicleTeacherReport';

const VehicleReportInnerLayout = ({
    studentData,
    teacherData,
    vehicleData,
    routeData,
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
                    <VehicleReportFilter
                        vehicleData={vehicleData}
                        routeData={routeData}
                        setLoading={setLoading}
                        studentCount={studentData?.length}
                    />
                    <VehicleStudentReport
                        studentData={studentData}
                        loading={loading}
                        setLoading={setLoading}
                    />
                    <VehicleTeacherReport
                        teacherData={teacherData}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default VehicleReportInnerLayout;
