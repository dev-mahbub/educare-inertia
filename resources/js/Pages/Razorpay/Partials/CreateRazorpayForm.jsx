import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';

const CreateRazorpayForm = ({orderId, keyId, classNames = ''}) => {
    //handle form with useform start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        order_id: orderId
    });
    //handle form with useform end



    const gradingFormData = (e) => {
        e.preventDefault();
        post(route("razorpay.payment_submission"), {
            preserveScroll: true,
            onSuccess: () => handleRest(),
        });
    };
    // handle save question end

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-info"></i>
                            Test Razorpay Payment
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12 gap-5">
                            <form onSubmit={gradingFormData}>
                            <input type="hidden" name="order_id" value={orderId} />
                            <TextInput
                                id="user_id"
                                value={orderId}
                                type="hidden"
                                className="block"
                                required
                            />
                            <script src="https://checkout.razorpay.com/v1/checkout.js" data-key={keyId}></script>
                            <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="scale_name"
                                                            value="Scale Name"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="order_id"
                                                    value={data.order_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "order_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.scale_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                 
                                                <PrimaryButton
                                                    className="educare-primary-btn-lg-fill"
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    {data?.id
                                                        ? "Update"
                                                        : "Save"}
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateRazorpayForm;
