import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TakeAdmissionPopup from './Popup/TakeAdmissionPopup';

const AddAdmissionForm = ({
    registrationData,
    states,
    houses,
    categories,
    bloodGroups,
    religions,
    genderArr,
    admissionType,
    admissionProcess,
    classrooms,
    isFeeStructureWithTemplate,
    feeStructures,
    feeStructure
}) => {
    const [birthDate, setBirthDate] = useState(registrationData?.date_of_birth ?? null);
    const [admissionDate, setAdmissionDate] = useState(new Date());
    const [cardActive, setCardActive] = useState(false);
    const [cardActive1, setCardActive1] = useState(false);
    const [cardActive2, setCardActive2] = useState(true);
    const [cardActive3, setCardActive3] = useState(false);
    const [cardActive4, setCardActive4] = useState(false);
    const [takeAdmissionPopup, setTakeAdmissionPopup] = useState(false);
    const [attachedFile, setAttachedFile] = useState({
        'Pan card': false,
        'Aadhaar card': false,
        'Voter card': false,
        'Passport': false,
    });
    const [selectedFeeStructure, setSelectedFeeStructure] = useState({});


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

    const { data, setData, errors, put, reset, processing } = useForm({
        // Student Academic Details
        admission_type: "",
        date_of_admission: "",
        house_id: "",
        fee_structure_setting: isFeeStructureWithTemplate,
        fee_structure_id: "",

        //Student Personal Details
        first_name: registrationData?.first_name ?? "",
        middle_name: registrationData?.middle_name ?? "",
        last_name: registrationData?.last_name ?? "",
        gender: registrationData?.gender ?? "",
        blood_group: registrationData?.blood_group ?? "",
        date_of_birth: registrationData?.date_of_birth ?? "",
        religion: registrationData?.religion ?? "",
        category_id: registrationData?.category_id ?? "",
        contact_number: registrationData?.contact_number ?? "",
        aadhar_card_no: registrationData?.aadhar_card_no ?? "",

        // start father info
        father_first_name: registrationData?.guardian?.father_first_name ?? "",
        father_middle_name: registrationData?.guardian?.father_middle_name ?? "",
        father_last_name: registrationData?.guardian?.father_last_name ?? "",
        father_email: registrationData?.guardian?.father_email ?? "",
        father_mobile: registrationData?.guardian?.father_mobile ?? "",
        father_sms_number: registrationData?.guardian?.father_sms_number ?? "",
        father_highest_qualification: registrationData?.guardian?.father_highest_qualification ?? "",
        father_occupation: registrationData?.guardian?.father_occupation ?? "",
        father_income_per_year: registrationData?.guardian?.father_income_per_year ?? "",
        father_aadhar_card_no: registrationData?.guardian?.father_aadhar_card_no ?? "",
        father_pan_card_no: registrationData?.guardian?.father_pan_card_no ?? "",
        // end father info

        // start mother info
        mother_first_name: registrationData?.guardian?.mother_first_name ?? "",
        mother_middle_name: registrationData?.guardian?.mother_middle_name ?? "",
        mother_last_name: registrationData?.guardian?.mother_last_name ?? "",
        mother_email: registrationData?.guardian?.mother_email ?? "",
        mother_mobile: registrationData?.guardian?.mother_mobile ?? "",
        mother_highest_qualification: registrationData?.guardian?.mother_highest_qualification ?? "",
        mother_occupation: registrationData?.guardian?.mother_occupation ?? "",
        mother_income_per_year: registrationData?.guardian?.mother_income_per_year ?? "",
        mother_aadhar_card_no: registrationData?.guardian?.mother_aadhar_card_no ?? "",
        mother_pan_card_no: registrationData?.guardian?.mother_pan_card_no ?? "",
        // end mother info

        // present address
        present_address: registrationData?.present_address ?? "",
        present_state: registrationData?.present_state ?? "",
        city: registrationData?.city ?? "",
        pin_code: registrationData?.pin_code ?? "",

        // permanent address
        permanent_address: registrationData?.permanent_address ?? "",
        permanent_state: registrationData?.permanent_state ?? "",
        permanent_city: registrationData?.permanent_city ?? "",
        permanent_pin_code: registrationData?.permanent_pin_code ?? "",

        // attached document
        document_attached: [],
    });

    useEffect(() => {
        if(isFeeStructureWithTemplate == "No") {
            setSelectedFeeStructure(feeStructure ?? {});
        }
    }, [feeStructure]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            document_attached: attachedFile
        }));
    }, [attachedFile]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            date_of_birth: birthDate
        }));
    }, [birthDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            date_of_admission: admissionDate
        }));
    }, [admissionDate]);


    const [customErr, setCustomErr] = useState({
        father_name: "",
        father_email: "",
        father_phone: "",
    });

    // handle fee structure change start
    const handleFeeStructureChange = (e) => {
        const fee_structure_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            fee_structure_id: fee_structure_id
        }));

        setSelectedFeeStructure(feeStructures?.find(item => item?.id == fee_structure_id) ?? {});
    }
    // handle fee structure change end

    const handleAttachedFile = (title, isChecked) => {
        setAttachedFile((prevState) => ({
            ...prevState,
            [title]: isChecked,
        }));
    };

    // const handleAttachedFile = (title, isChecked) => {
    //     setAttachedFile(prevState => ({
    //         ...prevState,
    //         [title]: isChecked
    //     }));
    //     setAttachedFileInData(title, isChecked);
    // };

    // const setAttachedFileInData = (title, isChecked) => {
    //     setAttachedFile(prevState => {
    //         const updatedAFiles = {
    //             ...prevState,
    //             [title]: isChecked
    //         };

    //         const attachedFileArray = Object.entries(updatedAFiles).map(([title, is_have]) => ({ title, is_have }));
    //         setData('document_attached', attachedFileArray);

    //         return updatedAFiles;
    //     });
    // };


    const handleUpdateData = (e) => {
        e.preventDefault();
    };


    const handleClickTakeAdmission = (e) => {
        e.preventDefault();

        if(
            data?.admission_type == "" ||
            data?.date_of_admission == "" ||
            data?.first_name == "" ||
            data?.gender == "" ||
            data?.father_first_name == "" ||
            data?.father_email == "" ||
            data?.mother_first_name == "" ||
            (isFeeStructureWithTemplate == "Yes" && data?.fee_structure_id == "" )
        ) {
            toast.error("Required fields cannot be empty.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            setTakeAdmissionPopup(!takeAdmissionPopup);
        }
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
                                                                registrationData.registration_no
                                                            }
                                                            className="block cursor-not-allowed"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.registration_no
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
                                                                    htmlFor="registration_date"
                                                                    value="Reg. Date"
                                                                />
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="registration_date"
                                                            disabled={true}
                                                            defaultValue={
                                                                registrationData.date_of_registration
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
                                                                registrationData?.admission_academic_year?.academic_session ?? ""
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
                                                                registrationData?.class_name?.title ?? ""
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
                                                            value={
                                                                data?.admission_type
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "admission_type",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.admission_type
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
                                                                    htmlFor="date_of_admission"
                                                                    value="Date of Admission"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <DatePicker
                                                            selected={admissionDate}
                                                            onChange={(date) =>
                                                                setAdmissionDate(
                                                                    date
                                                                )
                                                            }
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={
                                                                false
                                                            }
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            dateFormat="dd/MM/yyyy"
                                                            id="date_of_admission"
                                                            className="w-full"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.date_of_admission
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
                                                                    htmlFor="student_type"
                                                                    value="Day Scholar/Boarding"
                                                                />
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="student_type"
                                                            disabled={true}
                                                            defaultValue={
                                                                registrationData?.boarding_scholar
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
                                                            data={houses}
                                                            value={
                                                                data?.house_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "house_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.house_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                {isFeeStructureWithTemplate === "Yes" &&
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="fee_structure_id"
                                                                        value="Fee Group"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <SelectInput
                                                                id="fee_structure_id"
                                                                data_label="Fee Group"
                                                                data={feeStructures}
                                                                value={
                                                                    data?.fee_structure_id
                                                                }
                                                                onChange={(e) => {
                                                                    handleFeeStructureChange(e)
                                                                }}
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors?.fee_structure_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                }
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
                                                            required
                                                            value={
                                                                data?.first_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "first_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.first_name
                                                            }
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
                                                            value={
                                                                data?.middle_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "middle_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.middle_name
                                                            }
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
                                                            value={
                                                                data?.last_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "last_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.last_name
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
                                                            value={data?.gender}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "gender",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.gender
                                                            }
                                                            className="mt-2"
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
                                                            value={
                                                                data.contact_number
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "contact_number",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.contact_number
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
                                                                    htmlFor="blood_group"
                                                                    value="Blood Group"
                                                                />
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="blood_group"
                                                            data_label="Blood Group"
                                                            data={bloodGroups}
                                                            value={
                                                                data?.blood_group
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "blood_group",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.blood_group
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="birth_date_at"
                                                            value="Date of Birth"
                                                        />
                                                        <DatePicker
                                                            selected={birthDate}
                                                            onChange={(date) =>
                                                                setBirthDate(
                                                                    date
                                                                )
                                                            }
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={
                                                                false
                                                            }
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="Birth date"
                                                            id="birth_date_at"
                                                            className="w-full"
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
                                                        <SelectInput
                                                            id="category_id"
                                                            data_label="Category"
                                                            data={categories}
                                                            value={
                                                                data?.category_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "category_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.category_id
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
                                                                    htmlFor="religion"
                                                                    value="Religion"
                                                                />
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="religion"
                                                            data_label="Religion"
                                                            data={religions}
                                                            value={
                                                                data?.religion
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "religion",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.religion
                                                            }
                                                            className="mt-2"
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
                                                            value={
                                                                data?.aadhar_card_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "aadhar_card_no",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.aadhar_card_no
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
                                                                    attachedFile['Pan card'] ?? false
                                                                }
                                                                onChange={(e) => handleAttachedFile('Pan card', e.target.checked)}
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
                                                                    attachedFile['Aadhaar card'] ?? false
                                                                }
                                                                onChange={(e) => handleAttachedFile('Aadhaar card', e.target.checked)}
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
                                                                    attachedFile['Voter card'] ?? false
                                                                }
                                                                onChange={(e) => handleAttachedFile('Voter card', e.target.checked)}
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
                                                                    attachedFile['Passport'] ?? false
                                                                }
                                                                onChange={(e) => handleAttachedFile('Passport', e.target.checked)}
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
                                                        style={{
                                                            borderColor:
                                                                customErr.father_name
                                                                    ? "red"
                                                                    : "",
                                                        }}
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_first_name
                                                        }
                                                        className="mt-2"
                                                    />

                                                    {customErr.father_name && (
                                                        <InputError
                                                            message={
                                                                customErr.father_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    )}
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
                                                    <InputLabel
                                                        htmlFor="father_last_name"
                                                        value="Last Name"
                                                    />
                                                    <TextInput
                                                        id="father_last_name"
                                                        value={data.father_last_name}
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
                                                                value="Email"
                                                            />
                                                            <sup>*</sup>
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
                                                        type="email"
                                                        className="block"
                                                        required
                                                        style={{
                                                            borderColor:
                                                                customErr.father_email
                                                                    ? "red"
                                                                    : "",
                                                        }}
                                                    />
                                                    <InputError
                                                        message={errors.f_email}
                                                        className="mt-2"
                                                    />
                                                    {customErr.father_email && (
                                                        <InputError
                                                            message={
                                                                customErr.father_email
                                                            }
                                                            className="mt-2"
                                                        />
                                                    )}
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
                                                        style={{
                                                            borderColor:
                                                                customErr.father_phone
                                                                    ? "red"
                                                                    : "",
                                                        }}
                                                    />
                                                    <InputError
                                                        message={errors.father_mobile}
                                                        className="mt-2"
                                                    />
                                                    {customErr.father_phone && (
                                                        <InputError
                                                            message={
                                                                customErr.father_phone
                                                            }
                                                            className="mt-2"
                                                        />
                                                    )}
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
                                                        value={data.father_sms_number}
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_sms_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_sms_number
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.father_highest_qualification
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_highest_qualification",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="Type for suggestions"
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_highest_qualification
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.father_occupation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_occupation",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="Type for suggestions"
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
                                                    <InputLabel
                                                        htmlFor="father_income_per_year"
                                                        value="Income Per Year"
                                                    />
                                                    <TextInput
                                                        id="father_income_per_year"
                                                        value={
                                                            data.father_income_per_year
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_income_per_year",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_income_per_year
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.father_aadhar_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_aadhar_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_aadhar_card_no
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.father_pan_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_pan_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_pan_card_no
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
                                                        required
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
                                                    <InputLabel
                                                        htmlFor="mother_middle_name"
                                                        value="Middle Name"
                                                    />
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
                                                    <InputLabel
                                                        htmlFor="mother_last_name"
                                                        value="Last Name"
                                                    />
                                                    <TextInput
                                                        id="m_last_name"
                                                        value={data.mother_last_name}
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
                                                                value="Email"
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
                                                        type="email"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.mother_email}
                                                        className="mt-2"
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
                                                        message={errors.mother_mobile}
                                                        className="mt-2"
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
                                                        value={
                                                            data.mother_highest_qualification
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_highest_qualification",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="Type for suggestions"
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mother_highest_qualification
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.mother_occupation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_occupation",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="Type for suggestions"
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
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="mother_income_per_year"
                                                        value="Income Per Year"
                                                    />
                                                    <TextInput
                                                        id="mother_income_per_year"
                                                        value={
                                                            data.mother_income_per_year
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_income_per_year",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mother_income_per_year
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.mother_aadhar_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_aadhar_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mother_aadhar_card_no
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.mother_pan_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_pan_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mother_pan_card_no
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
                                                        value={
                                                            data?.present_address
                                                        }
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
                                                            errors?.present_address
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.present_state
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "present_state",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.present_state
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.city
                                                        }
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
                                                        message={
                                                            errors.city
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data?.pin_code
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "pin_code",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.pin_code
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
                                                        value={
                                                            data?.permanent_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "permanent_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.permanent_address
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.permanent_state
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "permanent_state",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.permanent_state
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data?.permanent_city
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "permanent_city",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.permanent_city
                                                        }
                                                        className="mt-2"
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
                                                        value={
                                                            data.permanent_pin_code
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "permanent_pin_code",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.permanent_pin_code
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

                        </div>
                    </div>
                    <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
                        <PrimaryButton
                            disabled={processing}
                            className="educare-primary-btn-lg-fill"
                            type="button"
                            onClick={(e) => {
                                handleClickTakeAdmission(e);
                            }}
                        >
                            Take Admission
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            <TakeAdmissionPopup
                data={data}
                classrooms={classrooms}
                registrationData={registrationData}
                takeAdmissionPopup={takeAdmissionPopup}
                setTakeAdmissionPopup={setTakeAdmissionPopup}
                selectedFeeStructure={selectedFeeStructure}
            />
        </>

    );
};

export default AddAdmissionForm;
