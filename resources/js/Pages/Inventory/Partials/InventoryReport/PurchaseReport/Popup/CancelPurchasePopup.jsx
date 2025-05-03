import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CancelPurchasePopup({
    cancelPurchasePopup,
    setCancelPurchasePopup,
    purchaseId,
    setPurchaseId,
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
        cancel_reason: "",
        purchase_id: "",
    });

    // handle form data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            purchase_id: purchaseId
        }));
    }, [purchaseId]);
    // handle form data end


    // handle cancel purchase success start
    const handleCancelPurchaseSuccess = () => {
        closeModal();

        const form_data = {
            party_account_id: data?.party_account_id ?? '',
            start_date: formData?.start_date,
            end_date: formData?.end_date,
        }

        router.post(route('purchase_report.list'), form_data);
    }
    // handle cancel purchase success end

    // handle purchase cancel form submit start
    const handleCancelPurchase = (e) => {
        e.preventDefault();

        if(data?.cancel_reason != "") {
            patch(route("product_purchase.cancel", purchaseId), {
                preserveScroll: true,
                onSuccess: ({ props }) => handleCancelPurchaseSuccess(),
                onError: () => {
                    const form_data = {
                        party_account_id: data?.party_account_id ?? '',
                        start_date: formData?.start_date,
                        end_date: formData?.end_date,
                    }

                    router.post(route('purchase_report.list'), form_data);
                },
            });
        }
        else {
            toast.error("Cancel reason is required", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    };
    // handle purchase cancel form submit end


    // handle close modal start
    const closeModal = () => {
        setCancelPurchasePopup(false);
        setPurchaseId(null);
        reset();
    };
    // handle close modal end

    return (
        <section className={`educare-admission-follow-up-area space-y-6`}>
            <Modal show={cancelPurchasePopup} onClose={closeModal}>
                <form onSubmit={handleCancelPurchase} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Cancel Purchase</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
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
                                    id="cancel_reason"
                                    value={
                                        data.cancel_reason
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

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton className="educare-gray-btn-md-stroke" type="button" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton className="educare-primary-btn-md-fill" type="submit">Save</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
