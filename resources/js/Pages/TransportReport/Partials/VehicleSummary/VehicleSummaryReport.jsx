import React from 'react';
import { useState } from 'react';
import VehicleSummaryStudentList from './VehicleSummaryStudentList';
import VehicleSummaryList from './VehicleSummaryList';

const VehicleSummaryReport = ({
    routeDetails,
    studentData,
}) => {
    const [loading, setLoading] = useState(false);
    const [selectedVehicleData, setSelectedVehicleData] = useState({});
    return (
        <div className='grid grid-cols-12 gap-5'>
            <div className="col-span-12 lg:col-span-4">
                <VehicleSummaryList
                    routeDetails={routeDetails}
                    setLoading={setLoading}
                />
            </div>
            <div className="col-span-12 lg:col-span-8">
                <VehicleSummaryStudentList
                    studentData={studentData}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
        </div>
    );
};

export default VehicleSummaryReport;
