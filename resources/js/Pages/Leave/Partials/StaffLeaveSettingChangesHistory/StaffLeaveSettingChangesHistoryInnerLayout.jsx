import LeaveHeaderMenus from '@/Components/Partials/Menus/Leave/LeaveHeaderMenus';
import StaffLeaveSettingChangesHistoryTable from './StaffLeaveSettingChangesHistoryTable';

const StaffLeaveSettingChangesHistoryInnerLayout = ({
    staffs,
    staffTypes,
    staffLeaveSettings
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
                         <StaffLeaveSettingChangesHistoryTable
                            staffs={staffs}
                            staffTypes={staffTypes}
                            staffLeaveSettings={staffLeaveSettings}
                         />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffLeaveSettingChangesHistoryInnerLayout;
