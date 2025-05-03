import LeaveHeaderMenus from '@/Components/Partials/Menus/Leave/LeaveHeaderMenus';
import TeacherLeaveHeaderMenus from '@/Components/Partials/Menus/Leave/TeacherLeaveHeaderMenus';
import RequestLeaveTables from './RequestLeaveTables';


const RequestLeaveInnerLayout = ({
    leaves,
    leaveTypes,
    leaveShifts,
    dayTypes,
    staffLeaveAllocations,
    staff,
    siteData
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            {siteData?.authRoles.indexOf("Teacher") > -1 ?
                                <TeacherLeaveHeaderMenus title="LEAVE MANAGEMENT" />
                                :
                                <LeaveHeaderMenus title="LEAVE MANAGEMENT" />
                            }
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">

                    <RequestLeaveTables
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

export default RequestLeaveInnerLayout;
