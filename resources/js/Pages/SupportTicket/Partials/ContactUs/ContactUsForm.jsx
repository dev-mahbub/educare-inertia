import React from "react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import TextareaInput from '@/Components/TextareaInput';
import PrimaryButton from '@/Components/PrimaryButton';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactUsForm({auth, siteData, ContactReasons, currentSchoolInfo}) {
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
        parent_name: "",
        request_type: "",
        parent_phone: "",
        details: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('support_ticket.contactus.save'), {
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
        <div className="front-container">
            <h3 className="text-center text-[35px] sm:text-[40px] text-heading mb-[20px]">Contact Us</h3>
            <div className="message-btn login-quad-box my-[40px]">
                <div className="login-box">
                    <a href='#' target="_blank">
                        <i className="icon-academic"></i>
                        <p>School No.</p> 
                        <p>{currentSchoolInfo?.school_number ?? ''}</p>
                    </a>    
                </div>
                <div className="login-box">
                    <a href="#" target="_blank">
                        <i className="icon-PhoneCall"></i>
                        <p>Contact</p>
                        <p>{currentSchoolInfo?.phone ?? ''}</p>
                    </a>
                </div>
                <div className="login-box">
                    <a href="#" target="_blank">
                    <i className="icon-DeviceMobile"></i>
                        <p>Emergency No.</p>
                        <p>{currentSchoolInfo?.phone_2 ?? ''}</p>
                    </a>
                </div>
                <div className="login-box">
                    <a href="#" target="_blank">
                        <i className="icon-email"></i>
                        <p>Email</p>
                        <p>{currentSchoolInfo?.mail ?? ''}</p>
                    </a>
                </div>
            </div>
            <div className="educare-quick-report-area">
                <div className="grid grid-cols-12 gap-7">
                    <div className="col-span-12 lg:col-span-6">
                        <div className="educare-common-card">
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
                                <h4 className="text-[24px] sm:text-[28px] text-heading mb-5">Contact School Admin</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Request Reason"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    data_label="Request Type"
                                                    data={ContactReasons}
                                                    value={
                                                        data.request_type
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "request_type",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.request_type
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12  md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Student Name"
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
                                                    placeHolder='Student Name'
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12  md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Parent Name"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    value={
                                                        data.parent_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "parent_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Father's Name"
                                                />
                                                <InputError
                                                    message={
                                                        errors.parent_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Phone"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
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
                                                    placeHolder="Father's Phone"
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
                                                <InputLabel
                                                    value="Reason of Contacting School"
                                                />
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
                                                    placeholder='Reason of Contacting School'
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
                                                    type="button"
                                                    onClick={(e) => handleReset(e)}
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
                    <div className="col-span-12 lg:col-span-6">
                        <div className="border-b border-border pb-[30px]">
                            <h4 className="text-[24px] sm:text-[28px] text-heading mb-5">Trying to reach school Admin?</h4>
                            <p className="text-headingLight">Please fill form here to reach school for your Login, sibling, TC, Fees OR any other issues.</p>
                        </div>
                        <div className="pt-[20px]">
                            <h4 className="text-[24px] sm:text-[28px] text-heading mb-5">
                                {currentSchoolInfo?.title ?? ''}
                            </h4>
                            <p className="text-headingLight">{currentSchoolInfo?.title ?? ''} <br /> {currentSchoolInfo?.street_address ?? ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}