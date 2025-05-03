import React from "react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import 'react-toastify/dist/ReactToastify.css';

export default function StaffAttendanceForm({currentSchoolInfo, messageData}) {
    const { flash } = usePage().props;
    const {
        data,
        setData,
        errors,
        post,
        reset
    } = useForm({
        employee_id: "",
        make_attendance: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('support_ticket.staff_attendance'), {
            data: data,
            preserveScroll: true,
            onSuccess: () => {
                setData('make_attendance', '');
            }
        });
    }

    const handleReset = (e) => {
        e.preventDefault();
        reset();
    }


    return (
        <div className="front-container">
            <h3 className="text-center text-[35px] sm:text-[40px] text-heading mb-[20px]">Mark your attendance</h3>
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

                                <h4 className="text-[24px] sm:text-[28px] text-heading mb-5">Attendance</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Enter your Employee ID"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    value={
                                                        data.employee_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "employee_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="number"
                                                    className="block"
                                                    placeHolder='Employee ID'
                                                />
                                                <InputError
                                                    message={
                                                        errors.employee_id
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

                                        
                                        {messageData && (
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles mt-10">
                                                    <div className="educare-input-field-styles-textarea">
                                                        <h3>{messageData.message}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        )}

                                        {messageData && messageData?.attendance_button_show == true && (
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                                    <PrimaryButton
                                                        type="submit"
                                                        onClick={(e) =>  {
                                                            setData("make_attendance", "1");
                                                        }}
                                                        className="educare-primary-btn-lg-fill"
                                                    >
                                                        Mark Attendance
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="border-b border-border pb-[30px]">
                            <h4 className="text-[24px] sm:text-[28px] text-heading mb-5">
                                Attendance Instructions
                            </h4>
                            <p className="text-headingLight">
                                Please enter your Employee ID to mark your attendance.
                            </p>
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