import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffLeaveSettingLeftTable from "./StaffLeaveSettingLeftTable";
import StaffLeaveSettingRightTable from "./StaffLeaveSettingRightTable";

const StaffLeaveSettingTables = ({
    leaveSetting,
    staffs,
    staffTypes
}) => {

    const [staffIds, setStaffIds] = useState([]);
    const [selectAllStaff, setSelectAllStaff] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        staff_type: "",
        search: "",
        staff_ids: [],
        is_rule_one_in_time_enabled: false,
        is_rule_two_total_hour_enabled: false,
        is_saturday_exceptional: false,
        is_sunday_exceptional: false
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            staff_ids: staffIds
        }));
    }, [staffIds]);

    useEffect(() => {
        setSelectAllStaff(staffIds?.length == staffs?.length && staffs?.length > 0);
    }, [staffIds, staffs]);

    // handle apply staff leave setting start
    const handleApplyStaffLeaveSetting = (e) => {
        e.preventDefault();

        if(data?.staff_ids?.length == 0) {
            toast.error("Please select any staff!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (data?.is_rule_one_in_time_enabled == false && data?.is_rule_two_total_hour_enabled == false) {
            toast.error("Please select any rule!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route('leave.staff_leave_setting.save'), {
                onSuccess: () => {
                    setStaffIds([]);
                    reset();
                },
                onError: () => {

                }
            });
        }
    }
    // handle apply staff leave setting end

    return (
        <>
            <div className="flex justify-between flex-wrap items-center mb-2.5">
                <div className="educare-card-title mr-auto pb-none">
                    <h5>
                        <i className="icon-settting"></i>
                        Staff Leave Setting
                    </h5>
                </div>
                <div>
                    <button
                        className="transition ease-in-out duration-150  educare-primary-btn-md-fill"
                        type="button"
                        onClick={handleApplyStaffLeaveSetting}
                    >
                        Apply Half Day Setting
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-8 lg:col-span-8">
                    <StaffLeaveSettingLeftTable
                        staffs={staffs}
                        staffTypes={staffTypes}
                        data={data}
                        setData={setData}
                        staffIds={staffIds}
                        setStaffIds={setStaffIds}
                        selectAllStaff={selectAllStaff}
                    />
                </div>
                <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                    <StaffLeaveSettingRightTable
                        leaveSetting={leaveSetting}
                        data={data}
                        setData={setData}
                    />
                </div>
            </div>
        </>
    );
};

export default StaffLeaveSettingTables;
