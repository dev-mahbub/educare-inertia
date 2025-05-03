import HostelHeaderMenus from '@/Components/Partials/Menus/Hostel/HostelHeaderMenus';
import React from 'react';
import HostelDeallocationReportTableList from './HostelDeallocationReportTableList';

const HostelDeallocationReportInnerLayout = ({
    classroomNames,
    studentDetails,
}) => {
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
                        <HostelDeallocationReportTableList
                            classroomNames={classroomNames}
                            studentDetails={studentDetails}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HostelDeallocationReportInnerLayout;
