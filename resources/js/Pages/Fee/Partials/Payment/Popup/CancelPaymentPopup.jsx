import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CancelPaymentPopup({
    cancelPaymentPopup,
    setCancelPaymentPopup,
    paymentMethodId,
    studentId,
    getStudentFeeInstallments
 }) {
    const {
        data,
        setData,
        delete: destroy,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        cancel_reason: "",
        student_id: "",
        payment_method_id: "",
    });

    // handle form data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
           payment_method_id: paymentMethodId,
           student_id: studentId
        }))
    }, [paymentMethodId, studentId]);
    // handle form data end


    // handle cancel payment success start
    const handleCancelPaymentSuccess = () => {
        closeModal();

        const form_data = {
            student_id: studentId,
            request_type: "fetch_fee_installments",
        }

        getStudentFeeInstallments(form_data);
    }
    // handle cancel payment success end

    // handle fee payment cancel form submit start
    const handleCancelPayment = (e) => {
        e.preventDefault();

        if(data?.cancel_reason != "") {
            post(route("fee.cancel_fee_payment"), {
                preserveScroll: true,
                onSuccess: ({ props }) => handleCancelPaymentSuccess(),
                onError: (errors) => {

                },
            });
        }
        else {
            toast.error("Payment cancel reason is required", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    };
    // handle fee payment cancel form submit end


    // handle close modal start
    const closeModal = () => {
        setCancelPaymentPopup(false);
        reset();
    };
    // handle close modal end

    return (
        <section className={`educare-admission-follow-up-area space-y-6`}>
            <Modal show={cancelPaymentPopup} onClose={closeModal}>
                <form onSubmit={handleCancelPayment} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Cancel Fee Payment</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="nullify_reason"
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
