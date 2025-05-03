import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const OutstandingDueReportClass = ({
    classNames = [],
    classrooms = [],
    selectedClassroomIds,
    setSelectedClassroomIds,
    setClassNameId
}) => {

    const [filteredClassrooms, setFilteredClassrooms] = useState([]);
    const [classroomCheckedAll, setClassroomCheckedAll] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_classroom_id: "",
        class_name_id: "",
        classroom_ids: "",
        class_one_id: false,
        class_two_id: false,
    });

    // handle class change start
    useEffect(() => {
        if (data?.class_name_id == "") {
            setFilteredClassrooms(classrooms);
        }
        else {
            setFilteredClassrooms(classrooms?.filter(item => item?.class_name_id == data?.class_name_id));
        }
    },[data?.class_name_id]);

    const handleClassNameChange = (e) => {
        const class_name_id = e.target.value;
        setClassNameId(class_name_id);
        setSelectedClassroomIds([]);

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
        }));
    }
    // handle class change end


    //handle classroom Checkbox select start
    useEffect(() => {
        if (selectedClassroomIds?.length <= 0) {
            setClassroomCheckedAll(false);
        }
        else {
            setClassroomCheckedAll(selectedClassroomIds?.length === filteredClassrooms?.length);
        }
    }, [selectedClassroomIds, filteredClassrooms])


    const handleCheckboxSelect = (name, value) => {
        let updatedClassroomIds = [...selectedClassroomIds];

        // parent will check, all child will check
        if (name === "select_all_classroom_id") {
            if (value) {
                updatedClassroomIds = filteredClassrooms?.map(item => item?.id);
            }
            else {
                updatedClassroomIds = [];
            }
        } else if (name = "classroom_id") {
            if (selectedClassroomIds?.includes(value)) {
                updatedClassroomIds = updatedClassroomIds?.filter(item => item != value);
            }
            else {
                updatedClassroomIds = [...updatedClassroomIds, value];
            }
        }

        setSelectedClassroomIds(updatedClassroomIds)
    };
    //handle classroom Checkbox select end

    return (
        <div>
            <div className="educare-input-field-styles mb-2">
                <SelectInput
                    data_label="All Class"
                    data={classNames}
                    value={
                        data.class_name_id
                    }
                    onChange={(e) =>
                        handleClassNameChange(e)
                    }
                    className="block"
                />
                <InputError
                    message={
                        errors.class_name_id
                    }
                    className="mt-2"
                />
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="select_all_classroom_id"
                                            name="select_all_classroom_id"
                                            checked={
                                                classroomCheckedAll
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                            }
                                        />
                                    </div>
                                </div>
                            </th>
                            <th>Section</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClassrooms?.length > 0 &&
                            filteredClassrooms?.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="classroom_id"
                                                    name="classroom_id"
                                                    checked={
                                                        selectedClassroomIds?.includes(item?.id)
                                                    }
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(e.target.name, item?.id)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item?.title}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OutstandingDueReportClass;
