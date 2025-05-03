import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function PublishExamPopup({
    className = '',
    publishExamPopup,
    setPublishExamPopup,
    selectedExam,
    setSelectedExam,
    formData
}) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        patch,
        reset,
        errors,
    } = useForm({
        exam_notice: `Dear student, exam() is assigned to you. Please take exam on time.`,
        is_published: "",
        is_send_message: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            exam_notice: `Dear student, exam(${selectedExam?.exam_title ?? ''}) is assigned to you. Please take exam on time.`,
            is_published: selectedExam?.is_published
        }));
    }, [selectedExam]);

    useEffect(()=> {
        if(!data?.is_published) {
            setData('is_send_message', false)
        }
    },[data.is_published])


    // handle publish popup start
    const handlePublishExam = (e) => {
        e.preventDefault();

        patch(route('online_exam.publish_exam', selectedExam?.id), {
            onSuccess: () => {
                closeModal();

                router.post(route('online_exam.exam_list'), formData);
            },
            onError: () => {
                router.post(route('online_exam.exam_list'), formData);
            }
        });
    };
    // handle publish popup end

    // handle close modal start
    const closeModal = () => {
        setPublishExamPopup(false);
        reset();
        setSelectedExam({});
    };
    // handle close modal end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={publishExamPopup} onClose={closeModal}>
                    <form onSubmit={handlePublishExam} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper  mb-5">
                            <div className="educare-popup-form-header py-3">
                                <h5>Confirm me!</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <p className='mb-5'>Are you sure to publish exam?</p>
                                <div className='grid grid-cols-12 gap-5'>
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                value={
                                                    data.exam_notice
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "exam_notice",
                                                        e.target.value
                                                    )
                                                }
                                                className={`block ${data?.is_published ? 'enabled' : 'disabled'}`}
                                                disabled={!data?.is_published}
                                            />
                                            <InputError
                                                message={
                                                    errors.exam_notice
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    name="is_published"
                                                    checked={
                                                        data.is_published
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "is_published",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <div className='flex items-center gap-1 flex-wrap'>
                                                    <p>Please check this box if you want to publish this exam</p>
                                                    {
                                                        data?.is_published ? (<span className='badge success'>Publish</span>) :
                                                            (<span className='badge danger'>Not Publish</span>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className='inline-block md:flex items-start gap-2'>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="is_send_message"
                                                        checked={
                                                            data.is_send_message
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "is_send_message",
                                                                e.target.checked
                                                            )
                                                        }
                                                        disabled={!data?.is_published}
                                                    />
                                                </div>
                                            </div>
                                            <p>Please check this box if you want to send a web message and a APP notification to the students</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                type="button"
                                className="educare-gray-btn-md-stroke"
                                onClick={closeModal}
                            >
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                type="submit"
                            >
                                OK
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
