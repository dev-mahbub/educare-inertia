import HostelHeaderMenus from '@/Components/Partials/Menus/Hostel/HostelHeaderMenus';
import React from 'react';
import HostelGatePassTables from './HostelGatePassTables';

const HostelGatePassInnerLayout = ({
    classrooms,
    students,
    guardianData,
    studentGatePass,
    gateNextNo,
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
                        <HostelGatePassTables
                            classrooms={classrooms}
                            students={students}
                            guardianData={guardianData}
                            studentGatePass={studentGatePass}
                            gateNextNo={gateNextNo}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HostelGatePassInnerLayout;
