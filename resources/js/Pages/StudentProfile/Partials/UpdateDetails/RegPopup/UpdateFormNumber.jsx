import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function UpdateFormNumber({ className = '', formNumberPopup, setFormNumberPopup }) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        form_number: '',
    });

    const updateFormNumberData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setFormNumberPopup(false);
        reset();
    };

    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={formNumberPopup} onClose={closeModal}>
                <form onSubmit={updateFormNumberData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Confirmation</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <div className="grid grid-cols-12 gap-x-5">
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Name : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>Akhil</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Class : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>II</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Father Name : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>Gopal</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Mobile No : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>2323883932</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-span-12">
                                        <ul>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Current Form No : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>2548</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="form_number"
                                    value="Enter New Form Number"
                                />
                                <TextInput
                                    id="form_number"
                                    value={
                                        data.form_number
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "form_number",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.form_number
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton className="educare-primary-btn-md-fill">Update</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
