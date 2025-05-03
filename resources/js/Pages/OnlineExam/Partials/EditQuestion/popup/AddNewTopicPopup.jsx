import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from "@inertiajs/react";

export default function AddNewTopicPopup({
    addNewTopic,
    setAddNewTopic,
    formData
 }) {

    const {
        data,
        setData,
        post,
        reset,
        errors,
    } = useForm({
        title: '',
    });

    const addNewTopicData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setAddNewTopic(false);
        reset();
    };

    // handle filter data start
    const handleFilterData = () => {
        const form_data = {
            class_name_id: formData?.class_name_id,
            subject_id: formData?.subject_id
        }

        router.post(route('online_exam.create_question'), form_data);
    }
    // handle filter data end

    // handle save topic start
    const handleOnlineTopicSave = (e) => {
        e.preventDefault();

        data['class_name_id'] = formData?.class_name_id;
        data['subject_id'] = formData?.subject_id;

        post(route('asset.online_topic.save'), {
            onSuccess: () => {
                handleFilterData();
                closeModal();
            },
            onError: () => {
                handleFilterData();
            }
        });
    }
    // handle save topic end


    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6`}>
                <Modal show={addNewTopic} onClose={closeModal} maxWidth='4xl'>
                    <form onSubmit={addNewTopicData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper">
                            <div className="educare-popup-form-header py-3">
                                <h5>Add topic</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-4">
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
                                                placeholder='Topic maximum 100 characters'
                                                maxLength={100}
                                            />
                                            <InputError
                                                message={
                                                    errors.title
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="flex flex-wrap justify-end gap-2.5 pt-7">
                                            <PrimaryButton type='button' className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                                            <PrimaryButton
                                                type='button'
                                                className="educare-primary-btn-md-fill"
                                                onClick={handleOnlineTopicSave}
                                            >
                                                Save
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
