import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextareaInput from '@/Components/TextareaInput';
import SelectInput from '@/Components/SelectInput';
import Checkbox from '@/Components/Checkbox';

export default function SendStudentMessagePopup({ className = '', messagePopup, setMessagePopup }) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        title: "",
        message: "",
        is_use_tags: true,
        student_name: "",
        father_name: "",
        mother_name: "",
        class_name: "",
        admission_no: "",
        registration_no: "",
        cheque_no: "",
        cheque_date: "",
        amount: "",
        bank_name: "",
    });

    const messagePopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setMessagePopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={messagePopup} onClose={closeModal}>
                    <form onSubmit={messagePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Compose sms</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles max-w-[300px]">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Title"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label=""
                                        data={[]}
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
                                    />
                                    <InputError
                                        message={
                                            errors.title
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Message"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextareaInput
                                        value={
                                            data.message
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "message",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.message
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document max-w-[100px]">
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="is_use_tags"
                                            value="Use Tags"
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="is_use_tags"
                                            name="is_use_tags"
                                            checked={
                                                data.is_use_tags
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "is_use_tags",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                {
                                    data.is_use_tags === true && <div className='grid grid-cols-12 gap-2'>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="student_name"
                                                        name="student_name"
                                                        checked={
                                                            data.student_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_name",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="student_name"
                                                        value="Student Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="father_name"
                                                        name="father_name"
                                                        checked={
                                                            data.father_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_name",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="father_name"
                                                        value="Father Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="mother_name"
                                                        name="mother_name"
                                                        checked={
                                                            data.mother_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_name",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="mother_name"
                                                        value="Mother Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="class_name"
                                                        name="class_name"
                                                        checked={
                                                            data.class_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "class_name",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="class_name"
                                                        value="Class Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="admission_no"
                                                        name="admission_no"
                                                        checked={
                                                            data.admission_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "admission_no",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="admission_no"
                                                        value="Admission Number"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="registration_no"
                                                        name="registration_no"
                                                        checked={
                                                            data.registration_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "registration_no",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="registration_no"
                                                        value="Registration Number"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="cheque_no"
                                                        name="cheque_no"
                                                        checked={
                                                            data.cheque_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "cheque_no",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="cheque_no"
                                                        value="Cheque No"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="cheque_date"
                                                        name="cheque_date"
                                                        checked={
                                                            data.cheque_date
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "cheque_date",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="cheque_date"
                                                        value="Cheque Date"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="amount"
                                                        name="amount"
                                                        checked={
                                                            data.amount
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "amount",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="amount"
                                                        value="Amount"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="bank_name"
                                                        name="bank_name"
                                                        checked={
                                                            data.bank_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "bank_name",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="bank_name"
                                                        value="Bank Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill">
                                <i className='icon-email mr-1'></i>
                                Send
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
