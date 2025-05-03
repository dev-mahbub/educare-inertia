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
import { concatName } from "@/Hooks/GlobalFunction";

const HostelGatePassForm = ({
    classrooms = [],
    students = [],
    guardianData = [],
    gateNextNo,
}) => {
    const [studentData, setStudentData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const relationTypeData = [
        { id: 'My self', title: 'My self' },
        { id: 'Father', title: 'Father' },
        { id: 'Mother', title: 'Mother' },
        { id: 'Guardian', title: 'Guardian' },
        { id: 'Others', title: 'Others' },
    ]


    // Function to handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        classroom_id: "",
        student_id: "",
        relation_type: "",
        visiting_person: "",
        email: "",
        phone: "",
        in_date_at: new Date(),
        out_date_at: new Date(),
        in_time_at: "",
        out_time_at: "",
        reason_gate_pass: "",
        visitor_photo: "",
    });

    const handleClassroom = (id) => {
        const filteredStudent = students?.filter((item) => item?.classroom_id == id);
        setStudentData(filteredStudent);
    }

    const handleStudentId = (id) => {
        setData({
            ...data,
            student_id: id,
            relation_type: "",
            visiting_person: "",
            email: "",
            phone: "",
        })
    }

    const handleRelationType = (value) => {
        if (value === 'My self') {
            const filteredStudentData = students?.find((item) => item?.id == data?.student_id);
            setData({
                ...data,
                relation_type: value,
                visiting_person: filteredStudentData?.title,
                email: filteredStudentData?.email,
                phone: filteredStudentData?.phone,
            });
        } else if (value === 'Father') {
            const filteredFatherData = guardianData?.find((item) => item?.student_id == data?.student_id && item?.guardian_type == 'Father');
            setData({
                ...data,
                relation_type: value,
                visiting_person: concatName(filteredFatherData?.first_name, filteredFatherData?.middle_name, filteredFatherData?.last_name),
                email: filteredFatherData?.email,
                phone: filteredFatherData?.phone,
            });
        } else if (value === 'Mother') {
            const filteredMotherData = guardianData?.find((item) => item?.student_id == data?.student_id && item?.guardian_type == 'Mother');
            setData({
                ...data,
                relation_type: value,
                visiting_person: concatName(filteredMotherData?.first_name, filteredMotherData?.middle_name, filteredMotherData?.last_name),
                email: filteredMotherData?.email,
                phone: filteredMotherData?.phone,
            });
        } else if (value === 'Guardian') {
            const filteredGuardData = guardianData?.find((item) => item?.student_id == data?.student_id && item?.guardian_type == 'Guardian');
            setData({
                ...data,
                relation_type: value,
                visiting_person: concatName(filteredGuardData?.first_name, filteredGuardData?.middle_name, filteredGuardData?.last_name),
                email: filteredGuardData?.email,
                phone: filteredGuardData?.phone,
            });
        } else if (value === 'Others') {
            setData({
                ...data,
                relation_type: value,
                visiting_person: "",
                email: "",
                phone: "",
            });
        }
        else {
            setData({
                ...data,
                relation_type: value,
                visiting_person: "",
                email: "",
                phone: "",
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        post(route('hostel.gate_pass_save'), {
            onSuccess: () => {
                reset()
                handleRelationType('none');
                setSelectedImage(null);
                setStudentData([]);
            },
        });
    };

    const handelReset = (e) => {
        e.preventDefault();
        router.get(route('hostel.gate_pass'));
    }


    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Gate Pass
                </h5>
            </div>
            <form onSubmit={handleFormSubmit}>
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
                                            value={
                                                data.classroom_id
                                            }
                                            onChange={(e) => {
                                                setData(
                                                    "classroom_id",
                                                    e.target.value
                                                )
                                                handleClassroom(e.target.value);
                                            }
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
                                            data={studentData}
                                            value={
                                                data.student_id
                                            }
                                            onChange={(e) => {
                                                handleStudentId(e.target.value);

                                            }}
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
                                            data_label="relation_type"
                                            data={relationTypeData}
                                            value={data.relation_type}
                                            onChange={(e) => {
                                                handleRelationType(e.target.value)
                                            }}
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
                                                && new Date(data?.in_time_at)
                                            }
                                            onChange={(time) =>
                                                setData(
                                                    "in_time_at",
                                                    time
                                                )
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
                                                && new Date(data?.out_time_at)
                                            }
                                            onChange={(time) =>
                                                setData(
                                                    "out_time_at",
                                                    time
                                                )
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
                                                && new Date(data?.in_date_at)
                                            }
                                            onChange={(date) =>
                                                setData(
                                                    "in_date_at",
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
                                                && new Date(data?.out_date_at)
                                            }
                                            onChange={(date) =>
                                                setData(
                                                    "out_date_at",
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
                                                        {
                                                            selectedImage ? <img
                                                                src={
                                                                    selectedImage
                                                                }
                                                                alt="img not found"
                                                            />
                                                                :
                                                                <img
                                                                    src={
                                                                        placeholderImage
                                                                    }
                                                                    alt="img not found"
                                                                />
                                                        }

                                                    </label>
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-type-file-styles">
                                                            <input
                                                                id="visitor_photo"
                                                                type="file"
                                                                name="visitor_photo"
                                                                onChange={(e) => {
                                                                    setData(
                                                                        "visitor_photo",
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                    handleImageChange(e);
                                                                }
                                                                }
                                                            />
                                                            <InputError
                                                                message={errors.visitor_photo}
                                                                className="mt-2"
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
                            <PrimaryButton type="button" onClick={(e) => handelReset(e)} disabled={processing} className="educare-gray-btn-lg-stroke">
                                Reset
                            </PrimaryButton>
                            <PrimaryButton type="submit" disabled={processing} className="educare-primary-btn-lg-fill">
                                Generate Gate Pass
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default HostelGatePassForm;
