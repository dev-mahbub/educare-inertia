import Checkbox from "@/Components/Checkbox";

const StaffLeaveSettingRightTable = ({
    leaveSetting,
    data,
    setData
}) => {

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        newFormData = {
            ...data,
            [name]: value,
        };

        setData(newFormData);
    };

    const headerTopData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th colSpan={3}>
                                    Setting will be applied for selected
                                    teachers only
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveSetting?.is_rule_one_in_time_enabled == true &&
                                <tr>
                                    <td>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="is_rule_one_in_time_enabled"
                                                    name="is_rule_one_in_time_enabled"
                                                    checked={data.is_rule_one_in_time_enabled}
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(
                                                            e.target.name,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    <td colSpan={3}>
                                        Rule 1 {`("Half Day" as per hours)`}
                                    </td>
                                </tr>
                            }

                            {leaveSetting?.is_rule_two_total_hour_enabled == true &&
                                <tr>
                                    <td>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="is_rule_two_total_hour_enabled"
                                                    name="is_rule_two_total_hour_enabled"
                                                    checked={data.is_rule_two_total_hour_enabled}
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(
                                                            e.target.name,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    <td colSpan={2}>
                                        Rule 2 {`("Half Day" as per hours)`}
                                    </td>
                                </tr>
                            }

                            {leaveSetting?.is_saturday_exceptional == true &&
                                <tr>
                                    <td>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="is_saturday_exceptional"
                                                    name="is_saturday_exceptional"
                                                    checked={data.is_saturday_exceptional}
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(
                                                            e.target.name,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    <td colSpan={2}>
                                        Is Saturday Exceptional
                                    </td>
                                </tr>
                            }
                            {leaveSetting?.is_sunday_exceptional == true &&
                                <tr>
                                    <td>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="is_sunday_exceptional"
                                                    name="is_sunday_exceptional"
                                                    checked={data.is_sunday_exceptional}
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(
                                                            e.target.name,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    <td colSpan={2}>
                                        Is Sunday Exceptional
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

export default StaffLeaveSettingRightTable;
