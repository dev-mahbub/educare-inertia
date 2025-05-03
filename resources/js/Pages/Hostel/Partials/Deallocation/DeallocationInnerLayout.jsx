import HostelHeaderMenus from '@/Components/Partials/Menus/Hostel/HostelHeaderMenus';
import React from 'react';
import DeallocationFormDetails from './DeallocationFormDetails';

const DeallocationInnerLayout = ({
    classrooms,
    students,
    currentAllocationData,
    prevAllocationData,
    studentId,
    classroomId,
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
                        <DeallocationFormDetails
                            classrooms={classrooms}
                            students={students}
                            currentAllocationData={currentAllocationData}
                            prevAllocationData={prevAllocationData}
                            studentId={studentId}
                            classroomId={classroomId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeallocationInnerLayout;
