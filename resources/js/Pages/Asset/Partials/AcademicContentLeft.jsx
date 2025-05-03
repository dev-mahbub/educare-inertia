import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from '@/Components/SelectInput';
import { Link, router } from "@inertiajs/react";
import { useState } from 'react';
import AddFolderPopup from './popup/AddFolderPopup';
import AssignPopup from './popup/AssignPopup';
import EditFolderPopup from './popup/EditFolderPopup';

const AcademicContentLeft = ({
    data,
    setData,
    errors,
    handleClassData,
    classNames,
    subjects,
    learningMaterialGroups,
    handleSelectLearningMaterialGroup,
    selectedLearningMaterialGroup,
    user,
    setSelectedLearningMaterialGroup,
    setMaterialResourse,
    setSelectedLearningMaterialGroupId,
    handleFilterLearningMaterial,
    studentClassNames,
    classrooms,
    classSubjects,
    setClassroomData,
    setClassSubjectData
}) => {
    const [editableData, setEditableData] = useState({});

    //assign folder popup
    const [assignPopup, setAssignPopup] = useState(false);
    const handleAssignPopupClick = () => {
        setAssignPopup(!assignPopup);
    };

    //add folder popup
    const [addFolderPopup, setAddFolderPopup] = useState(false);
    const handleAddFolderPopupClick = () => {
        setAddFolderPopup(!addFolderPopup);
    };
    //edit folder popup
    const [editFolderPopup, setEditFolderPopup] = useState(false);
    const handleEditFolderPopupClick = () => {
        setEditFolderPopup(!editFolderPopup);
    };

    // handle class change start
    const handleClassChange = (e) => {
        const class_name_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id
        }));

        setSelectedLearningMaterialGroup({});
        setMaterialResourse('');

        const form_data = {
            class_name_id: class_name_id,
            subject_id: data?.subject_id
        }

        router.post(route('asset.create'), form_data);
    }
    // handle class change end

    // handle subject change start
    const handleSubjectChange = (e) => {
        const subject_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            subject_id: subject_id
        }));

        setSelectedLearningMaterialGroup({});
        setSelectedLearningMaterialGroupId(null);
        setMaterialResourse('');

        const form_data = {
            class_name_id: data?.class_name_id,
            subject_id: subject_id
        }

        router.post(route('asset.create'), form_data);
    }
    // handle class change end


    return (
        <>
            <div className="educare-academic-content-management-left sticky top-[30px] pt-[25px] px-[30px] pb-[30px] bg-white border-t-3 shadow-[0_3.5px_5.5px_0px_rgb(0,0,0,0.02)] rounded-lg">
                <div className="educare-academic-content-management-left-form mb-[20px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                htmlFor="class_name_id"
                                value="Class"
                            />

                            <SelectInput
                                id="class_name_id"
                                data_label="Class"
                                data={classNames}
                                value={data.class_name_id}
                                onChange={(e) =>
                                    handleClassChange(e)
                                }
                                type="text"
                                className="mt-1 block w-full"
                            />

                            <InputError
                                message={errors.class_name_id}
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles">
                            <InputLabel
                                htmlFor="subject_id"
                                value="Subject"
                            />

                            <SelectInput
                                id="subject_id"
                                data_label="Subject"
                                data={subjects}
                                value={data.subject_id}
                                onChange={(e) =>
                                    handleSubjectChange(e)
                                }
                                type="text"
                                className="mt-1 block w-full"
                            />

                            <InputError
                                message={errors.subject_id}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
                {
                    data.class_name_id && data.subject_id ? (
                        <div className="educare-academic-content-management-card-wrapper">
                            <div className="educare-academic-content-management-add-card-item rounded-[4px] border-[1px] py-[20px] px-[15px] mb-[20px] bg-lightest/50">
                                <div className="flex items-center justify-between mb-[10px]">
                                    <div className="flex items-center gap-[5px]">
                                        <span><i className="icon-FolderSimple text-[30px]"></i></span>
                                        <h6 className="text-[18px] font-semibold">Add a Folder</h6>
                                    </div>
                                    <div className="add-btn">
                                        <button
                                            type="button"
                                            className='px-[12px] pt-[2px] pb-[3px] text-[14px] text-white rounded-[30px] bg-primary'
                                            onClick={handleAddFolderPopupClick}
                                        >
                                            <span className="text-[12px]"><i className="icon-plus"></i></span> Add
                                        </button>
                                    </div>
                                </div>
                                <p className="mb-[10px]">create folders to manage learning materials for a grade and subject</p>
                                <div className="educare-academic-content-management-add-card-control">
                                    <ul>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={handleAssignPopupClick}
                                            >
                                                <i className="icon-ListDashes"></i>assign
                                            </button>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('dashboard')}
                                                className='flex items-center'
                                            >
                                                <i className="icon-ArrowCircleLeft mt-[1px]"></i><span>back</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('teacher_classroom.index_classroom')}
                                                className='flex items-center'
                                            >
                                                <i className="icon-Notebook mt-[1px]"></i><span>classroom</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {learningMaterialGroups?.length > 0 ?
                                learningMaterialGroups?.map((item, index) => (
                                    <div key={index} className="educare-academic-content-management-edit-card-item rounded-[4px] border-[1px] bg-white shadow-[0_3.5px_5.5px_0px_rgb(0,0,0,0.02)]">
                                            <div className="educare-academic-content-management-edit-card-top py-[8px] px-[10px] bg-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-[5px]">
                                                        <span><i className="icon-FolderSimple text-[30px]"></i></span>
                                                        <h6 className="text-[16px] font-semibold">{item?.title}</h6>
                                                    </div>
                                                    <div className="educare-academic-edit-card-btn flex gap-[5px]">
                                                        <div className="educare-button-field-styles">
                                                            <PrimaryButton
                                                                type='button'
                                                                className="bg-supportingD/80 "
                                                                onClick={() => {
                                                                    handleSelectLearningMaterialGroup(item?.id)
                                                                }}
                                                            >
                                                                <i className="icon-plus"></i>
                                                            </PrimaryButton>
                                                        </div>
                                                        {item?.user_id == user?.id &&
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    type='button'
                                                                    className="bg-supportingB/80 "
                                                                    onClick={() => {
                                                                        handleEditFolderPopupClick();
                                                                        setEditableData(item);
                                                                    }}
                                                                >
                                                                    <i className="icon-pen"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        {/* backup */}
                                        {/* <div className="educare-academic-content-management-edit-card-top py-[8px] px-[10px] bg-gray-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-[5px]">
                                                    <span><i className="icon-FolderSimple text-[30px]"></i></span>
                                                    <h6 className="text-[16px] font-semibold">abc Training</h6>
                                                </div>
                                                <div className="educare-academic-edit-card-btn flex gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            type='button'
                                                            className="bg-supportingD/80 "
                                                            onClick={handleClassData}
                                                        >
                                                            <i className="icon-plus"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            type='button'
                                                            className="bg-supportingB/80 "
                                                            onClick={handleEditFolderPopupClick}
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}

                                        {selectedLearningMaterialGroup?.id == item?.id ? (
                                                <div className="educare-academic-content-management-add-card-list pt-[8px] px-[15px] pb-[30px]">
                                                    <ul
                                                        className="!block"
                                                    >
                                                        {selectedLearningMaterialGroup?.learning_materials?.length > 0 ?
                                                                selectedLearningMaterialGroup?.learning_materials?.map((learningMaterial, index) => (
                                                                    <li key={index}>
                                                                        <button><i className="icon-BookOpen"></i>{learningMaterial?.title}</button>
                                                                    </li>
                                                                ))
                                                            :
                                                                <li
                                                                    className="text-danger text-center"
                                                                >
                                                                    Learning material not found!
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>
                                            ) : ''
                                        }
                                    </div>
                                ))
                            :
                                <div className="educare-academic-content-management-edit-card-item rounded-[4px] border-[1px] bg-white shadow-[0_3.5px_5.5px_0px_rgb(0,0,0,0.02)]">
                                    <div className="educare-academic-content-management-edit-card-top py-[8px] px-[10px] bg-gray-100">
                                        <p className="text-danger text-center">
                                            Folder Not Found! Please add a new folder.
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                    ) : ''
                }
            </div>
            <AddFolderPopup
                addFolderPopup={addFolderPopup}
                setAddFolderPopup={setAddFolderPopup}
                formData={data}
                handleFilterLearningMaterial={handleFilterLearningMaterial}
            />
            <EditFolderPopup
                editFolderPopup={editFolderPopup}
                setEditFolderPopup={setEditFolderPopup}
                editableData={editableData}
                setEditableData={setEditableData}
                formData={data}
                handleFilterLearningMaterial={handleFilterLearningMaterial}
            />
            <AssignPopup
                assignPopup={assignPopup}
                setAssignPopup={setAssignPopup}
                formData={data}
                handleFilterLearningMaterial={handleFilterLearningMaterial}
                classNames={studentClassNames}
                classrooms={classrooms}
                classSubjects={classSubjects}
                setClassroomData={setClassroomData}
                setClassSubjectData={setClassSubjectData}
            />
        </>
    );
};

export default AcademicContentLeft;
