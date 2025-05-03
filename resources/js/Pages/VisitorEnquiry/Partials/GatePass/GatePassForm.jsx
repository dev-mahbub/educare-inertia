import React, { useState } from "react";
import DatePicker from "react-datepicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import placeholderImage from "../../../../../images/icon/placeholder.jpg";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";

const GatePassForm = ({
    visitors,
    relactionType,
    classrooms,
    students,
    gateNextNo,
}) => {
    
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
        student_id: "",
        relation_type: "",
        visiting_person: "",
        email: "",
        phone: "",
        in_date_at: "",
        out_date_at: "",
        in_time_at: "",
        out_time_at: "",
        reason_gate_pass: "",
        visitor_photo: "",
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        post(route("visitor_enquiry.gate_pass_save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    const handleClassroom = (e, classroomId) => {
        e.preventDefault();
        setData({
            ...data,
            classroom_id: classroomId,
        });
        router.post(route("visitor_enquiry.gate_pass"), {
            classroom_id: classroomId,
        });
    };

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Gate Pass
                </h5>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-title">
                            <h5>
                                <i className="icon-BookBookmark"></i>
                                Next Gate Pass Number Will Be : {gateNextNo}
                            </h5>
                        </div>
                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="classroom_id"
                                                    value="Class"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <SelectInput
                                            id="classroom_id"
                                            data_label="Class"
                                            data={classrooms}
                                            value={data.classroom_id}
                                            onChange={(e) =>
                                                handleClassroom(
                                                    e,
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.classroom_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="student_id"
                                                    value="Student"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            id="student_id"
                                            data_label="Student"
                                            data={students}
                                            value={data.student_id}
                                            onChange={(e) =>
                                                setData(    
                                                    "student_id",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.student_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="relation_type"
                                                    value="Relation"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            id="relation_type"
                                            data_label="Relation"
                                            data={relactionType}
                                            value={data.relation_type}
                                            onChange={(e) =>
                                                setData(
                                                    "relation_type",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.relation_type}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="visiting_person"
                                                    value="Visiting Person"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="visiting_person"
                                            value={data.visiting_person}
                                            onChange={(e) =>
                                                setData(
                                                    "visiting_person",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.visiting_person}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="phone"
                                                    value="Phone Number"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
                                        <TextInput
                                            id="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel value="In Time" />
                                        <DatePicker
                                            selected={
                                                data?.in_time_at
                                                    ? new Date(data?.in_time_at)
                                                    : new Date()
                                            }
                                            onChange={(date) =>
                                                setData("in_time_at", date)
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
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel value="Out Time" />
                                        <DatePicker
                                            selected={
                                                data?.out_time_at
                                                    ? new Date(data?.out_time_at)
                                                    : new Date()
                                            }
                                            onChange={(date) =>
                                                setData("out_time_at", date)
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
                                            placeholderText="End time"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel value="In Date" />
                                        <DatePicker
                                            selected={
                                                data?.in_date_at
                                                    ? new Date(data?.in_date_at)
                                                    : new Date()
                                            }
                                            onChange={(date) =>
                                                setData("in_date_at", date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="In date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel value="Out Date" />
                                        <DatePicker
                                            selected={
                                                data?.out_date_at
                                                    ? new Date(data?.out_date_at)
                                                    : new Date()
                                            }
                                            onChange={(date) =>
                                                setData("out_date_at", date)
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

                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="reason_gate_pass"
                                                    value="Reason for visiting/Gate Pass"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <TextareaInput
                                            id="reason_gate_pass"
                                            value={data.reason_gate_pass}
                                            onChange={(e) =>
                                                setData(
                                                    "reason_gate_pass",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.reason_gate_pass}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* upload img */}
                    <div className="educare-create-school-details-form-wrap col-span-12">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-school-form-action-title">
                                <h5>
                                    <i className="icon-BookBookmark"></i>
                                    Upload Image
                                </h5>
                            </div>
                            <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-student-parent-profile-images">
                                            <div className="educare-student-parent-profile-images-info h-10 flex items-center gap-2 bg-border/20 px-5">
                                                <span className="text-[15px] text-headingLight">
                                                    <span className="font-semibold">
                                                        Note:
                                                    </span>{" "}
                                                    Image size allowed upto -{" "}
                                                    <span className="text-danger">
                                                        1Mb
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="educare-student-parent-profile-images-wrap flex flex-wrap gap-x-5 justify-between">
                                                <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                    <h6>Visitor Photo</h6>
                                                    <label htmlFor="visitor_photo">
                                                        <img
                                                            src={
                                                                placeholderImage
                                                            }
                                                            alt="img not found"
                                                        />
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end upload img */}

                    <div className="col-span-12">
                        <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                            <PrimaryButton className="educare-gray-btn-lg-stroke">
                                Reset
                            </PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-lg-fill" onClick={(e) => handleFormSubmit(e)}>
                                Genarate Gate Pass
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default GatePassForm;

