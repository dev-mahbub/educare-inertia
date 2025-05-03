import { useState } from 'react';
import AreaWiseSummaryList from './AreaWiseSummaryList';
import AreaWiseSummaryStudentList from './AreaWiseSummaryStudentList';

const AreaWiseSummaryReport = ({
    areaData,
    areaName,
    studentData,
}) => {

    const [loading, setLoading] = useState(false);
    const [selectedArea, setSelectedArea] = useState({});

    return (
        <div className='grid grid-cols-12 gap-5'>
            <div className="col-span-12 lg:col-span-4">
                <AreaWiseSummaryList
                    areaData={areaData}
                    setLoading={setLoading}
                    setSelectedArea={setSelectedArea}
                />
            </div>
            <div className="col-span-12 lg:col-span-8">
                <AreaWiseSummaryStudentList
                    areaName={areaName}
                    studentData={studentData}
                    loading={loading}
                    setLoading={setLoading}
                    selectedArea={selectedArea}
                />
            </div>
        </div>
    );
};

export default AreaWiseSummaryReport;
