import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import SecondPopup from './SecondPopup';

export default function FirstPopup({ className = '', firstPopup, setFirstPopup }) {
    const [secondPopup, setSecondPopup] = useState(false);
    const handleSecondPopupClick = () => {
        setSecondPopup(!secondPopup);
    };

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    const firstPopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setFirstPopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={firstPopup} onClose={closeModal}>
                    <form onSubmit={firstPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Confirmation</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <p>First Popup Enable</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton className="educare-warning-btn-md-fill" onClick={handleSecondPopupClick}>Second Popup Btn</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill">Save</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
            <SecondPopup
                secondPopup={secondPopup}
                setSecondPopup={setSecondPopup}
            />
        </>
    );
}
