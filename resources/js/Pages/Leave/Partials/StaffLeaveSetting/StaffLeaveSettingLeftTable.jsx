import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
const StaffLeaveSettingLeftTable = ({
    staffs,
    staffTypes,
    data,
    setData,
    staffIds,
    setStaffIds,
    selectAllStaff
}) => {

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let updatedData = [];

        if (name === "select_all_staff") {
            if(value == true) {
                updatedData = staffs?.map(item => item?.id);
            } else {
                updatedData = [];
            }
        } else {
            if([...staffIds]?.includes(value)) {
                updatedData = [...staffIds]?.filter(item => item != value);
            } else {
                updatedData = [...staffIds, value];
            }
        }

        setStaffIds(updatedData);
    };

    const headerTopData = (e) => {
        e.preventDefault();
    };

    // handle filter data start
    const handleFilterData = (e) => {
        e.preventDefault();

        setStaffIds([]);

        const form_data = {
            staff_type: data?.staff_type,
            search: data?.search,
        }

        router.post(route('leave.staff_leave_setting'), form_data);
    }
    // handle filter data end

    return (
        <>
            <form onSubmit={headerTopData}>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                            Total Staff : {staffs?.length}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">

                    <div className="educare-input-field-styles">

                            <SelectInput
                                id="staff_type"
                                data_label="Type"
                                data={staffTypes}
                                value={
                                    data.staff_type
                                }
                                onChange={(e) =>
                                    setData(
                                        "staff_type",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                        </div>

                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search"
                                value={data.search}
                                onChange={(e) =>
                                    setData("search", e.target.value)
                                }
                                placeHolder="Search Staff"
                                className="block"
                            />
                        </div>

                        <div className="educare-filter-action-btn flex flex-wrap gap-2">
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <button
                                        type="button"
                                        className="educare-secondary-btn-md-fill"
                                        onClick={handleFilterData}
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </button>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Reset"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href={route('leave.staff_leave_setting')}
                                        className="educare-gray-btn-md-fill"
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="select_all_staff"
                                                name="select_all_staff"
                                                checked={selectAllStaff}
                                                onChange={(e) =>
                                                    handleCheckboxSelect(
                                                        e.target.name,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="select_all_staff"
                                                value="Select All"
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th>Emp Id</th>
                                <th>Staff</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs?.length > 0 &&
                                staffs.map((item, index) => (
                                    <tr key={index} className={`${item?.staff_leave_settings_count > 0 ? 'bg-success' : ''}`}>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id={`staff_id_${item?.id}`}
                                                        name={`staff_id_${item?.id}`}
                                                        checked={staffIds?.includes(item?.id)}
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(
                                                                e.target.name,
                                                                item?.id
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item?.employee_id}</td>
                                        <td>
                                            {`${item?.first_name ?? ''} ${item?.middle_name ?? ''} ${item?.last_name ?? ''}`}
                                            {item?.staff_leave_settings_count > 0 &&
                                                <span className="float-right">
                                                    (Setting has already applied)
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default StaffLeaveSettingLeftTable;
