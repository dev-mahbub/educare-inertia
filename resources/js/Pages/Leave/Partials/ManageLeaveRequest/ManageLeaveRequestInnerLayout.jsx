import LeaveHeaderMenus from '@/Components/Partials/Menus/Leave/LeaveHeaderMenus';
import TeacherLeaveHeaderMenus from '@/Components/Partials/Menus/Leave/TeacherLeaveHeaderMenus';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ManageLeaveRequestFilter from './ManageLeaveRequestFilter';
import ManageLeaveRequestTable from './ManageLeaveRequestTable';

const ManageLeaveRequestInnerLayout = ({
    leaveStatusArr,
    months,
    leaves,
    siteData,
    isLeaveApprover
}) => {

    const [pendingLeaveCount, setPendingLeaveCount] = useState(0);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        leave_status: "",
        month: "",
    });

    useEffect(() => {
        setPendingLeaveCount(leaves?.filter(item => item?.is_approved == false && item?.is_cancelled == false)?.length);
    }, [leaves]);

    // handle filter leaves start
    const handleFilterLeaves = () => {
        const form_data = {
            leave_status: data?.leave_status,
            month: data?.month,
        }

        router.post(route('leave.manage_leave_request'), form_data);
    }
    // handle filter leaves end

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            {siteData?.authRoles.indexOf("Teacher") > -1 ?
                                <TeacherLeaveHeaderMenus
                                    title="LEAVE MANAGEMENT"
                                    pendingLeaveCount={pendingLeaveCount}
                                />
                                :
                                <LeaveHeaderMenus title="LEAVE MANAGEMENT"
                                    pendingLeaveCount={pendingLeaveCount}

                                />
                            }
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <ManageLeaveRequestFilter
                            leaveStatusArr={leaveStatusArr}
                            months={months}
                            leaves={leaves}
                            data={data}
                            setData={setData}
                            errors={errors}
                            handleFilterLeaves={handleFilterLeaves}
                        />
                        <ManageLeaveRequestTable
                            leaves={leaves}
                            isLeaveApprover={isLeaveApprover}
                            handleFilterLeaves={handleFilterLeaves}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageLeaveRequestInnerLayout;
