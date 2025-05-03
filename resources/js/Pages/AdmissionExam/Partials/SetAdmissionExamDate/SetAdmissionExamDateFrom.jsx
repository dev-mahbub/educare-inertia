import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { router, useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import NewRegistratioin from "./NewRegistratioin";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SetAdmissionExamDateFrom({
    classNames, 
    academicYears,
    registrations,
    academicYearId
}) {

    const [testDate, setTestDate] = useState (null);
    const [testTime, setTestTime] = useState (null);
    const [selectedEnquiryIds, setSelectedEnquiryIds] = useState([]);
    const [registrationData, setRegistrationData] = useState([]);
    const [classNameData, setClassNameData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        academic_year_id: academicYearId ?? "",
        class_name_id : "",	
        test_date : testDate,	
        test_time : testTime,
        enquiry_ids: selectedEnquiryIds
    });

    useEffect(() => {
        setRegistrationData(registrations);
    }, [registrations]);


    useEffect(() => {
        setClassNameData(classNames);
    }, [classNames]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            enquiry_ids: selectedEnquiryIds
        }));
    }, [selectedEnquiryIds]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            test_date: testDate ?? ""
        }));
    }, [testDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            test_time: testTime ?? ""
        }));
    }, [testTime]);

    // handle admission exam date data start
    const handleAdmissionExamDateData = (e) => {
        e.preventDefault();

        if(data?.academic_year_id == "" || data?.class_name_id == "" || data?.test_date == "" || data?.test_time == "") {
            toast.error("Required fields cannot be empty.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if(data?.enquiry_ids?.length == 0) {
            toast.error("Please select at least a student.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            post(route("admission.exam"), {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    setSelectedEnquiryIds([]);

                    const form_data = {
                        academic_year_id: data?.academic_year_id ?? "",
                        class_name_id: data?.class_name_id,
                    };

                    router.post(route('admission_exam.set_exam_date'), form_data);
                }
            });
        }
    };
    // handle admission exam date data end


    // handle class name change start
    const handelClassNameChange = (e) => {
        const class_name_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
        }));
    
        const form_data = {
            academic_year_id: data?.academic_year_id ?? "",
            class_name_id: class_name_id,
        };

        router.post(route('admission_exam.set_exam_date'), form_data);
    };
    // handle class name change end

    //handle academic year change start
    const handleAcademicYearChange = (e) => {
        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id: academic_year_id,
            class_name_id: "",
        }));

        const form_data = {
            academic_year_id: academic_year_id 
        }
        
        router.post(route('admission_exam.set_exam_date'), form_data);
    };
    //handle academic year change end

    // handle reset start
    const handleReset = (e) => {
        e.preventDefault();

        reset();
        setRegistrationData([]);
        setTestDate(null);
        setTestTime(null);
        setSelectedEnquiryIds([]);
        setClassNameData([]);
        setData('academic_year_id', "");
    }
    // handle reset end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-4 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        Set Admission Exam Date
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionExamDateData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles mb-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Academic Year"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                            id="academic_year_id"
                                                            data_label="academic year"
                                                            data={academicYears}
                                                            value={
                                                                data?.academic_year_id
                                                            }
                                                            onChange={(e) =>
                                                                handleAcademicYearChange(e)
                                                            }
                                                            className="block"
                                                        />
                                                    <InputError
                                                        message={
                                                            errors.academic_year_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="educare-input-field-styles my-2">
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
                                                        data={classNameData}
                                                        value={
                                                            data?.class_name_id
                                                        }
                                                        onChange={(e) => {
                                                            handelClassNameChange(e)
                                                        }
                                                            
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.class_name_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="educare-input-field-styles my-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor = "test_date"
                                                                value="Test Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <div className="educare-input-field-styles">
                                                        <DatePicker
                                                            selected={testDate}
                                                            onChange={(date) => setTestDate(date)}
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={false}
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="Select Date"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.dummy_1
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="educare-input-field-styles my-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                             htmlFor = "test_time"
                                                                value="Test Time"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <div className="educare-input-field-styles">
                                                        <DatePicker
                                                            selected={testTime}
                                                            onChange={(date) => setTestTime(date)}
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={false}
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={1}
                                                            timeCaption="Time"
                                                            dateFormat="h:mm aa"
                                                            placeholderText="Select time"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.dummy_1
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        type="button"
                                                        onClick={(e) => {
                                                            handleReset(e)
                                                        }}
                                                    >
                                                        Reset
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                    >
                                                        Save
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 col-span-12">
                        <NewRegistratioin 
                            registrations={registrationData} 
                            selectedEnquiryIds={selectedEnquiryIds}
                            setSelectedEnquiryIds={setSelectedEnquiryIds}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
