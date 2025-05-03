import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function CancelRefundPopup({ modalCancelRefundOpen, setModalCancelRefundOpen, selectedRefund  = {}}) {

    const {
        data,
        setData,
        errors,
        patch,
        reset,
    } = useForm({
        cancellation_reason: "",
    });

    const closeModal = () => {
        setModalCancelRefundOpen(false);
    };

    const cancelRefundData = (e) => {
        e.preventDefault();

        patch(route("fee_refund.update", selectedRefund?.id), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                reset();
                closeModal();
            },
            onError: (errors) => {

            },
        });
    };

    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={modalCancelRefundOpen} onClose={closeModal}>
                <div className="educare-popup-form-wrapper-main p-[30px] pt-2.5">
                    <form onSubmit={cancelRefundData}>
                        <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Cancel Refund Fee</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="cancellation_reason"
                                                value="Reason"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="cancellation_reason"
                                        value={
                                            data.cancellation_reason
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "cancellation_reason",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.cancellation_reason
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton type="button" className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill">Save</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    );
}
