import Checkbox from '@/Components/Checkbox';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';

const ParentsCredentialList = ({
    classrooms,
    students,
    boardingTypes,
    data,
    setData
}) => {
    const [checkedData, setCheckedData] = useState([]);
    const [activeData, setActiveData] = useState([]);

    useEffect(() => {
        if (data?.recipient_type === 'class_wise') {
            setActiveData(classrooms?.filter(item => item?.title?.toLowerCase()?.includes(data?.search?.toLowerCase()?.trim())));
        } else if (data?.recipient_type === 'individuals') {
            setActiveData(students?.filter(item => item?.title?.toLowerCase()?.includes(data?.search?.toLowerCase()?.trim())));
        } else {
            setActiveData([]);
        }
    }, [data.recipient_type, classrooms, students, data?.search]);


    // handle change recipient type start
    const handleChangeRecipientType = (value) => {
        setData((prevData) => ({
            ...prevData,
            recipient_type: value,
            selected_ids: [],
            select_all: false
        }));
    }
    // handle change recipient type end

    // Handle checkbox selection start
    const handleSelect = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedIds = [...data.selected_ids];

        if (name === "select_all") {
            newFormData.select_all = value;

            if (value) {
                if (data?.recipient_type === 'class_wise') {
                    newCheckedIds = classrooms.map(item => item.id);
                } else if (data?.recipient_type === 'individuals') {
                    newCheckedIds = students.map(item => item.id);
                }
            } else {
                newCheckedIds = [];
            }

            newFormData.selected_ids = newCheckedIds;
        } else {
            if (value) {
                newCheckedIds.push(id);
            } else {
                newCheckedIds = newCheckedIds.filter(checkedId => checkedId !== id);
            }

            newFormData.selected_ids = newCheckedIds;

            if (data?.recipient_type === 'class_wise') {
                newFormData.select_all = newCheckedIds.length === classrooms.length;
            } else if (data?.recipient_type === 'individuals') {
                newFormData.select_all = newCheckedIds.length === students.length;
            }
        }

        let newCheckedData = [];

        if (data?.recipient_type === 'class_wise') {
            newCheckedData = classrooms.filter(item => newCheckedIds.includes(item.id));
        } else if (data?.recipient_type === 'individuals') {
            newCheckedData = students.filter(item => newCheckedIds.includes(item.id));
        }

        setData(newFormData);
        setCheckedData(newCheckedData);
    };
    // Handle checkbox selection end

    // handle remove selected item start
    const handleRemoveSelectedItem = (id) => {
        let selectedIds = [...data.selected_ids];

        setData((prevData) => ({
            ...prevData,
            select_all: false,
            selected_ids: selectedIds?.filter(selectedId => selectedId != id)
        }));

        setCheckedData(checkedData?.filter(item => item?.id != id));
    }
    // handle remove selected item end

    // handle change classroom start
    const handleChangeClassroom = (value) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: value,
            selected_ids: [],
            select_all: false
        }));

        const form_data = {
            audience_type: data?.audience_type,
            classroom_id: value
        }

        router.post(route('sms.sms_erp_credential'), form_data);
    }
    // handle change classroom end

    return (
        <>

            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="educare-create-school-settings-list-check min-width-full">
                                <div className="educare-radio-field-styles flex gap-3">
                                    <RadioInput
                                        name="recipient_type"
                                        value="Send class-wise"
                                        checked={data.recipient_type === "class_wise"}
                                        onChange={() => handleChangeRecipientType("class_wise")}
                                    />
                                    <RadioInput
                                        name="recipient_type"
                                        value="Send to Individuals"
                                        checked={data.recipient_type === "individuals"}
                                        onChange={() => handleChangeRecipientType("individuals")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            {data?.recipient_type == 'class_wise' &&
                                <div className="educare-input-field-styles mb-5">
                                    <SelectInput
                                        data_label="Student"
                                        data={boardingTypes}
                                        value={
                                            data.boarding_type
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "boarding_type",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                </div>
                            }

                            {data?.recipient_type == 'individuals' &&
                                <div className="educare-input-field-styles mb-5">
                                    <SelectInput
                                        data_label="Class"
                                        data={classrooms}
                                        value={
                                            data.classroom_id
                                        }
                                        onChange={(e) =>
                                            handleChangeClassroom(e.target.value)
                                        }
                                        className="block"
                                    />
                                </div>
                            }

                            <div className="educare-input-field-styles">
                                <TextInput
                                    value={
                                        data.search
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "search",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                    placeHolder="Enter Search Text..."
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
                                                            name="select_all"
                                                            checked={data.select_all || false}
                                                            onChange={(e) =>
                                                                handleSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th>
                                                {
                                                    data.recipient_type === 'class_wise' ? 'All Classes' : 'All Student'
                                                }
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeData.length > 0 ? (
                                            activeData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    name={"class_" + item.id}
                                                                    checked={data?.selected_ids.includes(item.id)}
                                                                    onChange={(e) =>
                                                                        handleSelect(e.target.name, e.target.checked, item.id)
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item?.title}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2} className="text-center">Data not found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            {/* <span className='text-headingLight'>s=</span> */}
                            <div>
                                <span className='text-headingLight font-medium'>
                                    {checkedData.length} {data.recipient_type === 'class_wise' ? 'Class ' : 'Student '} selected
                                </span>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto table-body-dark">
                                <table>
                                    <tbody>
                                        {checkedData.length > 0 ? (
                                            checkedData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.title}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip title="Delete" placement="top" arrow>
                                                                    <button
                                                                        className="educare-danger-btn-sm-fill"
                                                                        type="button"
                                                                        onClick={() => {
                                                                            handleRemoveSelectedItem(item?.id)
                                                                        }}
                                                                     >
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

export default ParentsCredentialList;
