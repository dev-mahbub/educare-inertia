import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import DatePicker from "react-datepicker";

const EditEnquiryForm = ({
    enqueryData,
    enqueryGuardianData,
    admissionSources,
    users,
    states,
    ScholarBoardingType,
    academicYears,
    classes,
    totalEnquiryCount,
    genderType
}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [birthDate, setBirthDate] = useState(new Date());
    const [InTime, setInTime] = useState(new Date());

    const { data, setData, errors, put, reset, processing } = useForm({
        enquiry_date_at: enqueryData?.enquiry_date_at,
        user_id: enqueryData?.user_id,
        contact_name: enqueryData?.contact_name,
        source_id: enqueryData?.source_id,
        enquiry_detail: enqueryData?.enquiry_detail,
        contact_number: enqueryData?.contact_number,
        contact_email: enqueryData?.contact_email,
        person_to_meet: enqueryData?.person_to_meet,
        in_time: enqueryData?.in_time,
        refer_contact_person: enqueryData?.refer_contact_person,
        refer_mobile: enqueryData?.refer_mobile,
        enquiry_address: enqueryData?.enquiry_address,
        school_name: enqueryData?.school_name,
        school_class: enqueryData?.school_class,
        school_year: enqueryData?.school_year,
        tc_no: enqueryData?.tc_no,
        referred_by: enqueryData?.referred_by,
        academic_year_id: enqueryData?.admission_academic_year_id,
        class_name_id: enqueryData?.class_name_id,
        gender: enqueryData?.gender,
        first_name: enqueryData?.first_name,
        middle_name: enqueryData?.middle_name,
        last_name: enqueryData?.last_name,
        date_of_birth: enqueryData?.date_of_birth,
        boarding_scholar: enqueryData?.boarding_scholar,
        present_address: enqueryData?.present_address,
        landmark: enqueryData?.landmark,
        state_id: enqueryData?.state_id,
        city: enqueryData?.city,
        district: enqueryData?.district,
        // guardian table
        father_first_name: enqueryGuardianData?.father_first_name,
        father_middle_name: enqueryGuardianData?.father_middle_name,
        father_last_name: enqueryGuardianData?.father_last_name,
        father_email: enqueryGuardianData?.father_email,
        father_mobile: enqueryGuardianData?.father_mobile,
        father_occupation: enqueryGuardianData?.father_occupation,
        father_whatsapp_no: enqueryGuardianData?.father_whatsapp_no,
        mother_first_name: enqueryGuardianData?.mother_first_name,
        mother_middle_name: enqueryGuardianData?.mother_middle_name,
        mother_last_name: enqueryGuardianData?.mother_last_name,
        mother_email: enqueryGuardianData?.mother_email,
        mother_mobile: enqueryGuardianData?.mother_mobile,
        mother_occupation: enqueryGuardianData?.mother_occupation,
    });

    // handle academic year change start
    const handleAacademicYearChange = (e) => {
        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id: academic_year_id,
            class_name_id: "",
        }));

        router.post(route('admission_enquery_reg.edit', enqueryData?.id), { academic_year_id: academic_year_id });
    }
    // handle academic year change end


    const editEnquiryData = (e) => {
        e.preventDefault();
        data.enquiry_date_at = startDate;
        data.date_of_birth = birthDate;
        data.in_time = InTime;
        put(
            route("admission_enquery_reg.update", enqueryData.id),
            data,
            {
                preserveScroll: true,
                onSuccess: () => reset(),
            }
        );
    };



    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={editEnquiryData}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Edit New Enquiry
                                        </h5>
                                        <div className="educare-admission-filtar-bar-count">
                                            <span>Enquiry: {totalEnquiryCount}</span>
                                        </div>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Enquiry Date" />
                                                    <DatePicker
                                                        id="enquiry_date"
                                                        selected={startDate}
                                                        onChange={(date) =>
                                                            setStartDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Date of Birth"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="user_id"
                                                                value="Assigned to"
                                                            />
                                                            <SelectInput
                                                                id="user_id"
                                                                data_label="Assign To"
                                                                data={users}
                                                                value={
                                                                    data.user_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "user_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.user_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="contact_name"
                                                                value="Contact Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="contact_name"
                                                        value={
                                                            data.contact_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "contact_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.contact_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="source_id"
                                                                value="Admission Source"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="source_id"
                                                        data_label=""
                                                        data={admissionSources}
                                                        value={data.source_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "source_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.source_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="enquiry_detail"
                                                        value="Enquiry Detail"
                                                    />
                                                    <TextInput
                                                        id="enquiry_detail"
                                                        value={
                                                            data.enquiry_detail
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "enquiry_detail",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.enquiry_detail
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="contact_number"
                                                                value="Contact Number"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="contact_number"
                                                        required
                                                        value={
                                                            data.contact_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "contact_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.contact_number
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="contact_email"
                                                            value="Contact Email"
                                                        />
                                                        <TextInput
                                                            id="contact_email"
                                                            value={
                                                                data.contact_email
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "contact_email",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.contact_email
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6">
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
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="In Time" />
                                                    <DatePicker
                                                        selected={InTime}
                                                        onChange={(date) =>
                                                            setInTime(date)
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
                                                        placeholderText="Select time"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="refer_contact_person"
                                                        value="Refer Contact Person"
                                                    />
                                                    <TextInput
                                                        id="refer_contact_person"
                                                        value={
                                                            data.refer_contact_person
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "refer_contact_person",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.refer_contact_person
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="refer_mobile"
                                                        value="Refer Mobile"
                                                    />
                                                    <TextInput
                                                        id="refer_mobile"
                                                        value={
                                                            data.refer_mobile
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "refer_mobile",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.refer_mobile
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="enquiry_address"
                                                        value="Address"
                                                    />
                                                    <TextInput
                                                        id="enquiry_address"
                                                        value={
                                                            data.enquiry_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "enquiry_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.enquiry_address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Enquiry form end */}

                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Last School Details
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="school_name"
                                                        value="School Name"
                                                    />
                                                    <TextInput
                                                        id="school_name"
                                                        value={data.school_name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "school_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.school_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="school_class"
                                                        value="School Class"
                                                    />
                                                    <TextInput
                                                        id="school_class"
                                                        value={
                                                            data.school_class
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "school_class",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.school_class
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="school_year"
                                                        value="School Year"
                                                    />
                                                    <TextInput
                                                        id="school_year"
                                                        value={data.school_year}
                                                        onChange={(e) =>
                                                            setData(
                                                                "school_year",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.school_year
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="tc_no"
                                                        value="TC No"
                                                    />
                                                    <TextInput
                                                        id="tc_no"
                                                        value={data.tc_no}
                                                        onChange={(e) =>
                                                            setData(
                                                                "tc_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors?.tc_no}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="referred_by"
                                                        value="Referred By"
                                                    />
                                                    <TextInput
                                                        id="referred_by"
                                                        value={data.referred_by}
                                                        onChange={(e) =>
                                                            setData(
                                                                "referred_by",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.referred_by
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Last school form end */}
                        </div>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-create-school-details-form-wrap">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-school-form-action-title">
                                    <h5>
                                        <i className="icon-Buildings"></i>
                                        Student Details
                                    </h5>
                                </div>
                                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="academic_year_id"
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
                                                                data.academic_year_id
                                                            }
                                                            onChange={(e) =>
                                                                handleAacademicYearChange(e)
                                                                // setData(
                                                                //     "academic_year_id",
                                                                //     e.target
                                                                //         .value
                                                                // )
                                                            }
                                                            className="block"
                                                            required
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.academic_year_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="class_name_id"
                                                            value="Class"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    id="class_name_id"
                                                    data_label="Class"
                                                    data={classes}
                                                    value={data.class_name_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "class_name_id",
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.class_name_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="gender"
                                                            value="Gender"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    id="gender"
                                                    data_label="gender"
                                                    data={genderType}
                                                    value={data.gender}
                                                    onChange={(e) =>
                                                        setData(
                                                            "gender",
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.gender}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="first_name"
                                                            value="First Name"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="first_name"
                                                    required
                                                    value={data.first_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.first_name}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="middle_name"
                                                    value="Middle Name"
                                                />
                                                <TextInput
                                                    id="middle_name"
                                                    value={data.middle_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "middle_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.middle_name}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="last_name"
                                                    value="Last Name"
                                                />
                                                <TextInput
                                                    id="last_name"
                                                    value={data.last_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.last_name}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="date_of_birth"
                                                    value="Date Of Birth"
                                                />
                                                <DatePicker
                                                    id="date_of_birth"
                                                    selected={birthDate}
                                                    onChange={(date) =>
                                                        setBirthDate(date)
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Date of Birth"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="boarding_scholar"
                                                    value="Day Scholar / Boarding"
                                                />
                                                <SelectInput
                                                    id="boarding_scholar"
                                                    data_label=""
                                                    data={ScholarBoardingType}
                                                    value={data.boarding_scholar}
                                                    onChange={(e) =>
                                                        setData(
                                                            "boarding_scholar",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.boarding_scholar
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Students's details form end */}

                        <div className="educare-create-school-details-form-wrap">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-school-form-action-title maxXs:flex-wrap">
                                    <h5>
                                        <i className="icon-Buildings"></i>
                                        Father's Details
                                    </h5>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="copy_number"
                                                value="Copy Contact Number"
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="copy_number"
                                                name="copy_number"
                                                checked={data.copy_number}
                                                onChange={(e) =>
                                                    setData(
                                                        "copy_number",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="father_first_name"
                                                            value="First Name"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="father_first_name"
                                                    required
                                                    value={
                                                        data.father_first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.father_first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="father_middle_name"
                                                            value="Middle Name"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="father_middle_name"
                                                    value={
                                                        data.father_middle_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_middle_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.father_middle_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="father_last_name"
                                                            value="Last Name"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="father_last_name"
                                                    value={
                                                        data.father_last_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.father_last_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="father_email"
                                                            value="Father Email"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="father_email"
                                                    value={data.father_email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_email",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.father_email
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="father_mobile"
                                                            value="Father Mobile"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="father_mobile"
                                                    required
                                                    value={data.father_mobile}
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_mobile",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.father_mobile
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="father_occupation"
                                                            value="Occupation"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="father_occupation"
                                                    value={
                                                        data.father_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.father_occupation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="father_whatsapp_no"
                                                            value="Whatsapp No."
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="father_whatsapp_no"
                                                    value={data.father_whatsapp_no}
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_whatsapp_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.father_whatsapp_no}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Father's details form end */}

                        <div className="educare-create-school-details-form-wrap">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-school-form-action-title">
                                    <h5>
                                        <i className="icon-Buildings"></i>
                                        Mother's Details
                                    </h5>
                                </div>
                                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="mother_first_name"
                                                            value="First Name"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="mother_first_name"
                                                    value={
                                                        data.mother_first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "mother_first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.mother_first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="mother_middle_name"
                                                            value="Middle Name"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="mother_middle_name"
                                                    value={
                                                        data.mother_middle_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "mother_middle_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.mother_middle_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="mother_last_name"
                                                            value="Last Name"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="mother_last_name"
                                                    value={
                                                        data.mother_last_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "mother_last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.mother_last_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="mother_email"
                                                            value="Mother Email"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="mother_email"
                                                    value={data.mother_email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "mother_email",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.mother_email
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="mother_mobile"
                                                            value="Mother Mobile"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="mother_mobile"
                                                    value={data.mother_mobile}
                                                    onChange={(e) =>
                                                        setData(
                                                            "mother_mobile",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.mother_mobile
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="mother_occupation"
                                                            value="Occupation"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="mother_occupation"
                                                    value={
                                                        data.mother_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "mother_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.mother_occupation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Mother's details form end */}

                        <div className="educare-create-school-details-form-wrap">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-school-form-action-title">
                                    <h5>
                                        <i className="icon-Buildings"></i>
                                        Present Address
                                    </h5>
                                </div>
                                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="present_address"
                                                            value="Address"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="present_address"
                                                    value={data.present_address}
                                                    onChange={(e) =>
                                                        setData(
                                                            "present_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.present_address
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="landmark"
                                                            value="Landmark"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="landmark"
                                                    value={data.landmark}
                                                    onChange={(e) =>
                                                        setData(
                                                            "landmark",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.landmark}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="state_id"
                                                            value="State"
                                                        />
                                                        <SelectInput
                                                            id="state_id"
                                                            data_label=""
                                                            data={states}
                                                            value={
                                                                data.state_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "state_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.state_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="city"
                                                            value="City"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="city"
                                                    value={data.city}
                                                    onChange={(e) =>
                                                        setData(
                                                            "city",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.city}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="district"
                                                            value="District"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="district"
                                                    value={data.district}
                                                    onChange={(e) =>
                                                        setData(
                                                            "district",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.district}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* present address form end */}
                    </div>
                </div>
                <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
                    {/* <PrimaryButton
                        disabled={processing}
                        className="educare-gray-btn-lg-stroke"
                    >
                        Reset
                    </PrimaryButton> */}
                    <PrimaryButton
                        disabled={processing}
                        className="educare-primary-btn-lg-fill"
                    >
                        Update
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default EditEnquiryForm;
