import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import placeholderImage from "../../../../../images/icon/placeholder.jpg";
import Checkbox from "@/Components/Checkbox";
import DatePicker from "react-datepicker";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import DarkButton from "@/Components/DarkButton";

const StudentDetailsForm = ({ className = "" }) => {
    const [cardActive, setCardActive] = useState(false);
    const [cardActive1, setCardActive1] = useState(false);
    const [cardActive2, setCardActive2] = useState(false);
    const [cardActive3, setCardActive3] = useState(false);
    const [cardActive4, setCardActive4] = useState(false);
    const [cardActive5, setCardActive5] = useState(false);
    const [cardActive6, setCardActive6] = useState(false);

    const handleToggle = () => {
        setCardActive(!cardActive);
    };
    const handleToggle1 = () => {
        setCardActive1(!cardActive1);
    };
    const handleToggle2 = () => {
        setCardActive2(!cardActive2);
    };
    const handleToggle3 = () => {
        setCardActive3(!cardActive3);
    };
    const handleToggle4 = () => {
        setCardActive4(!cardActive4);
    };
    const handleToggle5 = () => {
        setCardActive5(!cardActive5);
    };
    const handleToggle6 = () => {
        setCardActive6(!cardActive6);
    };

    const studentFirstName = useRef();
    const studentMiddleName = useRef();
    const studentLastName = useRef();
    const studentGender = useRef();
    const studentAadharCardNoInput = useRef();
    const studentBirthDateInput = useRef();
    const studentBloodGroupInput = useRef();
    const studentReligionInput = useRef();
    const studentCategoryIdInput = useRef();
    const studentEmailIdInput = useRef();
    const studentNationalityIdInput = useRef();
    const studentSRNIdInput = useRef();
    const studentChildIdInput = useRef();
    const studentSamagraIdInput = useRef();
    const studentPlaceOfBirthInput = useRef();
    const studentCasteIdInput = useRef();
    const studentAdmissionClassInput = useRef();
    const studentEmploymentIdInput = useRef();
    const studentHeightInput = useRef();
    const studentWeightInput = useRef();
    const studentMotherTongueInput = useRef();
    const studentMedicalConditionInput = useRef();
    const studentNotesIdInput = useRef();
    const studentSubCasteIdInput = useRef();
    //student bank details
    const studentBankNameInput = useRef();
    const studentBankAccountHolderInput = useRef();
    const studentBankAccountTypeInput = useRef();
    const studentBankAccountNoInput = useRef();
    const studentBankIficCodeInput = useRef();
    const studentBankMicrNoInput = useRef();
    const studentBankBranchNameInput = useRef();
    //previous school details
    const studentPreviousSchoolNameInput = useRef();
    const studentPreviousSchoolClassInput = useRef();
    const studentPreviousSchoolYearInput = useRef();
    const studentPreviousSchoolTcInput = useRef();
    //father's details
    const studentFatherFirstName = useRef();
    const studentFatherMiddleName = useRef();
    const studentFatherLastName = useRef();
    const studentFatherEmail = useRef();
    const studentFatherMobile = useRef();
    const studentFatherMobileSms = useRef();
    const studentFatherQualification = useRef();
    const studentFatherOccupation = useRef();
    const studentFatherIncome = useRef();
    const studentFatherDepartment = useRef();
    const studentFatherDesignation = useRef();
    const studentFatherAadharCardNo = useRef();
    const studentFatherPanCardNo = useRef();
    const studentFatherCompanyName = useRef();
    const studentFatherOfficeAddress = useRef();
    //mothers's details
    const studentMotherFirstName = useRef();
    const studentMotherMiddleName = useRef();
    const studentMotherLastName = useRef();
    const studentMotherEmail = useRef();
    const studentMotherMobile = useRef();
    const studentMotherQualification = useRef();
    const studentMotherOccupation = useRef();
    const studentMotherIncome = useRef();
    const studentMotherDepartment = useRef();
    const studentMotherDesignation = useRef();
    const studentMotherAadharCardNo = useRef();
    const studentMotherPanCardNo = useRef();
    const studentMotherCompanyName = useRef();
    const studentMotherOfficeAddress = useRef();
    //guardian details
    const studentGuardianFirstName = useRef();
    const studentGuardianEmail = useRef();
    const studentGuardianMobile = useRef();
    const studentGuardianRelation = useRef();
    const studentGuardianQualification = useRef();
    const studentGuardianOccupation = useRef();
    const studentGuardianDepartment = useRef();
    const studentGuardianDesignation = useRef();
    const studentGuardianAadharCardNo = useRef();
    const studentGuardianOfficeAddress = useRef();
    const studentGuardianIdNo = useRef();
    const studentGuardianVillage = useRef();
    //present address
    const studentPresentAddress = useRef();
    const studentPresentCity = useRef();
    const studentPresentTaluka = useRef();
    const studentPresentDistrict = useRef();
    const studentPresentPinCode = useRef();
    const studentPresentState = useRef();
    //Permanent address
    const studentParmanentAddress = useRef();
    const studentParmanentCity = useRef();
    const studentParmanentDistrict = useRef();
    const studentParmanentPinCode = useRef();
    const studentParmanentState = useRef();
    //student academic details
    const studentAcademicClass = useRef();
    const studentAcademicHouse = useRef();
    const studentAcademicAdmissionNo = useRef();
    const studentAcademicAdmissionDate = useRef();

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
        student_middle_name: "",
        student_last_name: "",
        student_gender: "",
        student_aadhar_card_no: "",
        student_blood_group: "",
        student_religion: "",
        student_category_id: "",
        student_email_id: "",
        student_nationality_id: "",
        student_srn_id: "",
        student_child_id: "",
        student_samagra_id: "",
        student_place_of_birth: "",
        student_caste_id: "",
        student_admission_class: "",
        student_empoyment_id: "",
        student_height_id: "",
        student_weight_id: "",
        student_mother_tongue: "",
        student_medical_condition: "",
        student_notes_id: "",
        student_is_speacial_child: "",
        student_economically_weak: "",
        student_sub_caste_id: "",
        //student bank details
        student_bank_name: "",
        student_bank_account_holder: "",
        student_bank_account_type: "",
        student_bank_account_no: "",
        student_bank_ific_code: "",
        student_bank_micr_no: "",
        student_bank_branch_name: "",
        //previous school details
        student_previous_school_name: "",
        student_previous_school_class: "",
        student_previous_school_year: "",
        student_previous_school_tc: "",
        //father details
        student_father_first_name: "",
        student_father_middle_name: "",
        student_father_last_name: "",
        student_father_email: "",
        student_father_mobile: "",
        student_father_mobile_sms: "",
        student_father_qualification: "",
        student_father_occupation: "",
        student_father_income: "",
        student_father_department: "",
        student_father_designation: "",
        student_father_adhar_card_no: "",
        student_father_pan_card_no: "",
        student_father_company_name: "",
        student_father_office_address: "",
        //mother details
        student_mother_first_name: "",
        student_mother_middle_name: "",
        student_mother_last_name: "",
        student_mother_email: "",
        student_mother_mobile: "",
        student_mother_qualification: "",
        student_mother_occupation: "",
        student_mother_income: "",
        student_mother_department: "",
        student_mother_designation: "",
        student_mother_adhar_card_no: "",
        student_mother_pan_card_no: "",
        student_mother_company_name: "",
        student_mother_office_address: "",
        //guardian details
        student_guardian_first_name: "",
        student_guardian_email: "",
        student_guardian_mobile: "",
        student_guardian_relation: "",
        student_guardian_qualification: "",
        student_guardian_occupation: "",
        student_guardian_department: "",
        student_guardian_designation: "",
        student_guardian_adhar_card_no: "",
        student_guardian_office_address: "",
        student_guardian_id_no: "",
        student_guardian_village: "",
        //Present Address
        student_present_address: "",
        student_present_city: "",
        student_present_taluka: "",
        student_present_district: "",
        student_present_pin_code: "",
        student_present_state: "",
        //Permanent Address
        student_parmanent_address: "",
        student_parmanent_city: "",
        student_parmanent_taluka: "",
        student_parmanent_district: "",
        student_parmanent_pin_code: "",
        student_parmanent_state: "",
        student_present_address_same: "",
        //document card
        student_document_pan_card: "",
        student_document_aadhaar_card: "",
        student_document_votar_card: "",
        student_document_passport: "",
        //student academic details
        student_academic_class: "",
        student_academic_house: "",
        student_academic_admission_no: "",
        student_academic_status: "",
        student_academic_admission_date: "",
        student_have_sibling: "",
        student_academic_day_scholar: "",
        student_academic_caste: "",
    });

    const studentDetailsData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={studentDetailsData}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-create-school-details">
                        <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Profile Images
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
                                                <div className="educare-student-parent-profile-images">
                                                    <div className="educare-student-parent-profile-images-wrap flex flex-wrap gap-x-8">
                                                        <div className="educare-student-parent-profile-image w-50% maxXs:w-full">
                                                            <h6>
                                                                Student Photo
                                                            </h6>
                                                            <label htmlFor="student_profile_image">
                                                                <img
                                                                    src={
                                                                        placeholderImage
                                                                    }
                                                                    alt="img not found"
                                                                />
                                                            </label>
                                                        </div>
                                                        <div className="educare-student-parent-profile-image w-50% maxXs:w-full">
                                                            <h6>
                                                                Father Photo
                                                            </h6>
                                                            <label htmlFor="student_father_profile_image">
                                                                <img
                                                                    src={
                                                                        placeholderImage
                                                                    }
                                                                    alt="img not found"
                                                                />
                                                            </label>
                                                        </div>
                                                        <div className="educare-student-parent-profile-image w-50% maxXs:w-full">
                                                            <h6>
                                                                Mother Photo
                                                            </h6>
                                                            <label htmlFor="student_mother_profile_image">
                                                                <img
                                                                    src={
                                                                        placeholderImage
                                                                    }
                                                                    alt="img not found"
                                                                />
                                                            </label>
                                                        </div>
                                                        <div className="educare-student-parent-profile-image w-50% maxXs:w-full">
                                                            <h6>
                                                                Guardian Photo
                                                            </h6>
                                                            <label htmlFor="student_guardian_profile_image">
                                                                <img
                                                                    src={
                                                                        placeholderImage
                                                                    }
                                                                    alt="img not found"
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* upload image form end */}


                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Student Academic Details
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_academic_class"
                                                        value="Class"
                                                    />
                                                    <TextInput
                                                        id="student_academic_class"
                                                        ref={
                                                            studentAcademicClass
                                                        }
                                                        value={
                                                            data.student_academic_class
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_academic_class",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_academic_class
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_academic_house"
                                                        value="House"
                                                    />
                                                    <TextInput
                                                        id="student_academic_house"
                                                        ref={
                                                            studentAcademicHouse
                                                        }
                                                        value={
                                                            data.student_academic_house
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_academic_house",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_academic_house
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_academic_admission_no"
                                                        value="Admission No"
                                                    />
                                                    <TextInput
                                                        id="student_academic_admission_no"
                                                        ref={
                                                            studentAcademicAdmissionNo
                                                        }
                                                        value={
                                                            data.student_academic_admission_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_academic_admission_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_academic_admission_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_academic_admission_date"
                                                        value="Admission No"
                                                    />
                                                    <TextInput
                                                        id="student_academic_admission_date"
                                                        ref={
                                                            studentAcademicAdmissionDate
                                                        }
                                                        value={
                                                            data.student_academic_admission_date
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_academic_admission_date",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_academic_admission_date
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Permanent address form end */}

                            

                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-user"></i>
                                            Student Personal Details
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="student_first_name"
                                                                value="First Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="student_first_name"
                                                        ref={studentFirstName}
                                                        value={
                                                            data.student_first_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_first_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_first_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_middle_name"
                                                        value="Middle Name"
                                                    />
                                                    <TextInput
                                                        id="student_middle_name"
                                                        ref={studentMiddleName}
                                                        value={
                                                            data.student_middle_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_middle_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_middle_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_last_name"
                                                        value="Last Name"
                                                    />
                                                    <TextInput
                                                        id="student_last_name"
                                                        ref={studentLastName}
                                                        value={
                                                            data.student_last_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_last_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_last_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_gender"
                                                        value="Gender"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_gender
                                                        }
                                                        className="mt-2"
                                                    />
                                                    <TextInput
                                                        id="student_gender"
                                                        ref={studentGender}
                                                        value={
                                                            data.student_gender
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_gender",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_gender
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_aadhar_card_no"
                                                        value="Aadhar Card No"
                                                    />
                                                    <TextInput
                                                        id="student_aadhar_card_no"
                                                        ref={
                                                            studentAadharCardNoInput
                                                        }
                                                        value={
                                                            data.student_aadhar_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_aadhar_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_aadhar_card_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_birth_date1"
                                                        value=" Date of Birth"
                                                    />
                                                    <TextInput
                                                        id="student_birth_date"
                                                        ref={
                                                            studentBirthDateInput
                                                        }
                                                        value={
                                                            data.student_birth_date
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_birth_date",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_birth_date
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_blood_group"
                                                        value="Blood Group"
                                                    />
                                                    <TextInput
                                                        id="student_blood_group"
                                                        ref={
                                                            studentBloodGroupInput
                                                        }
                                                        value={
                                                            data.student_blood_group
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_blood_group",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_blood_group
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_religion"
                                                        value="Religion"
                                                    />
                                                    <TextInput
                                                        id="student_religion"
                                                        ref={
                                                            studentReligionInput
                                                        }
                                                        value={
                                                            data.student_religion
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_religion",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_religion
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_category_id"
                                                        value="Category"
                                                    />
                                                    <TextInput
                                                        id="student_category_id"
                                                        ref={
                                                            studentCategoryIdInput
                                                        }
                                                        value={
                                                            data.student_category_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_category_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_category_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_email_id"
                                                        value="Email"
                                                    />
                                                    <TextInput
                                                        id="student_email_id"
                                                        ref={
                                                            studentEmailIdInput
                                                        }
                                                        value={
                                                            data.student_email_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_email_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="email"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_email_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_nationality_id"
                                                        value="Nationality"
                                                    />
                                                    <SelectInput
                                                        id="student_nationality_id"
                                                        data_label="Nationality"
                                                        data={[]}
                                                        ref={
                                                            studentNationalityIdInput
                                                        }
                                                        value={
                                                            data.student_nationality_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_nationality_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_nationality_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_srn_id"
                                                        value="SRN No."
                                                    />
                                                    <TextInput
                                                        id="student_srn_id"
                                                        ref={studentSRNIdInput}
                                                        value={
                                                            data.student_srn_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_srn_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_srn_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_child_id"
                                                        value="Child ID"
                                                    />
                                                    <TextInput
                                                        id="student_child_id"
                                                        ref={
                                                            studentChildIdInput
                                                        }
                                                        value={
                                                            data.student_child_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_child_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_child_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_samagra_id"
                                                        value="Samagra ID"
                                                    />
                                                    <TextInput
                                                        id="student_child_id"
                                                        ref={
                                                            studentSamagraIdInput
                                                        }
                                                        value={
                                                            data.student_child_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_child_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_child_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_place_of_birth"
                                                        value="Place Of Birth"
                                                    />
                                                    <TextInput
                                                        id="student_place_of_birth"
                                                        ref={
                                                            studentPlaceOfBirthInput
                                                        }
                                                        value={
                                                            data.student_place_of_birth
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_place_of_birth",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_place_of_birth
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_caste_id"
                                                        value="Caste"
                                                    />
                                                    <TextInput
                                                        id="student_caste_id"
                                                        ref={
                                                            studentCasteIdInput
                                                        }
                                                        value={
                                                            data.student_caste_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_caste_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_caste_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_admission_class"
                                                        value="Admission Class"
                                                    />
                                                    <TextInput
                                                        id="student_admission_class"
                                                        ref={
                                                            studentAdmissionClassInput
                                                        }
                                                        value={
                                                            data.student_admission_class
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_admission_class",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_admission_class
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_empoyment_id"
                                                        value="Employment"
                                                    />
                                                    <SelectInput
                                                        id="student_empoyment_id"
                                                        data_label="Employment"
                                                        data={[]}
                                                        ref={
                                                            studentEmploymentIdInput
                                                        }
                                                        value={
                                                            data.student_empoyment_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_empoyment_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_empoyment_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_height_id"
                                                        value="Height (cm)"
                                                    />
                                                    <TextInput
                                                        id="student_height_id"
                                                        ref={studentHeightInput}
                                                        value={
                                                            data.student_height_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_height_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="number"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_height_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_weight_id"
                                                        value="Weight (kg)"
                                                    />
                                                    <TextInput
                                                        id="student_weight_id"
                                                        ref={studentWeightInput}
                                                        value={
                                                            data.student_weight_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_weight_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="number"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_weight_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_mother_tongue"
                                                        value="Mother Tongue"
                                                    />
                                                    <TextInput
                                                        id="student_mother_tongue"
                                                        ref={
                                                            studentMotherTongueInput
                                                        }
                                                        value={
                                                            data.student_mother_tongue
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_mother_tongue",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_mother_tongue
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_medical_condition"
                                                        value="Medical Condition/Allergies (if any)"
                                                    />
                                                    <TextInput
                                                        id="student_medical_condition"
                                                        ref={
                                                            studentMedicalConditionInput
                                                        }
                                                        value={
                                                            data.student_medical_condition
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_medical_condition",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_medical_condition
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_notes_id"
                                                        value="Notes"
                                                    />
                                                    <TextInput
                                                        id="student_notes_id"
                                                        ref={
                                                            studentNotesIdInput
                                                        }
                                                        value={
                                                            data.student_notes_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_notes_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_notes_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-checkbox-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_is_speacial_child"
                                                        value="Is Handicapped"
                                                    />
                                                    <Checkbox
                                                        name="student_is_speacial_child"
                                                        checked={
                                                            data.student_is_speacial_child
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_is_speacial_child",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-checkbox-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_economically_weak"
                                                        value="EWS- Economically Weaker Section"
                                                    />
                                                    <Checkbox
                                                        name="student_economically_weak"
                                                        checked={
                                                            data.student_economically_weak
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_economically_weak",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="student_sub_caste_id"
                                                                value="Sub Caste"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add Custom Field
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="student_sub_caste_id"
                                                        data_label="Sub Caste"
                                                        data={[]}
                                                        ref={
                                                            studentSubCasteIdInput
                                                        }
                                                        value={
                                                            data.student_sub_caste_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_sub_caste_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_sub_caste_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school personal details form end */}

                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            cardActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5>
                                            <i className="icon-bank"></i>
                                            Student Bank Details
                                        </h5>
                                        <span
                                            onClick={handleToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    cardActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            cardActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_bank_name"
                                                        value="Bank Name"
                                                    />
                                                    <TextInput
                                                        id="student_bank_name"
                                                        ref={
                                                            studentBankNameInput
                                                        }
                                                        value={
                                                            data.student_bank_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_bank_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_bank_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_bank_account_holder"
                                                        value="Account Holder Name"
                                                    />
                                                    <TextInput
                                                        id="student_bank_account_holder"
                                                        ref={
                                                            studentBankAccountHolderInput
                                                        }
                                                        value={
                                                            data.student_bank_account_holder
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_bank_account_holder",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_bank_account_holder
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_bank_account_type"
                                                        value="Account Type"
                                                    />
                                                    <SelectInput
                                                        id="student_bank_account_type"
                                                        data_label="Account Type"
                                                        data={[]}
                                                        ref={
                                                            studentBankAccountTypeInput
                                                        }
                                                        value={
                                                            data.student_bank_account_type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_bank_account_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_bank_account_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_bank_account_no"
                                                        value="Account No"
                                                    />
                                                    <TextInput
                                                        id="student_bank_account_no"
                                                        ref={
                                                            studentBankAccountNoInput
                                                        }
                                                        value={
                                                            data.student_bank_account_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_bank_account_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_bank_account_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_bank_ific_code"
                                                        value="IFSC Code"
                                                    />
                                                    <TextInput
                                                        id="student_bank_ific_code"
                                                        ref={
                                                            studentBankIficCodeInput
                                                        }
                                                        value={
                                                            data.student_bank_ific_code
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_bank_ific_code",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_bank_ific_code
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_bank_micr_no"
                                                        value="MICR No"
                                                    />
                                                    <TextInput
                                                        id="student_bank_micr_no"
                                                        ref={
                                                            studentBankMicrNoInput
                                                        }
                                                        value={
                                                            data.student_bank_micr_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_bank_micr_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_bank_micr_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_bank_branch_name"
                                                        value="Branch Name"
                                                    />
                                                    <TextInput
                                                        id="student_bank_branch_name"
                                                        ref={
                                                            studentBankBranchNameInput
                                                        }
                                                        value={
                                                            data.student_bank_branch_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_bank_branch_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_bank_branch_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school bank details form end */}

                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            cardActive1 ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5>
                                            <i className="icon-Buildings"></i>
                                            Previous School Details
                                        </h5>
                                        <span
                                            onClick={handleToggle1}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    cardActive1
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            cardActive1 ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_previous_school_name"
                                                        value="School Name"
                                                    />
                                                    <TextInput
                                                        id="student_previous_school_name"
                                                        ref={
                                                            studentPreviousSchoolNameInput
                                                        }
                                                        value={
                                                            data.student_previous_school_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_previous_school_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_previous_school_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_previous_school_class"
                                                        value="School Class"
                                                    />
                                                    <TextInput
                                                        id="student_previous_school_class"
                                                        ref={
                                                            studentPreviousSchoolClassInput
                                                        }
                                                        value={
                                                            data.student_previous_school_class
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_previous_school_class",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_previous_school_class
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_previous_school_year"
                                                        value="School Year"
                                                    />
                                                    <TextInput
                                                        id="student_previous_school_year"
                                                        ref={
                                                            studentPreviousSchoolYearInput
                                                        }
                                                        value={
                                                            data.student_previous_school_year
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_previous_school_year",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_previous_school_year
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_previous_school_tc"
                                                        value="TC Number"
                                                    />
                                                    <TextInput
                                                        id="student_previous_school_tc"
                                                        ref={
                                                            studentPreviousSchoolTcInput
                                                        }
                                                        value={
                                                            data.student_previous_school_tc
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_previous_school_tc",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_previous_school_tc
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school bank details form end */}

                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            cardActive5 ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5>
                                            <i className="icon-Buildings"></i>
                                            Transport
                                        </h5>
                                        <span
                                            onClick={handleToggle5}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    cardActive5
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            cardActive5 ? "" : "hidden"
                                        }`}
                                    >
                                        <div>
                                            <div className="vehicle-route-area mb-6">
                                                <div className="vehicle-route-area-item">
                                                    <h6>Vehicle</h6>
                                                    <div className="vehicle-route-area-item-icon">
                                                        <i className="icon-Car"></i>
                                                    </div>
                                                    <div>
                                                        <span>JH-098</span>
                                                    </div>
                                                </div>
                                                <div className="vehicle-route-area-item">
                                                    <h6>Route</h6>
                                                    <div className="vehicle-route-area-item-icon">
                                                        <i className="icon-Car"></i>
                                                    </div>
                                                    <div>
                                                        <span>Route-2</span>
                                                    </div>
                                                </div>
                                                <div className="vehicle-route-area-item">
                                                    <h6>Stoppage</h6>
                                                    <div className="vehicle-route-area-item-icon">
                                                        <i className="icon-Car"></i>
                                                    </div>
                                                    <div>
                                                        <span>Mango</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="educare-classroom-table-wrapper">
                                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Driver Name</th>
                                                                <th>Driver Mobile</th>
                                                                <th>Co-ordinator</th>
                                                                <th>Co-Mobile</th>
                                                                <th>Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Ramesh</td>
                                                                <td>9874563258</td>
                                                                <td>Akhil</td>
                                                                <td>Lily</td>
                                                                <td>900</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school bank details form end */}

                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            cardActive6 ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5>
                                            <i className="icon-Buildings"></i>
                                            Subject Details
                                        </h5>
                                        <span
                                            onClick={handleToggle6}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    cardActive6
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            cardActive6 ? "" : "hidden"
                                        }`}
                                    >
                                        <div>
                                            <div className="educare-classroom-table-wrapper">
                                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Subject Name</th>
                                                                <th>Type</th>
                                                                <th>Subject Teacher</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>English</td>
                                                                <td>English</td>
                                                                <td>Akhil</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school bank details form end */}
                        </div>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-create-school-details-form-wrap">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-school-form-action-title">
                                    <h5>
                                        <i className="icon-Buildings"></i>
                                        Father's Details
                                    </h5>
                                </div>
                                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="student_father_first_name"
                                                            value="First Name"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="student_father_first_name"
                                                    ref={studentFatherFirstName}
                                                    value={
                                                        data.student_father_first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_middle_name"
                                                    value="Middle Name"
                                                />
                                                <TextInput
                                                    id="student_father_middle_name"
                                                    ref={
                                                        studentFatherMiddleName
                                                    }
                                                    value={
                                                        data.student_father_middle_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_middle_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_middle_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_last_name"
                                                    value="Last Name"
                                                />
                                                <TextInput
                                                    id="student_father_last_name"
                                                    ref={studentFatherLastName}
                                                    value={
                                                        data.student_father_last_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_last_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_email"
                                                    value="Email"
                                                />
                                                <TextInput
                                                    id="student_father_email"
                                                    ref={studentFatherEmail}
                                                    value={
                                                        data.student_father_email
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_email",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_middle_name
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
                                                            htmlFor="student_father_mobile"
                                                            value="Mobile"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="student_father_mobile"
                                                    ref={studentFatherMobile}
                                                    value={
                                                        data.student_father_mobile
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_mobile",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_mobile
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_mobile_sms"
                                                    value="SMS Number"
                                                />
                                                <TextInput
                                                    id="student_father_mobile_sms"
                                                    ref={studentFatherMobileSms}
                                                    value={
                                                        data.student_father_mobile_sms
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_mobile_sms",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_mobile_sms
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_qualification"
                                                    value="Highest Qualification"
                                                />
                                                <TextInput
                                                    id="student_father_qualification"
                                                    ref={
                                                        studentFatherQualification
                                                    }
                                                    value={
                                                        data.student_father_qualification
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_qualification",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Type for suggestions"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_qualification
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_occupation"
                                                    value="Occupation"
                                                />
                                                <TextInput
                                                    id="student_father_occupation"
                                                    ref={
                                                        studentFatherOccupation
                                                    }
                                                    value={
                                                        data.student_father_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Type for suggestions"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_occupation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_income"
                                                    value="Income Per Year"
                                                />
                                                <TextInput
                                                    id="student_father_income"
                                                    ref={studentFatherIncome}
                                                    value={
                                                        data.student_father_income
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_income",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_income
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_department"
                                                    value="Department"
                                                />
                                                <TextInput
                                                    id="student_father_department"
                                                    ref={
                                                        studentFatherDepartment
                                                    }
                                                    value={
                                                        data.student_father_department
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_department",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_department
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_designation"
                                                    value="Designation"
                                                />
                                                <TextInput
                                                    id="student_father_designation"
                                                    ref={
                                                        studentFatherDesignation
                                                    }
                                                    value={
                                                        data.student_father_designation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_designation",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_designation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_adhar_card_no"
                                                    value="Aadhar Card No"
                                                />
                                                <TextInput
                                                    id="student_father_adhar_card_no"
                                                    ref={
                                                        studentFatherAadharCardNo
                                                    }
                                                    value={
                                                        data.student_father_adhar_card_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_adhar_card_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_adhar_card_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_pan_card_no"
                                                    value="Pan Card No"
                                                />
                                                <TextInput
                                                    id="student_father_pan_card_no"
                                                    ref={studentFatherPanCardNo}
                                                    value={
                                                        data.student_father_pan_card_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_pan_card_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_pan_card_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_company_name"
                                                    value="Company Name"
                                                />
                                                <TextInput
                                                    id="student_father_company_name"
                                                    ref={
                                                        studentFatherCompanyName
                                                    }
                                                    value={
                                                        data.student_father_company_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_company_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_company_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_father_office_address"
                                                    value="Office Address"
                                                />
                                                <TextInput
                                                    id="student_father_office_address"
                                                    ref={
                                                        studentFatherOfficeAddress
                                                    }
                                                    value={
                                                        data.student_father_office_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_father_office_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_father_office_address
                                                    }
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
                                                <InputLabel
                                                    htmlFor="student_mother_first_name"
                                                    value="First Name"
                                                />
                                                <TextInput
                                                    id="student_mother_first_name"
                                                    ref={studentMotherFirstName}
                                                    value={
                                                        data.student_mother_first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_middle_name"
                                                    value="Middle Name"
                                                />
                                                <TextInput
                                                    id="student_mother_middle_name"
                                                    ref={
                                                        studentMotherMiddleName
                                                    }
                                                    value={
                                                        data.student_mother_middle_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_middle_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_middle_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_last_name"
                                                    value="Last Name"
                                                />
                                                <TextInput
                                                    id="student_mother_last_name"
                                                    ref={studentMotherLastName}
                                                    value={
                                                        data.student_mother_last_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_last_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_email"
                                                    value="Email"
                                                />
                                                <TextInput
                                                    id="student_mother_email"
                                                    ref={studentMotherEmail}
                                                    value={
                                                        data.student_mother_email
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_email",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_middle_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_mobile"
                                                    value="Mobile"
                                                />
                                                <TextInput
                                                    id="student_mother_mobile"
                                                    ref={studentMotherMobile}
                                                    value={
                                                        data.student_mother_mobile
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_mobile",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_mobile
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_qualification"
                                                    value="Highest Qualification"
                                                />
                                                <TextInput
                                                    id="student_mother_qualification"
                                                    ref={
                                                        studentMotherQualification
                                                    }
                                                    value={
                                                        data.student_mother_qualification
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_qualification",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Type for suggestions"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_qualification
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_occupation"
                                                    value="Occupation"
                                                />
                                                <TextInput
                                                    id="student_mother_occupation"
                                                    ref={
                                                        studentMotherOccupation
                                                    }
                                                    value={
                                                        data.student_mother_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Type for suggestions"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_occupation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_income"
                                                    value="Income Per Year"
                                                />
                                                <TextInput
                                                    id="student_mother_income"
                                                    ref={studentMotherIncome}
                                                    value={
                                                        data.student_mother_income
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_income",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_income
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_department"
                                                    value="Department"
                                                />
                                                <TextInput
                                                    id="student_mother_department"
                                                    ref={
                                                        studentMotherDepartment
                                                    }
                                                    value={
                                                        data.student_mother_department
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_department",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_department
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_designation"
                                                    value="Designation"
                                                />
                                                <TextInput
                                                    id="student_mother_designation"
                                                    ref={
                                                        studentMotherDesignation
                                                    }
                                                    value={
                                                        data.student_mother_designation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_designation",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_designation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_adhar_card_no"
                                                    value="Aadhar Card No"
                                                />
                                                <TextInput
                                                    id="student_mother_adhar_card_no"
                                                    ref={
                                                        studentMotherAadharCardNo
                                                    }
                                                    value={
                                                        data.student_mother_adhar_card_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_adhar_card_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_adhar_card_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_pan_card_no"
                                                    value="Pan Card No"
                                                />
                                                <TextInput
                                                    id="student_mother_pan_card_no"
                                                    ref={studentMotherPanCardNo}
                                                    value={
                                                        data.student_mother_pan_card_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_pan_card_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_pan_card_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_company_name"
                                                    value="Company Name"
                                                />
                                                <TextInput
                                                    id="student_mother_company_name"
                                                    ref={
                                                        studentMotherCompanyName
                                                    }
                                                    value={
                                                        data.student_mother_company_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_company_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_company_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_mother_office_address"
                                                    value="Office Address"
                                                />
                                                <TextInput
                                                    id="student_mother_office_address"
                                                    ref={
                                                        studentMotherOfficeAddress
                                                    }
                                                    value={
                                                        data.student_mother_office_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_mother_office_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_mother_office_address
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
                                <div
                                    className={`educare-school-form-action-title ${
                                        cardActive2 ? "" : "pb-0"
                                    }`}
                                >
                                    <h5>
                                        <i className="icon-Buildings"></i>
                                        Guardian Details
                                    </h5>
                                    <span
                                        onClick={handleToggle2}
                                        className="cursor-pointer"
                                    >
                                        <i
                                            className={`${
                                                cardActive2
                                                    ? "icon-minus"
                                                    : "icon-plus"
                                            }`}
                                        ></i>
                                    </span>
                                </div>
                                <div
                                    className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                        cardActive2 ? "" : "hidden"
                                    }`}
                                >
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_first_name"
                                                    value="First Name"
                                                />
                                                <TextInput
                                                    id="student_guardian_first_name"
                                                    ref={
                                                        studentGuardianFirstName
                                                    }
                                                    value={
                                                        data.student_guardian_first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_email"
                                                    value="Email"
                                                />
                                                <TextInput
                                                    id="student_guardian_email"
                                                    ref={studentGuardianEmail}
                                                    value={
                                                        data.student_guardian_email
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_email",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_middle_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_mobile"
                                                    value="Mobile"
                                                />
                                                <TextInput
                                                    id="student_guardian_mobile"
                                                    ref={studentGuardianMobile}
                                                    value={
                                                        data.student_guardian_mobile
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_mobile",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_mobile
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_relation"
                                                    value="Relation"
                                                />
                                                <TextInput
                                                    id="student_guardian_relation"
                                                    ref={
                                                        studentGuardianRelation
                                                    }
                                                    value={
                                                        data.student_guardian_relation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_relation",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_relation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_qualification"
                                                    value="Highest Qualification"
                                                />
                                                <TextInput
                                                    id="student_guardian_qualification"
                                                    ref={
                                                        studentGuardianQualification
                                                    }
                                                    value={
                                                        data.student_guardian_qualification
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_qualification",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Type for suggestions"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_qualification
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_occupation"
                                                    value="Occupation"
                                                />
                                                <TextInput
                                                    id="student_guardian_occupation"
                                                    ref={
                                                        studentGuardianOccupation
                                                    }
                                                    value={
                                                        data.student_guardian_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Type for suggestions"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_occupation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_department"
                                                    value="Department"
                                                />
                                                <TextInput
                                                    id="student_guardian_department"
                                                    ref={
                                                        studentGuardianDepartment
                                                    }
                                                    value={
                                                        data.student_guardian_department
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_department",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_department
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_designation"
                                                    value="Designation"
                                                />
                                                <TextInput
                                                    id="student_guardian_designation"
                                                    ref={
                                                        studentGuardianDesignation
                                                    }
                                                    value={
                                                        data.student_guardian_designation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_designation",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_designation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_adhar_card_no"
                                                    value="Aadhar Card No"
                                                />
                                                <TextInput
                                                    id="student_guardian_adhar_card_no"
                                                    ref={
                                                        studentGuardianAadharCardNo
                                                    }
                                                    value={
                                                        data.student_guardian_adhar_card_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_adhar_card_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_adhar_card_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_id_no"
                                                    value="Guardian Id"
                                                />
                                                <TextInput
                                                    id="student_guardian_id_no"
                                                    ref={studentGuardianIdNo}
                                                    value={
                                                        data.student_guardian_id_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_id_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_id_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_village"
                                                    value="Village/City"
                                                />
                                                <TextInput
                                                    id="student_guardian_village"
                                                    ref={studentGuardianVillage}
                                                    value={
                                                        data.student_guardian_village
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_village",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_village
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_guardian_office_address"
                                                    value="Address"
                                                />
                                                <TextInput
                                                    id="student_guardian_office_address"
                                                    ref={
                                                        studentGuardianOfficeAddress
                                                    }
                                                    value={
                                                        data.student_guardian_office_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_guardian_office_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_guardian_office_address
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Guardian details form end */}

                        <div className="educare-create-school-details-form-wrap">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div
                                    className={`educare-school-form-action-title ${
                                        cardActive3 ? "" : "pb-0"
                                    }`}
                                >
                                    <h5>
                                        <i className="icon-MapPinLine"></i>
                                        Present Address
                                    </h5>
                                    <span
                                        onClick={handleToggle3}
                                        className="cursor-pointer"
                                    >
                                        <i
                                            className={`${
                                                cardActive3
                                                    ? "icon-minus"
                                                    : "icon-plus"
                                            }`}
                                        ></i>
                                    </span>
                                </div>
                                <div
                                    className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                        cardActive3 ? "" : "hidden"
                                    }`}
                                >
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_present_address"
                                                    value="Address"
                                                />
                                                <TextInput
                                                    id="student_present_address"
                                                    ref={studentPresentAddress}
                                                    value={
                                                        data.student_present_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_present_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_present_address
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_present_state"
                                                    value="State"
                                                />
                                                <SelectInput
                                                    id="student_present_state"
                                                    data_label="State"
                                                    data={[]}
                                                    ref={studentPresentState}
                                                    value={
                                                        data.student_present_state
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_present_state",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_present_state
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_present_city"
                                                    value="City"
                                                />
                                                <TextInput
                                                    id="student_present_city"
                                                    ref={studentPresentCity}
                                                    value={
                                                        data.student_present_city
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_present_city",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_present_city
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_present_taluka"
                                                    value="Taluka"
                                                />
                                                <TextInput
                                                    id="student_present_taluka"
                                                    ref={studentPresentTaluka}
                                                    value={
                                                        data.student_present_taluka
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_present_taluka",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_present_taluka
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_present_district"
                                                    value="District"
                                                />
                                                <TextInput
                                                    id="student_present_district"
                                                    ref={studentPresentDistrict}
                                                    value={
                                                        data.student_present_district
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_present_district",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_present_district
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_present_pin_code"
                                                    value="Pin code"
                                                />
                                                <TextInput
                                                    id="student_present_pin_code"
                                                    ref={studentPresentPinCode}
                                                    value={
                                                        data.student_present_pin_code
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_present_pin_code",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_present_pin_code
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* present address form end */}

                        <div className="educare-create-school-details-form-wrap">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div
                                    className={`educare-school-form-action-title ${
                                        cardActive4 ? "" : "pb-0"
                                    }`}
                                >
                                    <h5>
                                        <i className="icon-MapPinLine"></i>
                                        Permanent Address
                                    </h5>
                                    <span
                                        onClick={handleToggle4}
                                        className="cursor-pointer"
                                    >
                                        <i
                                            className={`${
                                                cardActive4
                                                    ? "icon-minus"
                                                    : "icon-plus"
                                            }`}
                                        ></i>
                                    </span>
                                </div>
                                <div
                                    className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                        cardActive4 ? "" : "hidden"
                                    }`}
                                >
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Same As Present Address
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="student_present_address_same"
                                                            checked={
                                                                data.student_present_address_same
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "student_present_address_same",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_parmanent_address"
                                                    value="Address"
                                                />
                                                <TextInput
                                                    id="student_parmanent_address"
                                                    ref={
                                                        studentParmanentAddress
                                                    }
                                                    value={
                                                        data.student_parmanent_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_parmanent_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_parmanent_address
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_parmanent_state"
                                                    value="State"
                                                />
                                                <SelectInput
                                                    id="student_parmanent_state"
                                                    data_label="State"
                                                    data={[]}
                                                    ref={studentParmanentState}
                                                    value={
                                                        data.student_parmanent_state
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_parmanent_state",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_parmanent_state
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_parmanent_city"
                                                    value="City"
                                                />
                                                <TextInput
                                                    id="student_parmanent_city"
                                                    ref={studentParmanentCity}
                                                    value={
                                                        data.student_parmanent_city
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_parmanent_city",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_parmanent_city
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_parmanent_district"
                                                    value="District"
                                                />
                                                <TextInput
                                                    id="student_parmanent_district"
                                                    ref={
                                                        studentParmanentDistrict
                                                    }
                                                    value={
                                                        data.student_parmanent_district
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_parmanent_district",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_parmanent_district
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_parmanent_pin_code"
                                                    value="Pin code"
                                                />
                                                <TextInput
                                                    id="student_parmanent_pin_code"
                                                    ref={
                                                        studentParmanentPinCode
                                                    }
                                                    value={
                                                        data.student_parmanent_pin_code
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_parmanent_pin_code",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_parmanent_pin_code
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Permanent address form end */}

                        <div className="educare-create-school-details-form-wrap">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-school-form-action-title">
                                    <h5>
                                        <i className="icon-FileText"></i>
                                        Document Attached
                                    </h5>
                                </div>
                                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="student_document_pan_card"
                                                        name="student_document_pan_card"
                                                        checked={
                                                            data.student_document_pan_card
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_document_pan_card",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="student_document_pan_card"
                                                        value="Pan Card"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="student_document_aadhaar_card"
                                                        name="student_document_aadhaar_card"
                                                        checked={
                                                            data.student_document_aadhaar_card
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_document_aadhaar_card",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="student_document_aadhaar_card"
                                                        value="Aadhaar Card"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="student_document_votar_card"
                                                        name="student_document_votar_card"
                                                        checked={
                                                            data.student_document_votar_card
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_document_votar_card",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="student_document_votar_card"
                                                        value="Voter Id Card"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full text-right">
                                                    <Checkbox
                                                        id="student_document_passport"
                                                        name="student_document_passport"
                                                        checked={
                                                            data.student_document_passport
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_document_passport",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="student_document_passport"
                                                        value="Passport"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Document attached form end */}
                    </div>
                </div>
                <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
                    <PrimaryButton
                        disabled={processing}
                        className="educare-gray-btn-lg-fill"
                    >
                        Reset
                    </PrimaryButton>
                    <DangerButton
                        disabled={processing}
                        className="educare-danger-btn-lg-fill"
                    >
                        Cancel
                    </DangerButton>
                    <DarkButton
                        disabled={processing}
                        className="educare-dark-btn-lg-fill"
                    >
                        Add Student & Exit
                    </DarkButton>
                    <PrimaryButton
                        disabled={processing}
                        className="educare-primary-btn-lg-fill"
                    >
                        Save and Add a new student
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Save</p>
                    </Transition>
                </div>
            </form>
        </div>
    );
};

export default StudentDetailsForm;
