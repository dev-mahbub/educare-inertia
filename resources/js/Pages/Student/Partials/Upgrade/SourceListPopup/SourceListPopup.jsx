import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SourceListPopup({ className = '', sourceListPopup, setSourceListPopup }) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    const sourceListPopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setSourceListPopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={sourceListPopup} onClose={closeModal}>
                    <form onSubmit={sourceListPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5">
                            <div className="educare-popup-form-header py-3">
                                <h5>Upgrade Student</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <h5 className='text-headingLight font-semibold'>Fee structure of Target academic year is Non-Template based</h5>
                                <h5 className='text-success'>Fee structure is created for target class/academic year Upgraded student will have fee structure</h5>
                                <h5 className='text-headingLight'>Do you really want 2 move student from 2023-2024 to academic year 2030-2031?</h5>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-primary-btn-md-fill">Yes</PrimaryButton>
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>No</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
