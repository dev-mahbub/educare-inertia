import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import moment from "moment";
import { useEffect, useState } from "react";
import placeholderImage from "../../../../../images/icon/placeholder.jpg";

const StudentDetailsForm = ({
    className = "",
    student,
    fatherData,
    motherData,
    guardianData,
    countries,
    catEmps,
    subCasteArr,
    accountArr,
    states,
    transportData,
    subjectsData
 }) => {
    const [cardActive, setCardActive] = useState(false);
    const [cardActive1, setCardActive1] = useState(false);
    const [cardActive2, setCardActive2] = useState(false);
    const [cardActive3, setCardActive3] = useState(false);
    const [cardActive4, setCardActive4] = useState(false);
    const [cardActive5, setCardActive5] = useState(false);
    const [cardActive6, setCardActive6] = useState(false);

    const [selectedImages, setSelectedImages] = useState({
        student_profile_image: student?.student_image?.path,
        student_father_profile_image: student?.student_father_profile_image?.path,
        student_mother_profile_image: student?.student_mother_profile_image?.path,
        student_guardian_profile_image: student?.student_guardian_profile_image?.path,
    });

    const [attachedDocuments, setAttachedDocuments] = useState([]);

    useEffect(() => {
        if (student.document_attached != null) {
            const studentAttachedDocuments = JSON.parse(student.document_attached);

            setAttachedDocuments(studentAttachedDocuments?.filter(item => item?.is_have == true)?.map(item => item?.title));
        }
    }, [student]);

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

    const studentDetailsData = (e) => {
        e.preventDefault();
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
                                                                        selectedImages?.student_profile_image ?? placeholderImage
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
                                                                        selectedImages?.student_father_profile_image ?? placeholderImage
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
                                                                        selectedImages?.student_mother_profile_image ?? placeholderImage
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
                                                                        selectedImages?.student_guardian_profile_image ?? placeholderImage
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
                                                        defaultValue={
                                                            student?.classroom_student?.classroom?.title ? student?.classroom_student?.classroom?.title : student.classroom_title
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.house_name
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.admission_no
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_academic_admission_date"
                                                        value="Admission Date"
                                                    />
                                                    <TextInput
                                                        id="student_academic_admission_date"
                                                        defaultValue={
                                                            student?.admission_date_at != null ? moment(student?.admission_date_at).format("DD-MMM-YYYY") : ""
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.first_name
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.middle_name
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.last_name
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_gender"
                                                        value="Gender"
                                                    />
                                                    <TextInput
                                                        id="student_gender"
                                                        defaultValue={
                                                            student?.gender
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.aadhar_card_no
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.birth_date_at != null ? moment(student?.birth_date_at).format("DD-MMM-YYYY") : ""
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.blood_group
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.religion_name
                                                        }
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.category_title
                                                        }
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.email
                                                        }
                                                        type="email"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        data={countries}
                                                        defaultValue={
                                                            student?.country_id
                                                        }
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.srn_no
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.child_id
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        id="student_samagra_id"
                                                        defaultValue={
                                                            student?.samagra_id
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.birth_place
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.caste
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.admission_class
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        data={catEmps}
                                                        defaultValue={
                                                            student?.employment_cat_id
                                                        }
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.height
                                                        }
                                                        type="number"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.weight
                                                        }
                                                        type="number"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.mother_tongue
                                                        }

                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.medical_condition
                                                        }

                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.notes
                                                        }

                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-checkbox-field-styles">
                                                    <InputLabel
                                                        htmlFor="student_is_physically_disabled"
                                                        value="Is Physically Disabled?"
                                                    />
                                                    <Checkbox
                                                        disabled={true}
                                                        name="student_is_physically_disabled"
                                                        // checked={
                                                        //     student?.is_physical_disabled
                                                        // }
                                                        defaultChecked={student?.is_physical_disabled}
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
                                                        disabled={true}
                                                        name="student_economically_weak"
                                                        defaultChecked={student?.is_economically_weaker}
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
                                                    </div>
                                                    <SelectInput
                                                        disabled={true}
                                                        id="student_sub_caste_id"
                                                        data_label="Sub Caste"
                                                        data={subCasteArr}
                                                        defaultValue={
                                                            student?.sub_caste
                                                        }
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.bank_name
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.account_name
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        data={accountArr}
                                                        defaultValue={
                                                            student?.account_type
                                                        }
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.account_no
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.ifsc_code
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.micr_no
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.branch_name
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.prev_school_name
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.prev_school_class
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.prev_school_year
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        defaultValue={
                                                            student?.prev_school_tc_no
                                                        }
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
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
                                                        <span>{transportData?.vehicle_number}</span>
                                                    </div>
                                                </div>
                                                <div className="vehicle-route-area-item">
                                                    <h6>Route</h6>
                                                    <div className="vehicle-route-area-item-icon">
                                                        <i className="icon-Car"></i>
                                                    </div>
                                                    <div>
                                                        <span>{transportData?.route_name}</span>
                                                    </div>
                                                </div>
                                                <div className="vehicle-route-area-item">
                                                    <h6>Stoppage</h6>
                                                    <div className="vehicle-route-area-item-icon">
                                                        <i className="icon-Car"></i>
                                                    </div>
                                                    <div>
                                                        <span>{transportData?.stoppage}</span>
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
                                                                <td>{transportData?.driver_name}</td>
                                                                <td>{transportData?.driver_mobile}</td>
                                                                <td>{transportData?.conductor_name_name}</td>
                                                                <td>{transportData?.conductor_name_mobile}</td>
                                                                <td>{transportData?.transport_fee ?? ""}</td>
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
                                                            {Object.keys(subjectsData)?.length > 0 &&
                                                                Object.values(subjectsData)?.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item?.name}</td>
                                                                        <td>{item?.type}</td>
                                                                        <td>{item?.teacher_name}</td>
                                                                    </tr>
                                                                ))
                                                            }
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
                                                    defaultValue={
                                                        fatherData?.first_name
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.middle_name
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.last_name
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.email
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.phone
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.sms_phone
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.highest_qualification
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.occupation
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.income_per_year
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.department
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.designation
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.aadhar_card_no
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.pan_card_no
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.company_name
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        fatherData?.office_address
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.first_name
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.middle_name
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.last_name
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.email
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.phone
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.sms_phone
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.occupation
                                                    }
                                                    placeHolder="Type for suggestions"
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.income_per_year
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.department
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.designation
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.aadhar_card_no
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.pan_card_no
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.company_name
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        motherData?.office_address
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.first_name
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.email
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.phone
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.relation
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.highest_qualification
                                                    }
                                                    placeHolder="Type for suggestions"
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.occupation
                                                    }
                                                    placeHolder="Type for suggestions"
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.department
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.designation
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.aadhar_card_no
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.guardianid
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.city
                                                    }
                                                    type="email"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        guardianData?.address
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        student?.present_address
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    data={states}
                                                    defaultValue={
                                                        student?.present_state
                                                    }
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        student?.present_city
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        student?.present_taluka
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        student?.present_district
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        student?.present_pin_code
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_parmanent_address"
                                                    value="Address"
                                                />
                                                <TextInput
                                                    id="student_parmanent_address"
                                                    defaultValue={
                                                        student?.permanent_address
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    data={states}
                                                    defaultValue={
                                                        student?.permanent_state
                                                    }
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        student?.permanent_city
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        student?.permanent_district
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                    defaultValue={
                                                        student?.permanent_pin_code
                                                    }
                                                    type="text"
                                                    disabled={true}
                                                    className="block cursor-not-allowed"
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
                                                        defaultChecked={
                                                            attachedDocuments?.includes('Pan card')
                                                        }
                                                        disabled={true}
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
                                                        defaultChecked={
                                                            attachedDocuments?.includes('Aadhaar card')
                                                        }
                                                        disabled={true}
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
                                                        defaultChecked={
                                                            attachedDocuments?.includes('Voter card')
                                                        }
                                                        disabled={true}
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
                                                        defaultChecked={
                                                            attachedDocuments?.includes('Passport')
                                                        }
                                                        disabled={true}
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

                {/* <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
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
                </div> */}
            </form>
        </div>
    );
};

export default StudentDetailsForm;
