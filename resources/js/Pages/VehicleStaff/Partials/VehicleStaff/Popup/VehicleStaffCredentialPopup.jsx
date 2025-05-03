import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function VehicleStaffCredentialPopup({ className = '', staffCredentialPopup, setStaffCredentialPopup }) {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        user_name: '',
        new_password: '',
    });

    const staffCredentialPopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setStaffCredentialPopup(false);
        reset();
    };

    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={staffCredentialPopup} onClose={closeModal}>
                <form onSubmit={staffCredentialPopupData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper">
                        <div className="educare-popup-form-header py-3">
                            <h5>Driver Credential</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <ul>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Current User Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>akhil</span>
                                    </li>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Current Password : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>2323883932</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="user_name"
                                    value="New User Name"
                                />
                                <TextInput
                                    id="user_name"
                                    value={
                                        data.user_name
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "user_name",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.user_name
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="new_password"
                                    value="New Password"
                                />
                                <TextInput
                                    id="new_password"
                                    type="password"
                                    value={
                                        data.new_password
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "new_password",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.new_password
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
