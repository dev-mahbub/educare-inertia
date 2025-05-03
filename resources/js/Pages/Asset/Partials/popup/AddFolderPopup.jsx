import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { useForm } from '@inertiajs/react';

export default function AddFolderPopup({
    addFolderPopup,
    setAddFolderPopup,
    formData,
    handleFilterLearningMaterial
}) {

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
        description: '',
    });

    const addFolderPopupData = (e) => {
        e.preventDefault();
    };

    // handle save learning material group start
    const handleLearningMaterialGroupSave = (e) => {
        e.preventDefault();

        data['class_name_id'] = formData?.class_name_id;
        data['subject_id'] = formData?.subject_id;

        post(route('asset.learning_material_group.save'), {
            onSuccess: () => {
                closeModal();
                handleFilterLearningMaterial();
            },
            onError: () => {
                handleFilterLearningMaterial();
            }
        });
    };
    // handle save learning material group end

    const closeModal = () => {
        setAddFolderPopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6`}>
                <Modal show={addFolderPopup} onClose={closeModal}>
                    <form onSubmit={addFolderPopupData} className="p-[30px] pt-2.5">
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
                                                    data.title
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
                                                    data.description
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                placeholder='Description-maximum 200 characters'
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
                            <PrimaryButton type='button' className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton
                                type='button'
                                className="educare-primary-btn-md-fill"
                                onClick={handleLearningMaterialGroupSave}
                            >
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
