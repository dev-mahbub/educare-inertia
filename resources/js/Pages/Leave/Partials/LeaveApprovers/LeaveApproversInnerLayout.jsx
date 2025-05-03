import LeaveHeaderMenus from '@/Components/Partials/Menus/Leave/LeaveHeaderMenus';
import LeaveApproversForm from './LeaveApproversForm';
import LeaveApproversTable from './LeaveApproversTable';

const LeaveApproversInnerLayout = ({
    staffs,
    leaveApprovers
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
                        <div className='educare-parent-montly-income-area'>
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                                    <LeaveApproversForm
                                        staffs={staffs}
                                    />
                                </div>
                                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                                    <LeaveApproversTable
                                        leaveApprovers={leaveApprovers}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveApproversInnerLayout;
