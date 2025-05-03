import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

export default function TeacherCredentialPopup({ className = '', teacherCredentialPopup, setTeacherCredentialPopup }) {
    const [showUser, setShowUser] = useState(false);
    const toggleUserVisibility = () => {
        setShowUser(!showUser);
    };

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        student_context_id: '',
        student_notes_id: '',
    });

    const teacherCredentialPopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setTeacherCredentialPopup(false);
        reset();
    };

    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={teacherCredentialPopup} onClose={closeModal}>
                <form onSubmit={teacherCredentialPopupData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Confirmation</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <span className='bg-primary/10 px-4 block text-center py-2 text-heading font-semibold mb-3 rounded'>Are you sure to Send username and password to teacher ?</span>
                                <ul>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Email : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>akhil@gmail.com</span>
                                    </li>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Mobile No. : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>2323883932</span>
                                    </li>
                                   {showUser &&
                                   <>
                                    <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Username : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>T5430</span>
                                        </li>
                                        <li>
                                            <span className='text-[16px] font-normal text-headingLightest'>Password : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>7082186</span>
                                        </li>
                                    </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton className="educare-secondary-btn-md-fill" onClick={toggleUserVisibility}>{showUser ? 'Hide' : 'Show'}</PrimaryButton>
                        <PrimaryButton className="educare-success-btn-md-fill">Send Email</PrimaryButton>
                        <PrimaryButton className="educare-primary-btn-md-fill">Send Sms</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
