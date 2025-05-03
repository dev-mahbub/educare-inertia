import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import SelectInput from '@/Components/SelectInput';
import RadioInput from '@/Components/RadioInput';

const allClassData = [{ id: 1, class: 'II A', }, { id: 2, class: 'IV B', },];
const allStudentData = [{ id: 1, class: 'NURSURY A', }, { id: 2, class: 'NURSURY B', },];

const ParentsCredentialList = () => {
    const [checkedData, setCheckedData] = useState([]);
    const [activeData, setActiveData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_student: "",
        search_student: "",
        checkType: "individuals",
        classCheck: []
    });

    useEffect(() => {
        if (data?.checkType === 'class_wise') {
            setActiveData(allClassData);
        } else if (data?.checkType === 'individuals') {
            setActiveData(allStudentData);
        } else {
            setActiveData([])
        }
    }, [data.checkType]);

    // Handle checkbox selection
    const handleTeacherSelect = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedParentsIds = [...data.classCheck];

        if (name === "allow_all_parents_id") {
            newFormData.allow_all_parents_id = value;

            if (value) {
                newCheckedParentsIds = activeData.map(item => item.id);
            } else {
                newCheckedParentsIds = [];
            }

            newFormData.classCheck = newCheckedParentsIds;
        } else {
            if (value) {
                newCheckedParentsIds.push(id);
            } else {
                newCheckedParentsIds = newCheckedParentsIds.filter(checkedId => checkedId !== id);
            }

            newFormData.classCheck = newCheckedParentsIds;
            newFormData.allow_all_parents_id = newCheckedParentsIds.length === activeData.length;
        }

        const newCheckedData = activeData.filter(item => newCheckedParentsIds.includes(item.id));

        setData(newFormData);
        setCheckedData(newCheckedData);
    };

console.log(data.checkType);
    return (
        <>

            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="educare-create-school-settings-list-check min-width-full">
                                <div className="educare-radio-field-styles flex gap-3">
                                    <RadioInput
                                        name="checkType"
                                        value="Send class-wise"
                                        checked={data.checkType === "class_wise"}
                                        onChange={() => setData("checkType", "class_wise")}
                                    />
                                    <RadioInput
                                        name="checkType"
                                        value="Send to Individuals"
                                        checked={data.checkType === "individuals"}
                                        onChange={() => setData("checkType", "individuals")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="educare-input-field-styles mb-5">
                                <SelectInput
                                    data_label="Student"
                                    data={[]}
                                    value={
                                        data.select_student
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "select_student",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.select_student
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-input-field-styles">
                                <TextInput
                                    value={
                                        data.search_student
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "search_student",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                    placeHolder="Enter Search Text..."
                                />
                                <InputError
                                    message={
                                        errors.search_student
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
                                                            name="allow_all_parents_id"
                                                            checked={data.allow_all_parents_id || false}
                                                            onChange={(e) =>
                                                                handleTeacherSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th>
                                                {
                                                    data.checkType === 'class_wise' ? 'All Classes' : 'All Student'
                                                }
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeData.length > 0 ? (
                                            activeData.map((item, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    name={"class_" + item.id}
                                                                    checked={data.classCheck.includes(item.id)}
                                                                    onChange={(e) =>
                                                                        handleTeacherSelect(e.target.name, e.target.checked, item.id)
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
                                <span className='text-headingLight font-medium'>
                                    {checkedData.length} {data.checkType === 'class_wise' ? 'Class ' : 'Student '} selected
                                </span>
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

export default ParentsCredentialList;
