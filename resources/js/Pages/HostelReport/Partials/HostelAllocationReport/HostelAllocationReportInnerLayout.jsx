import HostelHeaderMenus from '@/Components/Partials/Menus/Hostel/HostelHeaderMenus';
import React, { useState } from 'react';
import HostelAllocationReportTable from './HostelAllocationReportTable';

const HostelAllocationReportInnerLayout = ({
    studentDetails,
    classroomNames,
}) => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <HostelHeaderMenus title="HOSTEL MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <HostelAllocationReportTable
                            studentDetails={studentDetails}
                            classroomNames={classroomNames}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HostelAllocationReportInnerLayout;
