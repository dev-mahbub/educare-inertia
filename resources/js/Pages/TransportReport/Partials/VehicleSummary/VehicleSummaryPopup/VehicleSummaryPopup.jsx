import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TextareaInput from '@/Components/TextareaInput';
import SuccessButton from '@/Components/SuccessButton';

export default function VehicleSummaryPopup({ className = '', vehiclePopup, setVehiclePopup }) {


    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    const vehiclePopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setVehiclePopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={vehiclePopup} onClose={closeModal}>
                    <form onSubmit={vehiclePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Compose Message</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="col-span-12 md:col-span-6">
                                    <div className='flex justify-end gap-2 mb-2'>
                                        <SuccessButton
                                            // disabled={processing}
                                            className="educare-secondary-btn-md-fill"
                                        >
                                            Sms Count: 1
                                        </SuccessButton>
                                        <SuccessButton
                                            // disabled={processing}
                                            className="educare-success-btn-md-fill"
                                        >
                                            Length: 1
                                        </SuccessButton>
                                    </div>
                                    <div className="educare-input-field-styles">
                                        <TextareaInput
                                            value={
                                                data.dummy_textarea_1
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "dummy_textarea_1",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeHolder="Write a Message..."
                                        />
                                        <InputError
                                            message={
                                                errors.dummy_1
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill">
                                <i className="icon-email mr-1"></i>
                                Send
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
