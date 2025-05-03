import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AssignPopup({
    assignPopup,
    setAssignPopup,
    formData,
    handleFilterLearningMaterial,
    classNames,
    classrooms,
    classSubjects,
    setClassroomData,
    setClassSubjectData
}) {

    const [classroomIds, setClassroomIds] = useState([]);

    const {
        data,
        setData,
        delete: destroy,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        type: 'all_group',
        student_class_name_id: "",
        class_subject_id: "",
        classroom_ids: classroomIds,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_ids: classroomIds
        }));
    }, [classroomIds]);

    const assignPopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setAssignPopup(false);
        setData((prevData) => ({
            ...prevData,
            student_class_name_id: "",
            class_subject_id: "",
            classroom_ids: [],
        }));
        setClassroomData([]);
        setClassSubjectData([]);
        setClassroomIds([]);
    };

    // handle assign classroom learning material start
    const handleAssignClassroomLearningMaterial = (e) => {
        e.preventDefault();

        data['class_name_id'] = formData?.class_name_id;
        data['subject_id'] = formData?.subject_id;

        post(route('asset.classroom_learning_material.save'), {
            onSuccess: () => {
                handleFilterLearningMaterial();
                closeModal();
            },
            onError: () => {
                handleFilterLearningMaterial();
            }
        })
    }
    // handle assign classroom learning material end

    // handle change class start
    const handleChangeClass = (id) => {
        setData((prevData) => ({
            ...prevData,
            student_class_name_id: id,
            class_subject_id: ""
        }));

        setClassroomData([]);
        setClassSubjectData([]);
        setClassroomIds([]);

        const form_data = {
            class_name_id: formData?.class_name_id,
            subject_id: formData?.subject_id,
            student_class_name_id: id,
        }

        router.post(route('asset.create'), form_data);
    }
    // handle change class end

    // handle Classroom Checkbox start
    const handleCheckboxSelect = (value) => {
        let updatedClassroomIds = [...classroomIds];

        if (classroomIds?.includes(value)) {
            updatedClassroomIds = updatedClassroomIds?.filter(item => item != value);
        }
        else {
            updatedClassroomIds = [...updatedClassroomIds, value];
        }

        setClassroomIds(updatedClassroomIds)
    };
    // handle Classroom Checkbox end


    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6`}>
                <Modal show={assignPopup} onClose={closeModal}>
                    <form onSubmit={assignPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className='pt-2'>
                                <h5 className='text-heading font-semibold text-[20px]'>Assign All Folder</h5>
                                <h3 className='text-headingLight font-[500]'>Assign All Folders and Materials to Students</h3>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Student Class"
                                            />
                                            <SelectInput
                                                data_label="Class"
                                                data={classNames}
                                                value={
                                                    data?.student_class_name_id
                                                }
                                                onChange={(e) =>
                                                    handleChangeClass(e.target.value)
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.student_class_name_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Student Subject"
                                            />
                                            <SelectInput
                                                data_label="Subject"
                                                data={classSubjects}
                                                value={
                                                    data.class_subject_id
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "class_subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.class_subject_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                        {
                                            data?.student_class_name_id ? (
                                                classrooms?.map((item, index) => (
                                                    <div key={index} className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`classroom_id_${item?.id}`}
                                                                name={`classroom_id_${item?.id}`}
                                                                checked={
                                                                    classroomIds?.includes(item?.id)
                                                                }
                                                                onChange={() =>
                                                                    handleCheckboxSelect(item?.id)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`classroom_id_${item?.id}`}
                                                                value={item?.title}
                                                            />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton type='button' className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            {
                                data?.class_subject_id && data?.classroom_ids?.length > 0 ? (
                                    <PrimaryButton
                                        type='button'
                                        className="educare-primary-btn-md-fill"
                                        onClick={handleAssignClassroomLearningMaterial}
                                    >
                                        Assign
                                    </PrimaryButton>
                                ) : ''
                            }
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
