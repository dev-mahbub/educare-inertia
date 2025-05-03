import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

const ViewAdmissionForm = ({
    admissionData,
    states,
    houses,
    genderArr,
    admissionType,
}) => {

    const [cardActive, setCardActive] = useState(false);
    const [cardActive1, setCardActive1] = useState(false);
    const [cardActive2, setCardActive2] = useState(true);
    const [cardActive3, setCardActive3] = useState(false);
    const [cardActive4, setCardActive4] = useState(false);

    const [attachedDocuments, setAttachedDocuments] = useState([]);

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

    useEffect(() => {
        if (admissionData.document_attached != null) {
            const studentAttachedDocuments = JSON.parse(admissionData.document_attached);

            setAttachedDocuments(studentAttachedDocuments);
            // setAttachedDocuments(Object.keys(studentAttachedDocuments)?.filter(key => studentAttachedDocuments[key] == true)?.map(key => key));
        }
    }, [admissionData]);


    const handleUpdateData = (e) => {
        e.preventDefault();
    };


    return (
        <>
            <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
                <form onSubmit={handleUpdateData}>
                    <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                        <div className="lg:col-span-6 col-span-12">
                            <div className="educare-create-school-details">
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
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="registration_no"
                                                                    value="Registration Number"
                                                                />
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="registration_no"
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData?.registration_no
                                                            }
                                                            className="block cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="registration_date"
                                                                    value="Reg. Date"
                                                                />
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="registration_date"
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData?.date_of_registration
                                                            }
                                                            className="block cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="academic_year"
                                                                    value="Academic Year"
                                                                />
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="academic_year"
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData?.academic_session ?? ""
                                                            }
                                                            type="text"
                                                            className="block cursor-not-allowed"
                                                        />
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
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="class_name_id"
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData?.class
                                                            }
                                                            type="text"
                                                            className="block cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="admission_type"
                                                                    value="Admission Type"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="admission_type"
                                                            data_label=""
                                                            data={admissionType}
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData?.admission_type
                                                            }
                                                            className="block cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="date_of_admission"
                                                                    value="Date of Admission"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="registration_date"
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData.date_of_admission
                                                            }
                                                            className="block cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="student_type"
                                                                    value="Day Scholar/Boarding"
                                                                />
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="student_type"
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData?.boarding_scholar
                                                            }
                                                            type="text"
                                                            className="block cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="house_id"
                                                            value="House"
                                                        />
                                                        <SelectInput
                                                            id="house_id"
                                                            data_label="House"
                                                            disabled={true}
                                                            data={houses}
                                                            defaultValue={
                                                                admissionData?.house_id
                                                            }
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
                                                                    htmlFor="first_name"
                                                                    value="First Name"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="first_name"
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData?.first_name
                                                            }
                                                            type="text"
                                                            className="block cursor-not-allowed"
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
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData?.middle_name
                                                            }
                                                            type="text"
                                                            className="block cursor-not-allowed"
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
                                                            disabled={true}
                                                            defaultValue={
                                                                admissionData?.last_name
                                                            }
                                                            type="text"
                                                            className="block cursor-not-allowed"
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
                                                            data_label="Gender"
                                                            data={genderArr}
                                                            disabled={true}
                                                            defaultValue={admissionData?.gender}
                                                            className="block cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="contact_number"
                                                            value="Mobile"
                                                        />
                                                        <TextInput
                                                            id="contact_number"
                                                            defaultValue={
                                                                admissionData?.phone
                                                            }
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
                                                                    htmlFor="blood_group"
                                                                    value="Blood Group"
                                                                />
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="blood_group"
                                                            defaultValue={
                                                                admissionData?.blood_group
                                                            }
                                                            disabled={true}
                                                            className="block cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="birth_date_at"
                                                            value="Date of Birth"
                                                        />
                                                        <TextInput
                                                            id="birth_date_at"
                                                            defaultValue={
                                                                admissionData.date_of_birth
                                                            }
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
                                                                    htmlFor="category_id"
                                                                    value="Category"
                                                                />
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="category_id"
                                                            defaultValue={
                                                                admissionData?.category
                                                            }
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
                                                                    htmlFor="religion"
                                                                    value="Religion"
                                                                />
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="religion"
                                                            defaultValue={
                                                                admissionData?.religion
                                                            }
                                                            disabled={true}
                                                            className="block cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="aadhar_card_no"
                                                            value="Aadhar Card No"
                                                        />
                                                        <TextInput
                                                            id="aadhar_card_no"
                                                            defaultValue={
                                                                admissionData?.aadhar_card_no
                                                            }
                                                            disabled={true}
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
                                        <div className="educare-school-form-action-title">
                                            <h5>
                                                <i className="icon-FileText"></i>
                                                Document attached
                                            </h5>
                                        </div>
                                        <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="document_pan_card"
                                                                name="document_pan_card"
                                                                checked={
                                                                    attachedDocuments['Pan card'] ?? false
                                                                    // attachedDocuments?.includes('Pan card')
                                                                }
                                                                disabled={true}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="document_pan_card"
                                                                value="Pan Card"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="document_aadhaar_card"
                                                                name="document_aadhaar_card"
                                                                checked={
                                                                    attachedDocuments['Aadhaar card'] ?? false
                                                                    // attachedDocuments?.includes('Aadhaar card')
                                                                }
                                                                disabled={true}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="document_aadhaar_card"
                                                                value="Aadhaar Card"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="document_voter_card"
                                                                name="document_voter_card"
                                                                checked={
                                                                    attachedDocuments['Voter card'] ?? false
                                                                    // attachedDocuments?.includes('Voter card')
                                                                }
                                                                disabled={true}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="document_voter_card"
                                                                value="Voter Id Card"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full text-right">
                                                            <Checkbox
                                                                id="document_passport"
                                                                name="document_passport"
                                                                checked={
                                                                    attachedDocuments['Passport'] ?? false
                                                                }
                                                                disabled={true}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="document_passport"
                                                                value="Passport"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* service availed */}
                            </div>
                        </div>
                        <div className="lg:col-span-6 col-span-12">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title flex flex-wrap justify-between">
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
                                                                htmlFor="father_first_name"
                                                                value="First Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="father_first_name"
                                                        defaultValue={
                                                            admissionData?.father_first_name
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
                                                        htmlFor="father_middle_name"
                                                        value="Middle Name"
                                                    />
                                                    <TextInput
                                                        id="father_middle_name"
                                                        defaultValue={
                                                            admissionData?.father_middle_name
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
                                                        htmlFor="father_last_name"
                                                        value="Last Name"
                                                    />
                                                    <TextInput
                                                        id="father_last_name"
                                                        value={admissionData?.father_last_name}
                                                        type="text"
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
                                                                htmlFor="father_email"
                                                                value="Email"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="father_email"
                                                        defaultValue={admissionData?.father_email}
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
                                                                htmlFor="father_mobile"
                                                                value="Mobile"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="father_mobile"
                                                        defaultValue={admissionData?.father_mobile}
                                                        type="text"
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
                                                                htmlFor="father_sms_number"
                                                                value="SMS Number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="father_sms_number"
                                                        defaultValue={admissionData?.father_sms_number}
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="father_highest_qualification"
                                                        value="Highest Qualification"
                                                    />
                                                    <TextInput
                                                        id="father_highest_qualification"
                                                        defaultValue={
                                                            admissionData?.father_highest_qualification
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
                                                        htmlFor="father_occupation"
                                                        value="Occupation"
                                                    />
                                                    <TextInput
                                                        id="father_occupation"
                                                        defaultValue={
                                                            admissionData?.father_occupation
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
                                                        htmlFor="father_income_per_year"
                                                        value="Income Per Year"
                                                    />
                                                    <TextInput
                                                        id="father_income_per_year"
                                                        defaultValue={
                                                            admissionData?.father_income_per_year
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
                                                        htmlFor="father_aadhar_card_no"
                                                        value="Aadhar Card No"
                                                    />
                                                    <TextInput
                                                        id="father_aadhar_card_no"
                                                        defaultValue={
                                                            admissionData?.father_aadhar_card_no
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
                                                        htmlFor="father_pan_card_no"
                                                        value="Pan Card No"
                                                    />
                                                    <TextInput
                                                        id="father_pan_card_no"
                                                        defaultValue={
                                                            admissionData?.father_pan_card_no
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
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="mother_first_name: "
                                                                value="First Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="mother_first_name: "
                                                        defaultValue={
                                                            admissionData?.mother_first_name
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
                                                        htmlFor="mother_middle_name"
                                                        value="Middle Name"
                                                    />
                                                    <TextInput
                                                        id="mother_middle_name"
                                                        defaultValue={
                                                            admissionData?.mother_middle_name
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
                                                        htmlFor="mother_last_name"
                                                        value="Last Name"
                                                    />
                                                    <TextInput
                                                        id="m_last_name"
                                                        defaultValue={admissionData?.mother_last_name}
                                                        type="text"
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
                                                                htmlFor="mother_email"
                                                                value="Email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="mother_email"
                                                        defaultValue={admissionData?.mother_email}
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="mother_mobile"
                                                        value="Mobile"
                                                    />
                                                    <TextInput
                                                        id="m_phone"
                                                        defaultValue={admissionData?.mother_mobile}
                                                        type="text"
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="mother_highest_qualification"
                                                        value="Highest Qualification"
                                                    />
                                                    <TextInput
                                                        id="mother_highest_qualification"
                                                        defaultValue={
                                                            admissionData?.mother_highest_qualification
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
                                                        htmlFor="mother_occupation"
                                                        value="Occupation"
                                                    />
                                                    <TextInput
                                                        id="mother_occupation"
                                                        defaultValue={
                                                            admissionData?.mother_occupation
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
                                                        htmlFor="mother_income_per_year"
                                                        value="Income Per Year"
                                                    />
                                                    <TextInput
                                                        id="mother_income_per_year"
                                                        defaultValue={
                                                            admissionData?.mother_income_per_year
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
                                                        htmlFor="mother_aadhar_card_no"
                                                        value="Aadhar Card No"
                                                    />
                                                    <TextInput
                                                        id="mother_aadhar_card_no"
                                                        defaultValue={
                                                            admissionData?.mother_aadhar_card_no
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
                                                        htmlFor="mother_pan_card_no"
                                                        value="Pan Card No"
                                                    />
                                                    <TextInput
                                                        id="mother_pan_card_no"
                                                        defaultValue={
                                                            admissionData?.mother_pan_card_no
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
                                        className={`educare-school-form-action-title ${cardActive3 ? "" : "pb-0"
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
                                                className={`${cardActive3
                                                    ? "icon-minus"
                                                    : "icon-plus"
                                                    }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${cardActive3 ? "" : "hidden"
                                            }`}
                                    >
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="present_address"
                                                        value="Address"
                                                    />
                                                    <TextInput
                                                        id="present_address"
                                                        defaultValue={
                                                            admissionData?.present_address
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
                                                        htmlFor="present_state"
                                                        value="State"
                                                    />
                                                    <SelectInput
                                                        id="present_state"
                                                        data_label="State"
                                                        data={states}
                                                        defaultValue={
                                                            admissionData?.present_state
                                                        }
                                                        disabled={true}
                                                        className="block cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="city"
                                                        value="City"
                                                    />
                                                    <TextInput
                                                        id="city"
                                                        defaultValue={
                                                            admissionData?.present_city
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
                                                        htmlFor="pin_code"
                                                        value="Pin code"
                                                    />
                                                    <TextInput
                                                        id="pin_code"
                                                        defaultValue={
                                                            admissionData?.present_pin_code
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
                                        className={`educare-school-form-action-title ${cardActive4 ? "" : "pb-0"
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
                                                className={`${cardActive4
                                                    ? "icon-minus"
                                                    : "icon-plus"
                                                    }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${cardActive4 ? "" : "hidden"
                                            }`}
                                    >
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="permanent_address"
                                                        value="Address"
                                                    />
                                                    <TextInput
                                                        id="permanent_address"
                                                        defaultValue={
                                                            admissionData?.permanent_address
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
                                                        htmlFor="permanent_state"
                                                        value="State"
                                                    />
                                                    <SelectInput
                                                        id="permanent_state"
                                                        data_label="State"
                                                        data={states}
                                                        defaultValue={
                                                            admissionData?.permanent_state
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
                                                        htmlFor="permanent_city"
                                                        value="City"
                                                    />
                                                    <TextInput
                                                        id="permanent_city"
                                                        defaultValue={
                                                            admissionData?.permanent_city
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
                                                        htmlFor="permanent_pin_code"
                                                        value="Pin code"
                                                    />
                                                    <TextInput
                                                        id="permanent_pin_code"
                                                        defaultValue={
                                                            admissionData?.permanent_pin_code
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

                        </div>
                    </div>
                </form>
            </div>
        </>

    );
};

export default ViewAdmissionForm;
