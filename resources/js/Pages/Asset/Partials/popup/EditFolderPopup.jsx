import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function EditFolderPopup({
    editFolderPopup,
    setEditFolderPopup,
    editableData,
    setEditableData,
    formData,
    handleFilterLearningMaterial
 }) {

    const {
        data,
        setData,
        delete: destroy,
        put,
        processing,
        reset,
        errors,
    } = useForm({
        title: editableData?.title ?? '',
        description: editableData?.description ?? ''
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            title: editableData?.title ?? '',
            description: editableData?.description ?? ''
        }));
    }, [editableData]);

    const editFolderPopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setEditFolderPopup(false);
        setEditableData({});
        reset();
    };

    // handle update learning material group start
    const handleLearningMaterialGroupUpdate = (e) => {
        e.preventDefault();

        data['class_name_id'] = formData?.class_name_id;
        data['subject_id'] = formData?.subject_id;

        put(route('asset.learning_material_group.update', editableData?.id), {
            onSuccess: () => {
                closeModal();
                handleFilterLearningMaterial();
            },
            onError: () => {
                handleFilterLearningMaterial();
            }
        });
    }
    // handle update learning material group end


    // handle delete learning material group start
    const handleLearningMaterialGroupDelete = (id) => {
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
                router.delete(route('asset.learning_material_group.delete', id), {
                    onSuccess: () => {
                        closeModal();
                        handleFilterLearningMaterial();
                    },
                    onError: () => {
                        handleFilterLearningMaterial();
                    }
                });
            }
        });
    }
    // handle delete learning material group end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6`}>
                <Modal show={editFolderPopup} onClose={closeModal}>
                    <form onSubmit={editFolderPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className='pt-2'>
                                <h5 className='text-heading font-semibold text-[20px]'>Create a Folder</h5>
                                <h3 className='text-headingLight font-[500]'>Create a group for your learning material</h3>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        value="Title"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextInput
                                                value={
                                                    data?.title
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                placeHolder='Title-maximum 100 characters'
                                                maxLength="100"
                                            />
                                            <InputError
                                                message={
                                                    errors.title
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Description"
                                            />
                                            <TextareaInput
                                                value={
                                                    data?.description
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                placeHolder='Description-maximum 200 characters'
                                                maxLength="200"
                                            />
                                            <InputError
                                                message={
                                                    errors.description
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                type='button'
                                className="educare-danger-btn-md-fill"
                                onClick={() => {
                                    handleLearningMaterialGroupDelete(editableData?.id)
                                }}
                            >
                                Delete
                            </PrimaryButton>
                            <PrimaryButton type='button' className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton
                                type='button'
                                className="educare-primary-btn-md-fill"
                                onClick={handleLearningMaterialGroupUpdate}
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
