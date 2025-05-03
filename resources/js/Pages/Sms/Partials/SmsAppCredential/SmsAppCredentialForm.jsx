import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';

import { Link, useForm } from '@inertiajs/react';
import React from 'react';

const SmsAppCredentialForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_audience: "",
    });
    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="flex justify-between gap-5 flex-wrap">
                        <div className="flex gap-5">
                            <div className='flex gap-1 items-center text-headingLight text-[16px]'>
                                <i className='icon-email'></i>
                                <span className='text-[14px]'>Send Web logins</span>
                            </div>
                            <Link href='#' className='text-[14px] text-primary hover:underline'>Get help</Link>
                        </div>
                        <div className='flex gap-5 text-headingLight text-[14px]'>
                            <span>( Available : 0 )</span>
                            <span>( Consumed : 0 )</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 md:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Audience"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Audience"
                                        data={[]}
                                        value={
                                            data.select_audience
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "select_audience",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.select_audience
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-notes my-2">
                                    <ul>
                                        <li> <strong>Note:</strong> We will send below message to all users</li>
                                        <li> {"Dear Parent, Login http://{#var#}.scientificstudy.in UserName {#var#} and password {#var#}"}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <PrimaryButton
                                        className="educare-gray-btn-lg-stroke"
                                    >
                                        Reset
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                    >
                                        Send Phone App Logins
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="educare-input-field-notes my-2">
                <ul>
                    <li> <strong>Note:</strong></li>
                    <li className='mb-1'>
                        <span className='font-semibold text-danger'> 1. The above message is approved by DLT for sender ID - <span className='text-warning'>SSTUDY</span>. We will send this message with a dynamic username, password and link. In case if your sender id is different. Please approve the same message in your DLT (if school sender id is different)</span>
                    </li>
                    <li className='mb-1'> 2. If english sms characters is 160 or less then sms count will be 1 otherwise sms count will be increased at multiple of 153 characters.</li>
                    <li className='mb-1'>3. Non english sms characters is 70 or less then sms count will be 1 otherwise sms count will be increased at multiple of 64 characters.</li>
                    <li>4. Message length also includes your SMS Signature. You Can also send messages in your local languages.</li>
                </ul>
            </div>
        </>
    );
};

export default SmsAppCredentialForm;