import LeaveHeaderMenus from '@/Components/Partials/Menus/Leave/LeaveHeaderMenus';
import StaffLeaveSettingTables from './StaffLeaveSettingTables';

const StaffLeaveSettingInnerLayout = ({
    leaveSetting,
    staffs,
    staffTypes
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
                       <StaffLeaveSettingTables
                            leaveSetting={leaveSetting}
                            staffs={staffs}
                            staffTypes={staffTypes}
                       />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffLeaveSettingInnerLayout;
