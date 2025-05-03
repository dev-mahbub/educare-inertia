import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AddMaterial from './AddMaterial';
import ShowResourse from './ShowResourse';

const AcademicContentRight = ({
    data,
    setData,
    errors,
    formFields,
    setFormFields,
    selectedLearningMaterialGroup,
    user,
    onlineTopics,
    materialResourse,
    setMaterialResourse,
    resourceTypes,
    handleFilterLearningMaterial,
    classrooms,
    classSubjects,
    setClassroomData,
    setClassSubjectData,
    studentClassNames,
    classNames,
    shareLearningMaterialGroups
 }) => {

    const [selectedLearningMaterialId, setSelectedLearningMaterialId] = useState(null);
    const [selectedLearningMaterial, setSelectedLearningMaterial] = useState({});
    const [classroomIds, setClassroomIds] = useState([]);

    //handle add material
    const handleAddMaterial = (materialResourse) => {
        setMaterialResourse(materialResourse);
        setFormFields([]);
        setSelectedLearningMaterial({});

        setData((prevData) => ({
            ...prevData,
            title: "",
            online_topic_id: "",
            content: "",
            resources: []
        }));

        setClassroomData([]);
        setClassSubjectData([]);
    }

    useEffect(() => {
        setSelectedLearningMaterial(selectedLearningMaterialGroup?.learning_materials?.find(item => item?.id == selectedLearningMaterialId) ?? {});

    }, [selectedLearningMaterialId, selectedLearningMaterialGroup]);


    // handle learning material delete start
    const handleLearningMaterialDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('asset.learning_material.delete', id), {
                    onSuccess: () => {
                        setMaterialResourse('material');
                        setData((prevData) => ({
                            ...prevData,
                            title: "",
                            online_topic_id: "",
                            content: "",
                            resources: []
                        }));
                        setFormFields([]);
                        handleFilterLearningMaterial();
                    },
                    onError: () => {
                        handleFilterLearningMaterial()
                    }
                });
            }
        });
    }
    // handle learning material delete end

    return (
        <>
            {
                data?.class_name_id && data?.subject_id ? (<div className="educare-academic-content-management-right pt-[25px] px-[30px] pb-[30px] bg-white border-t-3 shadow-[0_3.5px_5.5px_0px_rgb(0,0,0,0.02)] rounded-lg">
                    <div className="educare-academic-content-management-table-top py-[8px] px-[10px mb-[15px]">
                        <div className="flex items-center justify-between flex-wrap gap-[10px]">
                            <div className="flex items-center gap-[5px]">
                                <span><i className="icon-FolderSimple text-[30px]"></i></span>
                                <h6 className="text-[16px] font-semibold">{selectedLearningMaterialGroup?.id != null ? selectedLearningMaterialGroup?.title : 'Add Folder'}</h6>
                            </div>
                            {
                                selectedLearningMaterialGroup?.id != null && (<div className="educare-academic-content-management-btn flex gap-[5px]">
                                    <button
                                        type="button"
                                        className='px-[12px] pt-[2px] pb-[3px] text-[14px] text-primary rounded-[30px] border border-primary'
                                    >
                                        <span className="text-[12px]"></span>
                                        {selectedLearningMaterialGroup?.learning_materials?.length} Material
                                    </button>
                                    <button
                                        type="button"
                                        className='px-[12px] pt-[2px] pb-[3px] text-[14px] text-white rounded-[30px] bg-primary'
                                        onClick={() => handleAddMaterial('material')}
                                    >
                                        <span className="text-[12px]"><i className="icon-plus mr-1"></i></span>
                                        Add Material
                                    </button>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="educare-academic-content-management-table-list h-[300px] overflow-y-auto mb-[25px]">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl.No.</th>
                                    <th>Title</th>
                                    <th>Topic</th>
                                    <th>Owner</th>
                                    <th>Tools</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedLearningMaterialGroup?.id != null && selectedLearningMaterialGroup?.learning_materials?.length > 0 ? (
                                        selectedLearningMaterialGroup?.learning_materials?.map((item, index) => <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {item?.title}
                                            </td>
                                            <td>
                                                {item?.online_topic?.title}
                                            </td>
                                            <td>
                                                {`${item?.user?.first_name ?? ''} ${item?.user?.middle_name ?? ''} ${item?.user?.last_name ?? ''}`}
                                            </td>
                                            <td>
                                                <div className="educare-academic-content-management-table-btn">
                                                    <button
                                                        type="button"
                                                        className=" text-supportingA"
                                                        onClick={() => {
                                                            handleAddMaterial('edit')
                                                            // setSelectedLearningMaterial(item)
                                                            setSelectedLearningMaterialId(item?.id)
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    {item?.user_id == user?.id &&
                                                        <button
                                                            type="button"
                                                            className=" text-supportingB"
                                                            onClick={() => {
                                                                handleLearningMaterialDelete(item?.id)
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    }
                                                </div>
                                            </td>
                                        </tr>)
                                    ) : <tr>
                                        <td
                                            colSpan={5}
                                        >
                                            <span
                                                className="text-danger text-center"
                                            >
                                                Learning material not found!
                                            </span>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        selectedLearningMaterialGroup?.id != null && materialResourse === 'material' ? (
                            <AddMaterial
                                data={data}
                                setData={setData}
                                errors={errors}
                                formFields={formFields}
                                setFormFields={setFormFields}
                                onlineTopics={onlineTopics}
                                selectedLearningMaterialGroup={selectedLearningMaterialGroup}
                                resourceTypes={resourceTypes}
                                handleFilterLearningMaterial={handleFilterLearningMaterial}
                                />
                            ) : (selectedLearningMaterialGroup?.id != null && materialResourse === 'edit' ? (<ShowResourse
                                data={data}
                                setData={setData}
                                errors={errors}
                                onlineTopics={onlineTopics}
                                resourceTypes={resourceTypes}
                                formFields={formFields}
                                setFormFields={setFormFields}
                                selectedLearningMaterial={selectedLearningMaterial}
                                user={user}
                                setSelectedLearningMaterial={setSelectedLearningMaterial}
                                setMaterialResourse={setMaterialResourse}
                                selectedLearningMaterialGroup={selectedLearningMaterialGroup}
                                handleFilterLearningMaterial={handleFilterLearningMaterial}
                                classrooms={classrooms}
                                classSubjects={classSubjects}
                                classroomIds={classroomIds}
                                setClassroomIds={setClassroomIds}
                                setClassroomData={setClassroomData}
                                setClassSubjectData={setClassSubjectData}
                                classNames={classNames}
                                studentClassNames={studentClassNames}
                                shareLearningMaterialGroups={shareLearningMaterialGroups}
                        />) : '')
                    }
                </div>) : ''
            }

        </>
    );
};

export default AcademicContentRight;
