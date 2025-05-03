import React from "react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import TextareaInput from '@/Components/TextareaInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function FeedbackForm() {
    const { flash } = usePage().props;
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        student_name: "",
        request_type: "Feedback",
        details: "",
        parent_phone: "",
    });

    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('support_ticket.parent_feedback.save'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    }

    const handleReset = (e) => {
        e.preventDefault();
        reset();
    }
    return (
        <div>
            <h3 className="text-center text-[35px] sm:text-[40px] text-heading mb-[20px]">Feedback & Suggestions</h3>
            <div className="educare-quick-report-area mb-[55px] flex justify-center">
                <div className="educare-common-card max-w-[750px] w-full">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        { flash.message && (  
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <span className="block sm:inline">{flash.message}</span>
                            </div>
                        )}
                        { flash.error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <span className="block sm:inline">{flash.error}</span>
                            </div>
                        )}
                        <h4 className="text-[24px] sm:text-[28px] text-heading mb-5">Provide your feedback...</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Your Name"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            value={
                                                data.student_name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "student_name",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeHolder='Your Name'
                                        />
                                        <InputError
                                            message={
                                                errors.student_name
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            value="Phone Number"
                                        />
                                        <TextInput
                                            type="number"
                                            value={
                                                data.parent_phone
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "parent_phone",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeHolder='Phone Number'
                                        />
                                        <InputError
                                            message={
                                                errors.parent_phone
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Your Feedback & Suggestions"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextareaInput
                                            value={
                                                data.details
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "details",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeholder="Your Feedback & Suggestions"
                                        />
                                        <InputError
                                            message={
                                                errors.details
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                        <PrimaryButton
                                        type='button'
                                        onClick={handleReset}
                                            className="educare-gray-btn-lg-stroke"
                                        >
                                            Reset
                                        </PrimaryButton>
                                        <PrimaryButton
                                            type="submit"
                                            className="educare-primary-btn-lg-fill"
                                        >
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}