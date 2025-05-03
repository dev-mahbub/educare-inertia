import LeaveHeaderMenus from '@/Components/Partials/Menus/Leave/LeaveHeaderMenus';
import DirectLeaveTables from './DirectLeaveTables';

const DirectLeaveInnerLayout = ({
    staffs,
    leaves,
    leaveTypes,
    leaveShifts,
    dayTypes,
    staffLeaveAllocations,
    staff
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LeaveHeaderMenus title="LEAVE MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                         <DirectLeaveTables
                            staffs={staffs}
                            leaves={leaves}
                            leaveTypes={leaveTypes}
                            leaveShifts={leaveShifts}
                            dayTypes={dayTypes}
                            staffLeaveAllocations={staffLeaveAllocations}
                            staff={staff}
                         />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DirectLeaveInnerLayout;
