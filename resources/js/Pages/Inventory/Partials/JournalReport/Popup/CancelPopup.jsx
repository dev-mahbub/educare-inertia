import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CancelPopup({
    className = '',
    cancelPopup,
    setCancelPopup,
    selectedJournal,
    setSelectedJournal,
    formData
}) {

    const {
        data,
        setData,
        patch,
        processing,
        reset,
        errors,
    } = useForm({
        cancel_reason: ''
    });

    const cancelPopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setCancelPopup(false);
        reset();
        setSelectedJournal({});
    };


    // handle approve staff salary payment start
    const handleCancelJournal = (e) => {
        e.preventDefault();

        if(data?.cancel_reason == '') {
            toast.error('Please specify the reason!', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            patch(route('journal.cancel', selectedJournal?.id), {
                onSuccess: () => {
                    closeModal();

                    const form_data = {
                        start_date: formData?.start_date,
                        end_date: formData?.end_date,
                    }

                    router.post(route('journal.journal_report'), form_data);
                }
            });
        }

    }
    // handle approve staff salary payment end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={cancelPopup} onClose={closeModal}>
                    <form onSubmit={cancelPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Cancel Journal</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-4 mb-2.5">
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="cancel_reason"
                                                        value="Reason"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextareaInput
                                                value={
                                                    data?.cancel_reason
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "cancel_reason",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.cancel_reason
                                                }
                                                className="mt-2"
                                            />
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
                                type="button"
                                onClick={(e) => {
                                    handleCancelJournal(e);
                                }}
                            >
                                Ok
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
