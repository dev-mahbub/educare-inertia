import React,{useEffect} from 'react'
import { Link, router, useForm } from '@inertiajs/react';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import PrimaryButton from "@/Components/PrimaryButton";
import DatePicker from "react-datepicker";

export default function HostelCreateForm({students, studentId, hostelTypes}) {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        note: "",
        hostel_type: "",
        student_id: "",
        applied_date: new Date(),
        start_date: new Date(),
    });

    // handle insert data
    const handleInsert = (e) => {
        e.preventDefault();

        post(route("student_hostel.store_request"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };
    
    const studentsList = students?.map(student => ({
        id: student.id,
        title: `${student?.first_name} ${student?.middle_name} ${student?.last_name}`,
    })) || [];


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId
        }));
    }, [studentId]);

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={handleInsert}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-info"></i>
                                            Request Hostel
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Student"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <div className="educare-select-field-styles">
                                                        <SelectInput
                                                            data_label="Class"
                                                            data={studentsList}
                                                            value={data.student_id}
                                                            onChange={(e) => setData("student_id", e.target.value)}
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={errors.student_id}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="hostel_type"
                                                                value="Hostel Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="hostel_type"
                                                        data_label="hostel_type"
                                                        data={hostelTypes}
                                                        value={data.hostel_type}
                                                        onChange={(e) =>
                                                            setData(
                                                                "hostel_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.hostel_type
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
                                                                htmlFor="applied_date"
                                                                value="Applied Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={ data.applied_date }
                                                        onChange={(date) =>
                                                            setData(
                                                                "applied_date",
                                                                date
                                                            )
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Applied date"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.applied_date
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
                                                                htmlFor="start_date"
                                                                value="Start Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={ data.start_date }
                                                        onChange={(date) =>
                                                            setData(
                                                                "start_date",
                                                                date
                                                            )
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Start date"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.start_date
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="note"
                                                        value="Note"
                                                    />
                                                    <TextareaInput
                                                        id="note"
                                                        value={
                                                            data.note
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "note",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.note
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school details form start */}
                        </div>
                    </div>
                </div>
                <div className="educare-button-field-styles mt-2.5 text-end">
                    <PrimaryButton
                        disabled={processing}
                        type="submit"
                        className="h-12 bg-primary text-white text-[16px] rounded-md font-medium px-6 font-primary inline-block"
                    >
                        Request Hostel
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}