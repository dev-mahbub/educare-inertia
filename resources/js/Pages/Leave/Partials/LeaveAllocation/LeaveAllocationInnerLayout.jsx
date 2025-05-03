import LeaveHeaderMenus from "@/Components/Partials/Menus/Leave/LeaveHeaderMenus";
import LeaveAllocationFilter from "./LeaveAllocationFilter";
import LeaveAllocationTable from "./LeaveAllocationTable";

const LeaveAllocationInnerLayout = ({
    teachingTypes,
    genders,
    staffLeaveAllocations,
    leaveTypes
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
                        <LeaveAllocationFilter
                            teachingTypes={teachingTypes}
                            genders={genders}
                            staffLeaveAllocations={staffLeaveAllocations}
                        />
                        <LeaveAllocationTable
                            staffLeaveAllocations={staffLeaveAllocations}
                            leaveTypes={leaveTypes}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveAllocationInnerLayout;
// LeaveHeaderMenus
