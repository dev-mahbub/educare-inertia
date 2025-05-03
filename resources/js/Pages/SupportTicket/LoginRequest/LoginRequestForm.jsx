import React from "react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import DatePicker from "react-datepicker";
import TextareaInput from '@/Components/TextareaInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginRequestForm({classrooms, currentSchoolInfo}) {
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
        student_first_name: "",
        student_last_name: "",
        admission_no: "",
        parent_phone: "",
        classroom_id: "",
        father_first_name: "",
        father_last_name: "",
        details: "",
    });

    const formatFullName = (firstName, lastName) => `${firstName} ${lastName}`.trim();

    const handleSubmit = (e) => {
        e.preventDefault();

        data['student_name'] = formatFullName(data.student_first_name, data.student_last_name);
        data['parent_name'] = formatFullName(data.father_first_name, data.father_last_name);
        
        post(route('support_ticket.login_request.save'), {
            data: data,
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
            <h3 className="text-center text-[35px] sm:text-[40px] text-heading mb-[20px]">Request For Login Details</h3>
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

                            { Object.keys(errors).length > 0 && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    <span className="block sm:inline">
                                        {Object.keys(errors).map((key) => (
                                            <div key={key}>{errors[key]}</div>
                                        ))}
                                    </span>
                                </div>
                            )}

                                <h4 className="text-[24px] sm:text-[28px] text-heading mb-5">Login Request</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Class"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={
                                                        data.classroom_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "classroom_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.classroom_id
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
                                                            value="Admission Number"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    value={
                                                        data.admission_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "admission_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder='Admission Number'
                                                />
                                                <InputError
                                                    message={
                                                        errors.admission_no
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
                                                            value="Student First Name"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    value={
                                                        data.student_first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder='Student First Name'
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Student Last Name"
                                                />
                                                <TextInput
                                                    value={
                                                        data.student_last_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder='Student Last Name'
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_last_name
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
                                                            value="Father First Name"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    value={
                                                        data.father_first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder='Father First Name'
                                                />
                                                <InputError
                                                    message={
                                                        errors.father_first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Father Last Name"
                                                />
                                                <TextInput
                                                    value={
                                                        data.father_last_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder='Father Last Name'
                                                />
                                                <InputError
                                                    message={
                                                        errors.father_last_name
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
                                                            value="Phone No"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
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
                                                    placeHolder='Phone'
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
                                                    value="details"
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
                                                    placeholder='details'
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
                            <h4 className="text-[24px] sm:text-[28px] text-heading mb-5">Request login details here</h4>
                            <p className="text-headingLight">We understand that we need to send your user ID and password to you. Please request here andour school admin will send details to you after verification</p>
                        </div>
                        <div className="pt-[20px]">
                            <h4 className="text-[24px] sm:text-[28px] text-heading mb-5"> {currentSchoolInfo?.title ?? ''}</h4>
                            <p className="text-headingLight">{currentSchoolInfo?.street_address ?? ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}