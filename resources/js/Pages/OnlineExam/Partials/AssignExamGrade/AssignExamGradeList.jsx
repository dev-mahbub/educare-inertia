import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignExamGradeList = ({
    virtualExam,
    classrooms
}) => {

    const [selectedClassrooms, setSelectedClassrooms] = useState(classrooms?.filter(item => virtualExam?.classrooms?.includes(item?.id)));

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_class: false,
        classroom_ids: virtualExam?.classrooms ?? []
    });

    // Handle show/hide grade list
    const [showGradeList, setShowGradeList] = useState(true);
    const handleGradeListShow = () => {
        setShowGradeList(!showGradeList);
    };

    // Handle checkbox selection
    const handleOnlineExamClassSelect = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedClassIds = [...data.classroom_ids];

        if (name === "select_all_class") {
            newFormData.select_all_class = value;

            if (value) {
                newCheckedClassIds = classrooms.map(item => item.id);
            } else {
                newCheckedClassIds = [];
            }

            newFormData.classroom_ids = newCheckedClassIds;
        } else {
            if (value) {
                newCheckedClassIds.push(id);
            } else {
                newCheckedClassIds = newCheckedClassIds.filter(checkedId => checkedId !== id);
            }

            newFormData.classroom_ids = newCheckedClassIds;
            newFormData.select_all_class = newCheckedClassIds.length === classrooms.length;
        }

        const newCheckedData = classrooms.filter(item => newCheckedClassIds.includes(item.id));

        setData(newFormData);
        setSelectedClassrooms(newCheckedData);
    };

    // Handle removing class from checkedData
    const handleCheckClass = (name, value, id) => {
        if (!value) {
            const updatedCheckedData = selectedClassrooms.filter(item => item.id !== id);

            setSelectedClassrooms(updatedCheckedData);

            let newCheckedClassIds = [...data.classroom_ids].filter(checkedId => checkedId !== id);

            setData({
                ...data,
                classroom_ids: newCheckedClassIds,
                select_all_class: newCheckedClassIds.length === classrooms.length,
            });
        }
    };

    // handle save assign class start
    const handleSaveAssignClass = (e) => {
        e.preventDefault();

        if(data?.classroom_ids?.length == 0) {
            toast.error("Please select at least one class.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            put(route('online_exam.save_assign_exam_grade', virtualExam?.id));
        }
    }
    // handle save assign class end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="flex gap-5 items-center mb-2">
                        <div className="educare-card-title pb-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Select Class
                            </h5>
                        </div>
                        <PrimaryButton
                            className="educare-primary-btn-md-fill"
                            onClick={handleGradeListShow}
                        >
                            {showGradeList ? 'Show' : 'Hide'}
                        </PrimaryButton>
                    </div>
                    <div className={`educare-admission-list-inner-wrapper ${showGradeList ? 'hidden' : ''}`}>
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Class</th>
                                        <th>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="select_all_class"
                                                        checked={data.select_all_class || false}
                                                        onChange={(e) =>
                                                            handleOnlineExamClassSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                All
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classrooms.length > 0 ? (
                                        classrooms.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.title}</td>
                                                <td>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name={"online_class_" + item.id}
                                                                checked={data?.classroom_ids?.includes(item.id)}
                                                                onChange={(e) =>
                                                                    handleOnlineExamClassSelect(e.target.name, e.target.checked, item.id)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2} className="text-center">Class not found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex gap-5 items-center mt-10 mb-4">
                        <div className="educare-card-title pb-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Assigned Class
                            </h5>
                        </div>
                    </div>
                    <div className='educare-admission-list-inner-wrapper'>
                        <div className="educare-admission-list pb-0">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Class</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedClassrooms.length > 0 ? (
                                        selectedClassrooms.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.title}</td>
                                                <td>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name={"online_class_" + item.id}
                                                                checked={selectedClassrooms.some(dataItem => dataItem.id === item.id)}
                                                                onChange={(e) =>
                                                                    handleCheckClass(e.target.name, e.target.checked, item.id)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2} className="text-center">Class not found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                <Link
                    href={route('online_exam.assign_exam_question', virtualExam?.id)}
                    className="educare-gray-btn-lg-stroke"
                >
                    Back
                </Link>
                <button
                    type="button"
                    className="educare-primary-btn-lg-fill"
                    onClick={handleSaveAssignClass}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default AssignExamGradeList;
