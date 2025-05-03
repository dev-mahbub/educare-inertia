import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import { Tooltip } from "@mui/material";
import { useState } from 'react';

const staffData = [{ id: 1, class: 'II A', }, { id: 2, class: 'IV B', },];

const StaffCredentialList = () => {
    const [checkedData, setCheckedData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_audience: "",
        staffCheck: []
    });

    // Handle checkbox selection
    const handleVehicleStaffSelect = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedStaff = [...data.staffCheck];

        if (name === "allow_all_staff_id") {
            newFormData.allow_all_staff_id = value;

            if (value) {
                newCheckedStaff = staffData.map(item => item.id);
            } else {
                newCheckedStaff = [];
            }

            newFormData.staffCheck = newCheckedStaff;
        } else {
            if (value) {
                newCheckedStaff.push(id);
            } else {
                newCheckedStaff = newCheckedStaff.filter(checkedId => checkedId !== id);
            }

            newFormData.staffCheck = newCheckedStaff;
            newFormData.allow_all_staff_id = newCheckedStaff.length === staffData.length;
        }

        const newCheckedData = staffData.filter(item => newCheckedStaff.includes(item.id));

        setData(newFormData);
        setCheckedData(newCheckedData);
    };


    return (
        <>

            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 lg:col-span-6">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    value={
                                        data.select_audience
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "select_audience",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                    placeHolder="Enter Search Text..."
                                />
                                <InputError
                                    message={
                                        errors.select_audience
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto table-body-dark">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            name="allow_all_staff_id"
                                                            checked={data.allow_all_staff_id || false}
                                                            onChange={(e) =>
                                                                handleVehicleStaffSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th>All Classes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffData.length > 0 ? (
                                            staffData.map((item, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    name={"online_class_" + item.id}
                                                                    checked={data.staffCheck.includes(item.id)}
                                                                    onChange={(e) =>
                                                                        handleVehicleStaffSelect(e.target.name, e.target.checked, item.id)
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item.class}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2} className="text-center">Record not found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <span className='text-headingLight'>s=</span>
                            <div>
                                <span className='text-headingLight font-medium'>{checkedData.length} selected</span>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto table-body-dark">
                                <table>
                                    <tbody>
                                        {checkedData.length > 0 ? (
                                            checkedData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.class}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip title="Delete" placement="top" arrow>
                                                                    <button className="educare-danger-btn-sm-fill" as="button">
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffCredentialList;
