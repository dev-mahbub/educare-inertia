import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';


export default function CreateQuestionBankPopup({ className = '', createQuestionBank, setCreateQuestionBank }) {

    const {
        data,
        setData,
        delete: destroy,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        title: "",
        description: "",
    });

    const questionBankData = (e) => {
        e.preventDefault();
        post(route('online_exam.save_question_bank'), {
            preserveScroll: true, 
            onSuccess: () => {
                closeModal(e);
            },
        });
    };

    const closeModal = (e) => {
        e.preventDefault();
        setCreateQuestionBank(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={createQuestionBank} onClose={closeModal}>
                    <form onSubmit={questionBankData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper">
                            <div className="educare-popup-form-header py-3">
                                <h5>Create Question Bank</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Name"
                                    />
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
                                        placeHolder="Enter name of question bank"
                                    />
                                    <InputError
                                        message={
                                            errors.name
                                        }
                                        className="mt-2"
                                    />
                                </div>
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
                                        placeholder="Details about question bank"
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

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" type="button" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill">Save</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
