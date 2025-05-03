
const LeaveSettingChangesHistoryTable = ({
    leaveSettings
}) => {
    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-CurrencyInr"></i>
                    Leave Setting Changes History
                </h5>
            </div>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Auto Approver Leave Enabled</th>
                                <th>Half Day Leave Enabled</th>
                                <th>Rule 1(In Time)</th>
                                <th>Rule 2(Total Hrs)</th>
                                <th> In Time</th>
                                <th>Total Hrs</th>
                                <th>Is Saturday Exceptional</th>
                                <th>Is Sunday Exceptional</th>
                                <th>Applied On</th>
                                <th>Applied By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveSettings?.length > 0 ?
                                leaveSettings.map((item, index) => (
                                    <tr key={index} className={`${item?.is_active ? 'bg-success' : ''}`}>
                                        <td>
                                            {item?.is_auto_approve_leave_enabled ? "Yes" : "No"}
                                            {item?.is_active == true &&
                                                <span
                                                    className="badge success ml-2"
                                                >
                                                    Latest
                                                </span>
                                            }
                                        </td>
                                        <td>{item?.is_half_day_leave_enabled ? "Yes" : "No"}</td>
                                        <td>{item?.is_rule_one_in_time_enabled ? "Yes" : "No"}</td>
                                        <td>{item?.is_rule_two_total_hour_enabled ? "Yes" : "No"}</td>
                                        <td>{item?.in_time}</td>
                                        <td>{item?.rule_two_total_hour}</td>
                                        <td>{item?.is_saturday_exceptional ? "Yes" : "No"}</td>
                                        <td>{item?.is_sunday_exceptional ? "Yes" : "No"}</td>
                                        <td>{item?.applied_on}</td>
                                        <td>{`${item?.created_by?.first_name ?? ''} ${item?.created_by?.middle_name ?? ''} ${item?.created_by?.last_name ?? ''}`}</td>
                                    </tr>
                                ))
                            :
                                <tr>
                                    <td
                                        className="text-center text-red-500"
                                        colSpan="10"
                                    >
                                        Data not found
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LeaveSettingChangesHistoryTable;
