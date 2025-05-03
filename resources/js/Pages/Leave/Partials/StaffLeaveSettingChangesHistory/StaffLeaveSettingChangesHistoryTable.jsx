import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
const StaffLeaveSettingChangesHistoryTable = ({
    staffs,
    staffTypes,
    staffLeaveSettings
}) => {
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
    });

    // handle change staff type start
    const handleChangeStaffType = (e) => {
        const staff_type = e.target.value;

        setData((prevData) => ({
            ...prevData,
            staff_type: staff_type
        }));

        const form_data = {
            staff_type: staff_type
        }

        router.post(route('leave.staff_leave_setting_changes_history'), form_data);
    }
    // handle change staff type end

    // handle view leave setting history start
    const handleViewLeaveSettingHistory = (e, id) => {
        e.preventDefault();

        const form_data = {
            staff_type: data?.staff_type,
            staff_id: id
        }

        router.post(route('leave.staff_leave_setting_changes_history'), form_data);
    }
    // handle view leave setting history end


    console.log('staffLeaveSettings', staffLeaveSettings);


    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-CurrencyInr"></i>
                    Staff Leave Setting Changes History
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Emp Id</th>
                            <th>
                                <div className="flex items-center justify-between">
                                    <div>
                                        Staff {staffs?.length}
                                    </div>
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="staff_type"
                                            data_label="Staff Type"
                                            data={staffTypes}
                                            value={data.staff_type}
                                            onChange={(e) =>
                                                handleChangeStaffType(e)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.staff_type}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </th>
                            <th>View History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs?.length > 0 &&
                            staffs.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.employee_id}</td>
                                    <td>{`${item?.first_name ?? ''} ${item?.middle_name ?? ''} ${item?.last_name ?? ''}`}</td>
                                    <td>
                                        {item?.staff_leave_settings_count > 0 &&
                                            <button
                                                type="button"
                                                className="educare-secondary-btn-sm-fill"
                                                onClick={(e) => {
                                                    handleViewLeaveSettingHistory(e, item?.id)
                                                }}
                                            >
                                                View
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {staffLeaveSettings?.length > 0 &&
                <div className="educare-admission-list-inner-wrapper mt-8">
                    <div className="educare-admission-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Half Day Leave Enabled</th>
                                    <th>Rule 1(In Time)</th>
                                    <th>Rule 2(Total Hrs)</th>
                                    <th>Is Saturday Exceptional</th>
                                    <th>Is Sunday Exceptional</th>
                                    <th>Applied On</th>
                                    <th>Applied By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffLeaveSettings.map((item, index) => (
                                        <tr key={index} className={`${item?.is_active ? 'bg-success' : ''}`}>
                                            <td>
                                                {item?.is_half_day_leave_enabled ? "Yes" : "No"}
                                                {item?.is_active == true &&
                                                    <span
                                                        className="badge success ml-2"
                                                    >
                                                        Latest
                                                    </span>
                                                }
                                            </td>
                                            <td>{item?.is_rule_one_in_time_enabled ? "Yes" : "No"}</td>
                                            <td>{item?.is_rule_two_total_hour_enabled ? "Yes" : "No"}</td>
                                            <td>{item?.is_saturday_exceptional ? "Yes" : "No"}</td>
                                            <td>{item?.is_sunday_exceptional ? "Yes" : "No"}</td>
                                            <td>{item?.applied_on}</td>
                                            <td>{`${item?.created_by?.first_name ?? ''} ${item?.created_by?.middle_name ?? ''} ${item?.created_by?.last_name ?? ''}`}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    );
};

export default StaffLeaveSettingChangesHistoryTable;
