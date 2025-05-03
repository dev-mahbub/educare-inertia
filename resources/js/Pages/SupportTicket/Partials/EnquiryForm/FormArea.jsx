import React, { useEffect } from "react";
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

export default function FormArea({activeVisitorTypes}) {
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
        phone: "",
        name: "",
        enquiry_type: "",
        email: "",
        enquiry_date: new Date(),
        in_time: "",
        appointment_date: new Date(),
        appointment_time: "",
        visitor_photo: null,
        person_to_meet: "",
        purpose_of_visit: "",
        vehicle_no: "",
        address: "",
        enquiry_message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('frontend.visitor_enquiry.save'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Visitor enquiry added successfully", {
                    position: 'top-right',
                    autoClose: 1500,
                });
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
            <div className="educare-quick-report-area mb-[55px]">
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <form onSubmit={handleSubmit}> 
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12  md:col-span-6 xl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="phone"
                                                    value="Contact Number"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="phone"
                                            value={
                                                data.phone
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.phone
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12  md:col-span-6 xl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="Contact Name"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="name"
                                            value={
                                                data.name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.name
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12  md:col-span-6 xl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="enquiry_type"
                                            value="Enquiry Type"
                                        />
                                        <SelectInput
                                            id="enquiry_type"
                                            data_label="Enquiry type"
                                            data={activeVisitorTypes}
                                            value={
                                                data.enquiry_type
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "enquiry_type",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.enquiry_type
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12  md:col-span-6 xl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
                                        <TextInput
                                            id="email"
                                            value={
                                                data.email
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.email
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="enquiry_date"
                                            value="Enquiry Date"
                                        />
                                        <DatePicker
                                            selected={
                                                data?.enquiry_date
                                                    ? new Date(
                                                        data?.enquiry_date
                                                    )
                                                    : new Date()
                                            }
                                            onChange={(date) =>
                                                setData("enquiry_date", date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="End date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12  md:col-span-6 xl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="in_time"
                                            value="In Time"
                                        />
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={
                                                        data?.in_time && new Date(data?.in_time)
                                                    }
                                                    onChange={(date) =>
                                                        setData("in_time", date)
                                                    }
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
                                                    placeholderText="Start time"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>

                                        <InputError
                                            message={
                                                errors.in_time
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="appointment_date"
                                            value="Appointment Date"
                                        />
                                        <DatePicker
                                            selected={
                                                data?.appointment_date
                                                    ? new Date(
                                                        data?.appointment_date
                                                    )
                                                    : new Date()
                                            }
                                            onChange={(date) =>
                                                setData("appointment_date", date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="End date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12  md:col-span-6 xl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="appointment_time"
                                            value="Appointment Time"
                                        />
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={
                                                        data?.appointment_time && new Date(data?.appointment_time)
                                                    }
                                                    onChange={(date) =>
                                                        setData("appointment_time", date)
                                                    }
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
                                                    placeholderText="Start time"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                        <InputError
                                            message={
                                                errors.appointment_time
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className='grid grid-cols-12 gap-5 w-full'>
                                        <div className="col-span-12 md:col-span-3">
                                            <div className="educare-student-parent-profile-images">
                                                <div className="educare-student-parent-profile-images-info h-10 flex items-center gap-2 bg-border/20 px-5">
                                                    <span className="text-[15px] text-headingLight">
                                                        <span className="font-semibold">
                                                            Note:
                                                        </span>{" "}
                                                        Image size allowed
                                                        upto -{" "}
                                                        <span className="text-danger">
                                                            1Mb
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                    <h6>
                                                        Visitor Photo
                                                    </h6>
                                                    <label htmlFor="visitor_photo">
                                                        {data.visitor_photo && (
                                                            <img src={URL.createObjectURL(data.visitor_photo)} alt="img not found" />
                                                        )}

                                                        {/* {!data.visitor_photo && (
                                                            <img
                                                                src={
                                                                    placeholderImage
                                                                }
                                                                alt="img not found"
                                                            />
                                                        )} */}
                                                    </label>
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-type-file-styles">
                                                            <input
                                                                id="visitor_photo"
                                                                type="file"
                                                                name="visitor_photo"
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "visitor_photo",
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                }
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-9">
                                            <div className='grid grid-cols-12 gap-5'>
                                                <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="person_to_meet"
                                                            value="Person To Meet"
                                                        />
                                                        <TextInput
                                                            id="person_to_meet"
                                                            value={
                                                                data.person_to_meet
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "person_to_meet",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.person_to_meet
                                                            }
                                                            className="w-full mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="purpose_of_visit"
                                                            value="Purpose of visit"
                                                        />
                                                        <TextInput
                                                            id="purpose_of_visit"
                                                            value={
                                                                data.purpose_of_visit
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "purpose_of_visit",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.purpose_of_visit
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="vehicle_no"
                                                            value="Vehicle Number"
                                                        />
                                                        <TextInput
                                                            id="vehicle_no"
                                                            value={
                                                                data.vehicle_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "vehicle_no",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.vehicle_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="address"
                                                            value="Address"
                                                        />
                                                        <TextInput
                                                            id="address"
                                                            value={
                                                                data.address
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "address",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.address
                                                            }
                                                            className="w-full mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="enquiry_message"
                                                            value="Enquiry Detail"
                                                        />
                                                        <TextareaInput
                                                            id="enquiry_message"
                                                            value={
                                                                data.enquiry_message
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "enquiry_message",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.enquiry_message
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                        <PrimaryButton
                                            type="submit"
                                            className="educare-primary-btn-lg-fill"
                                        >
                                            Save
                                        </PrimaryButton>
                                        <PrimaryButton
                                            type="button"
                                            onClick={(e) => handleReset(e)}
                                            className="educare-gray-btn-lg-stroke"
                                        >
                                            Reset
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