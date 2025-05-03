import Checkbox from "@/Components/Checkbox";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import CheckSiblingPopupForm from "@/Components/Partials/Popup/CheckSiblingPopupForm";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TertiaryButton from "@/Components/TertiaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import placeholderImage from "../../../../../images/icon/placeholder.jpg";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CreateStudentForm = ({
    classNames,
    houses,
    status,
    admissionNumbers,
    schBoaArr,
    casteArr,
    genderArr,
    categories,
    bloodGroups,
    religions,
    countries,
    catEmps,
    subCasteArr,
    accountArr,
    banks,
    admissionNo,
    states,
    feeStructures,
    isFeeStructureWithTemplate,
    customFields,
    occupations,
    optionalSubjects
}) => {
    const [birthDate, setBirthDate] = useState(null);
    const [admissionDate, setAdmissionDate] = useState(new Date());
    const [cardActive, setCardActive] = useState(false);
    const [cardActive1, setCardActive1] = useState(false);
    const [cardActive2, setCardActive2] = useState(true);
    const [cardActive3, setCardActive3] = useState(false);
    const [cardActive4, setCardActive4] = useState(false);
    const [checkedAllSiblings, setCheckedAllSiblings] = useState(false);
    const [attachedFile, setAttachedFile] = useState({});
    const [siblingData, setSiblingData] = useState([]);
    const [selectedSiblings, setSelectedSiblings] = useState([]);
    const [editSiblingPopupOpen, setSiblingEditPopupOpen] = useState(false);
    const [filteredFeeStructures, setFilteredFeeStructures] = useState([]);

    const [selectedImages, setSelectedImages] = useState({
        student_profile_image: null,
        student_father_profile_image: null,
        student_mother_profile_image: null,
        student_guardian_profile_image: null,
    });

    const [customFieldData, setCustomFieldData] = useState(customFields?.map(item => ({
        ...item,
        value: ''
    })));
    const [customFieldErrors, setCustomFieldErrors] = useState({});

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.customData) {
            setSiblingData(flash.customData);
        }
    }, [flash]);

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

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        classroom_id: "",
        selectedSibling: [],
        house_id: "",
        admission_id: "",
        admission_no: admissionNo,
        admission_date_at: "",
        fee_structure_setting: isFeeStructureWithTemplate,
        fee_structure_id: "",
        // roll_no: "",
        status: "",
        is_have_sibling: "",
        sibling_student_id: "",
        boarding_type: "Day Scholar",
        caste_type: "",
        is_computer_option: "",
        is_social_studies_option: "",

        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        aadhar_card_no: "",
        birth_date_at: "",
        blood_group: "",
        religion: "",
        category_id: "",
        email: "",
        country_id: "",
        srn_no: "",
        child_id: "",
        samagra_id: "",
        birth_place: "",
        caste: "",

        // bank
        'bank_id': "",
        'account_name': "",
        'account_type': "",
        'account_no': "",
        'ifsc_code': "",
        'micr_no': "",
        'branch_name': "",

        admission_class: "",
        employment_cat_id: "",
        height: "",
        weight: "",
        mother_tongue: "",
        medical_condition: "",
        notes: "",
        is_physical_disabled: "",
        is_spacial_child: "",
        is_economically_weaker: "",
        sub_caste: "",

        // start father info
        father_type: "Father",
        f_first_name: "",
        f_middle_name: "",
        f_last_name: "",
        f_email: "",
        f_phone: "",
        f_sms_phone: "",
        f_highest_qualification: "",
        father_occupation_id: "",
        f_income_per_year: "",
        f_department: "",
        f_designation: "",
        f_aadhar_card_no: "",
        f_pan_card_no: "",
        f_office_address: "",
        f_company_name: "",
        // end father info

        // start mother info
        mother_type: "Mother",
        m_first_name: "",
        m_middle_name: "",
        m_last_name: "",
        m_email: "",
        m_phone: "",
        m_sms_phone: "",
        m_highest_qualification: "",
        m_occupation: "",
        m_income_per_year: "",
        m_department: "",
        m_designation: "",
        m_aadhar_card_no: "",
        m_pan_card_no: "",
        m_office_address: "",
        m_company_name: "",
        mother_occupation_id: "",
        // end mother info

        // start guardian info
        guardian_type: "Guardian",
        g_first_name: "",
        g_email: "",
        g_phone: "",
        g_relation: "",
        g_highest_qualification: "",
        g_occupation: "",
        g_department: "",
        g_designation: "",
        g_aadhar_card_no: "",
        g_id_no: "",
        g_city: "",
        g_address: "",
        // end guardian info

        present_address: "",
        present_state: "",
        present_city: "",
        present_taluka: "",
        present_district: "",
        present_pin_code: "",

        permanent_address: "",
        permanent_state: "",
        permanent_city: "",
        permanent_taluka: "",
        permanent_district: "",
        permanent_pin_code: "",

        document_attached: [],

        prev_school_name: "",
        prev_school_class: "",
        prev_school_year: "",
        prev_school_tc_no: "",
        prev_school_note: "",

        // images
        student_profile_image: null,
        student_father_profile_image: null,
        student_mother_profile_image: null,
        student_guardian_profile_image: null,

        // custom fields
        custom_fields: [],
        optional_subjects: []
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            custom_fields: customFieldData?.map(item => ({
                id: item?.id,
                // name: item?.name,
                // is_required: item?.is_required,
                value: item?.value
            }))
        }));
    }, [customFieldData]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            document_attached: attachedFile
        }));
    }, [attachedFile]);

    const handleImageChange = (e, image_for) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImages({
                ...selectedImages,
                [image_for]: reader.result,
            })
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        if (isFeeStructureWithTemplate == "Yes") {
            setFilteredFeeStructures(feeStructures?.filter(item => item?.classroom_ids?.includes(parseInt(classroom_id))));
        }

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            fee_structure_id: ""
        }));

        router.post(route('student.create'), { classroom_id: classroom_id }, {
            preserveScroll: true
        });
    }
    // handle classroom change end


    const handleSelectStudents = (selectedStudents) => {
        setSelectedSiblings(selectedStudents);
    };

    useEffect(() => {
        setData('selectedSibling', selectedSiblings)
    }, [selectedSiblings]);

    const [customErr, setCustomErr] = useState({
        'father_name': '',
        'father_email': '',
        'father_phone': '',
    })

    const handlePresentPermanent = (e) => {
        if (e.target.checked) {
            setData((prevData) => ({
                ...prevData,
                permanent_address: prevData.present_address,
                permanent_state: prevData.present_state,
                permanent_city: prevData.present_city,
                permanent_taluka: prevData.present_taluka,
                permanent_district: prevData.present_district,
                permanent_pin_code: prevData.present_pin_code,
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                permanent_address: '',
                permanent_state: '',
                permanent_city: '',
                permanent_taluka: '',
                permanent_district: '',
                permanent_pin_code: '',
            }));
        }
    }

    const handleAttachedFile = (title, isChecked) => {
        setAttachedFile(prevState => ({
            ...prevState,
            [title]: isChecked
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

    const createStudentData = (e) => {
        e.preventDefault();
        let hasError = false;
        const custom_field_errors = {};

        customFieldData?.forEach(item => {
            if(item?.is_required && item?.value == '') {
                hasError = true;

                custom_field_errors[`${item?.id}_${item?.name}`] = 'required';
            }
        });

        setCustomFieldErrors(custom_field_errors);
        
        if (hasError == false) {
            data.birth_date_at = birthDate;
            data.admission_date_at = admissionDate;
            post(route("student.save"), {
                preserveScroll: true,
                onSuccess: () => reset()
            });
        }
    };

    const handelCheckAdmNo = (e) => {
        router.post(route('student.adn_check'), { admission_no: data.admission_no }, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    }

    const handelOccupation = (e, type) => {
        setData(type, e.target.value);
    }

    const handelCheckSibling = (isChecked, fatherName, fatherEmail, fatherMobile) => {
        setCustomErr({
            'father_name': '',
            'father_email': '',
            'father_phone': '',
        });
        if (!fatherName) {
            setCustomErr(prevErr => ({ ...prevErr, 'father_name': 'Father\'s name is required' }));
            setData("is_have_sibling", false);
        }
        if (!fatherEmail) {
            setCustomErr(prevErr => ({ ...prevErr, 'father_email': 'Father\'s email is required' }));
            setData("is_have_sibling", false);
        }
        if (!fatherMobile) {
            setCustomErr(prevErr => ({ ...prevErr, 'father_phone': 'Father\'s phone number is required' }));
            setData("is_have_sibling", false);
        }

        if (customErr.father_name || customErr.father_email || customErr.father_phone) {
            setData("is_have_sibling", false);
            return;
        }

        if (fatherName && fatherEmail && fatherMobile) {
            const fatherInfo = { fatherName, fatherEmail, fatherMobile }
            router.post(route('student.sibling_check'), fatherInfo);
            setData("is_have_sibling", isChecked);
            setSiblingEditPopupOpen(!editSiblingPopupOpen);
        };
    }

    const handleCancel = () => {
        router.get(route('student.list'));
    }

    const handleReset = () => {
        reset();
        setBirthDate(null)
        setAdmissionDate(null)
    }

    // handle change custom field value start
    const handleChangeCustomFieldValue = (id, value) => {
        setCustomFieldData(customFieldData?.map(item => ({
            ...item,
            value: item?.id == id ? value : item?.value
        })));
    }
    // handle father occupation change
    const [selectedOptions, setSelectedOptions] = useState(null);
    const handleSelectChange = (event, value) => {
        setSelectedOptions(value);
        setData('father_occupation_id', value.id);
    };

    // handle mother occupation change
    const [selectedOptionsMother, setSelectedOptionsMother] = useState(null);
    const handleSelectChangeMother = (event, value) => {
        setSelectedOptionsMother(value);
        setData('mother_occupation_id', value.id);
    }

    return (
        <>
            <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
                <form onSubmit={createStudentData}>
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
                                                                    htmlFor="classroom_id"
                                                                    value="Class"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="classroom_id"
                                                            data_label="Class"
                                                            required={true}
                                                            data={classNames}
                                                            value={
                                                                data?.classroom_id
                                                            }
                                                            onChange={(e) =>
                                                                // setData(
                                                                //     "classroom_id",
                                                                //     e.target.value
                                                                // )
                                                                handleClassroomChange(e)
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.classroom_id
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
                                                                    htmlFor="house_id"
                                                                    value="House"
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('house.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add
                                                            </a>
                                                        </div>
                                                        <SelectInput
                                                            id="house_id"
                                                            data_label="House"
                                                            data={houses}
                                                            value={data?.house_id}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "house_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.house_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="admission_no"
                                                                value="Admission No"
                                                            />

                                                            <TextInput
                                                                id="admission_no"
                                                                value={data?.admission_no}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "admission_no",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                type="text"
                                                                className="block"
                                                            />

                                                            <InputError
                                                                message={errors.admission_no}
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-3 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-button-field-styles flex items-end min-h-full">

                                                        <TertiaryButton
                                                            type="submit"
                                                            disabled={processing}
                                                            onClick={(e) => handelCheckAdmNo()}
                                                            className="educare-tertiary-btn-md-stroke"
                                                        >
                                                            Check Ad.No
                                                        </TertiaryButton>
                                                    </div>
                                                </div>

                                                <div className="col-span-5 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="admission_date_at"
                                                            value="Date of Admission"
                                                        />
                                                        <DatePicker
                                                            selected={admissionDate}
                                                            onChange={(date) =>
                                                                setAdmissionDate(date)
                                                            }
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={false}
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="Admission date"
                                                            id="admission_date_at"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="status"
                                                                    value="Student Status"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="status"
                                                            data_label="Status"
                                                            data={status}
                                                            value={
                                                                data?.status
                                                            }
                                                            onChange={(e) => setData("status", e.target.value)}
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.status
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document flex items-center min-h-full">
                                                        <div className="educare-create-school-settings-list-check width-full text-right">
                                                            <Checkbox
                                                                id="is_have_sibling"
                                                                name="is_have_sibling"
                                                                // type="submit"
                                                                checked={
                                                                    data.is_have_sibling
                                                                }
                                                                onChange={(e) => handelCheckSibling(e.target.checked, data.f_first_name, data.f_email, data.f_phone)}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="is_have_sibling"
                                                                value="Have sibling ?"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    {data.is_have_sibling && <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <SelectInput
                                                                id="sibling_student_id"
                                                                data_label="sibling"
                                                                data={siblingData}
                                                                value={
                                                                    data.sibling_student_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "sibling_student_id",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.sibling_student_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>}
                                                </div> */}
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="boarding_type"
                                                            value="Day Scholar/Boarding"
                                                        />
                                                        <SelectInput
                                                            id="boarding_type"
                                                            data_label=""
                                                            data={schBoaArr}
                                                            value={data?.boarding_type}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "boarding_type",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.boarding_type
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
                                                                    htmlFor="caste_type"
                                                                    value="Caste"
                                                                />
                                                            </div>
                                                            {/* <a
                                                                href={route('custom_field.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add Custom Field
                                                            </a> */}
                                                        </div>
                                                        <SelectInput
                                                            id="caste_type"
                                                            data_label="Caste"
                                                            data={casteArr}
                                                            value={
                                                                data?.caste_type
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "caste_type",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.caste_type
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
                                                                data={filteredFeeStructures}
                                                                value={
                                                                    data?.fee_structure_id
                                                                }
                                                                onChange={(e) => setData("fee_structure_id", e.target.value)}
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

                                                {customFieldData?.filter(item => item?.form_section == 'Student Academic Details')?.map((item, index) => (
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor={item?.name}
                                                                        value={item?.name}
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('custom_field.list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add Custom Field
                                                                </a>
                                                            </div>

                                                            {item?.data_type == 'List' &&
                                                                <SelectInput
                                                                    id={item?.name}
                                                                    data_label={item?.name}
                                                                    data={item?.list_values}
                                                                    value={
                                                                        item?.value
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChangeCustomFieldValue(
                                                                            item?.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                            }

                                                            {item?.data_type == 'Date' &&
                                                                <DatePicker
                                                                    selected={item?.value ? new Date(item?.value) : null}
                                                                    onChange={(date) =>
                                                                        handleChangeCustomFieldValue(item?.id, date)
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    id={item?.name}
                                                                    className="w-full"
                                                                />
                                                            }

                                                            {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                                <TextInput
                                                                    id={item?.name}
                                                                    value={item?.value}
                                                                    onChange={(e) =>
                                                                        handleChangeCustomFieldValue(
                                                                            item?.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                    className="block"
                                                                />
                                                            }

                                                            <InputError
                                                                message={
                                                                    customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Permanent address form end */}

                                <div className="educare-create-school-details-form-wrap">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div className="educare-school-form-action-title">
                                            <h5>
                                                <i className="icon-BookBookmark"></i>
                                                Assign Optional Subjects
                                            </h5>
                                        </div>
                                        <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                            <div className="grid grid-cols-12 gap-5">
                                                {optionalSubjects?.map((item, index) => (
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={item?.id}
                                                                    name={item?.title}
                                                                    checked={
                                                                        data[item?.title]
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            'optional_subjects',
                                                                            [...data.optional_subjects, e.target.checked ? item?.id : data.optional_subjects.filter(id => id !== item?.id)]
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={item?.id}
                                                                    value={item?.title}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Assign optional subject form end */}

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
                                                                    e.target.value
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
                                                                    e.target.value
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
                                                                    e.target.value
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
                                                        <InputLabel
                                                            htmlFor="gender"
                                                            value="Gender"
                                                        />
                                                        <SelectInput
                                                            id="gender"
                                                            data_label="Gender"
                                                            data={genderArr}
                                                            value={
                                                                data?.gender
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "gender",
                                                                    e.target.value
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
                                                                    e.target.value
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
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="birth_date_at"
                                                            value="Date of Birth"
                                                        />
                                                        <DatePicker
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
                                                                    htmlFor="blood_group"
                                                                    value="Blood Group"
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('blood_group.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add
                                                            </a>
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
                                                                    e.target.value
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
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="religion"
                                                                    value="Religion"
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('religion.list')}
                                                                target="_blank"
                                                                className="educare-secondary-btn-sm-stroke"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add
                                                            </a>
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
                                                                    e.target.value
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
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="category_id"
                                                                    value="Category"
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('category_caste.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add
                                                            </a>
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
                                                                    e.target.value
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
                                                                    htmlFor="email"
                                                                    value="Email"
                                                                />
                                                                {/* <sup>*</sup> */}
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="email"
                                                            value={
                                                                data?.email
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "email",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="email"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.email
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="country_id"
                                                            value="Nationality"
                                                        />
                                                        <SelectInput
                                                            id="country_id"
                                                            data_label="Nationality"
                                                            data={countries}
                                                            value={
                                                                data?.country_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "country_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.country_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="srn_no"
                                                            value="SRN No."
                                                        />
                                                        <TextInput
                                                            id="srn_no"
                                                            value={
                                                                data?.srn_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "srn_no",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="number"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.srn_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="child_id"
                                                            value="Child ID"
                                                        />
                                                        <TextInput
                                                            id="child_id"
                                                            value={
                                                                data?.child_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "child_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="number"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.child_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="samagra_id"
                                                            value="Samagra ID"
                                                        />
                                                        <TextInput
                                                            id="samagra_id"
                                                            value={
                                                                data.samagra_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "samagra_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="number"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.samagra_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="birth_place"
                                                            value="Place Of Birth"
                                                        />
                                                        <TextInput
                                                            id="birth_place"
                                                            value={
                                                                data?.birth_place
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "birth_place",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.birth_place
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="caste"
                                                            value="caste"
                                                        />
                                                        <TextInput
                                                            id="sub_caste"
                                                            value={
                                                                data?.caste
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "caste",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.caste
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="admission_class"
                                                            value="Admission Class"
                                                        />
                                                        <TextInput
                                                            id="admission_class"
                                                            value={
                                                                data?.admission_class
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "admission_class",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.admission_class
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
                                                                    htmlFor="employment_cat_id"
                                                                    value="Employment category"
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('category.employment_create_list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add
                                                            </a>
                                                        </div>
                                                        <SelectInput
                                                            id="employment_cat_id"
                                                            data_label="employment category"
                                                            data={catEmps}
                                                            value={
                                                                data?.employment_cat_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "employment_cat_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.employment_cat_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="height"
                                                            value="Height (cm)"
                                                        />
                                                        <TextInput
                                                            id="height"
                                                            value={
                                                                data?.height
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "height",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="number"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.height
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="weight"
                                                            value="Weight (kg)"
                                                        />
                                                        <TextInput
                                                            id="weight"
                                                            value={
                                                                data?.weight
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "weight",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="number"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.weight
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="mother_tongue"
                                                            value="Mother Tongue"
                                                        />
                                                        <TextInput
                                                            id="mother_tongue"
                                                            value={
                                                                data?.mother_tongue
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "mother_tongue",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.mother_tongue
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="medical_condition"
                                                            value="Medical Condition/Allergies (if any)"
                                                        />
                                                        <TextInput
                                                            id="medical_condition"
                                                            value={
                                                                data?.medical_condition
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "medical_condition",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.medical_condition
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="notes"
                                                            value="Notes"
                                                        />
                                                        <TextInput
                                                            id="notes"
                                                            value={
                                                                data?.notes
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "notes",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.notes
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-checkbox-field-styles">
                                                        <InputLabel
                                                            htmlFor="is_physical_disabled"
                                                            value="Is Physically Disabled?"
                                                        />
                                                        <Checkbox
                                                            id="is_physical_disabled"
                                                            name="is_physical_disabled"
                                                            checked={
                                                                data.is_physical_disabled
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_physical_disabled",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-checkbox-field-styles">
                                                        <InputLabel
                                                            htmlFor="is_spacial_child"
                                                            value="Is Special Child (mentally)?"
                                                        />
                                                        <Checkbox
                                                            name="student_is_spacial_child"
                                                            id="is_spacial_child"
                                                            checked={
                                                                data.is_spacial_child
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_spacial_child",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-checkbox-field-styles">
                                                        <InputLabel
                                                            htmlFor="is_economically_weaker"
                                                            value="EWS- Economically Weaker Section"
                                                        />
                                                        <Checkbox
                                                            name="is_economically_weaker"
                                                            id="is_economically_weaker"
                                                            checked={
                                                                data.is_economically_weaker
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_economically_weaker",
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
                                                                    htmlFor="sub_caste"
                                                                    value="Sub Caste"
                                                                />
                                                            </div>
                                                            {/* <a
                                                                href={route('custom_field.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add Custom Field
                                                            </a> */}
                                                        </div>
                                                        <SelectInput
                                                            id="sub_caste"
                                                            data_label="Sub Caste"
                                                            data={subCasteArr}
                                                            value={
                                                                data?.sub_caste
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "sub_caste",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.sub_caste
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                {customFieldData?.filter(item => item?.form_section == 'Student Personal Details')?.map((item, index) => (
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor={item?.name}
                                                                        value={item?.name}
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('custom_field.list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add Custom Field
                                                                </a>
                                                            </div>

                                                            {item?.data_type == 'List' &&
                                                                <SelectInput
                                                                    id={item?.name}
                                                                    data_label={item?.name}
                                                                    data={item?.list_values}
                                                                    value={
                                                                        item?.value
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChangeCustomFieldValue(
                                                                            item?.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                            }

                                                            {item?.data_type == 'Date' &&
                                                                <DatePicker
                                                                    selected={item?.value ? new Date(item?.value) : null}
                                                                    onChange={(date) =>
                                                                        handleChangeCustomFieldValue(item?.id, date)
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    id={item?.name}
                                                                    className="w-full"
                                                                />
                                                            }

                                                            {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                                <TextInput
                                                                    id={item?.name}
                                                                    value={item?.value}
                                                                    onChange={(e) =>
                                                                        handleChangeCustomFieldValue(
                                                                            item?.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                    className="block"
                                                                />
                                                            }

                                                            <InputError
                                                                message={
                                                                    customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* school personal details form end */}

                                <div className="educare-create-school-details-form-wrap">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div className="educare-school-form-action-title">
                                            <h5>
                                                <i className="icon-BookBookmark"></i>
                                                Parents Profile Images
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
                                                                Image size allowed
                                                                upto -{" "}
                                                                <span className="text-danger">
                                                                    5Mb
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className="educare-student-parent-profile-images-wrap flex flex-wrap gap-x-5 justify-between">
                                                            <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                                <h6>
                                                                    Student Photo
                                                                </h6>
                                                                <label htmlFor="student_profile_image">
                                                                    {
                                                                        selectedImages?.student_profile_image
                                                                            ?
                                                                            <img
                                                                                src={selectedImages?.student_profile_image}
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
                                                                            id="student_profile_image"
                                                                            type="file"
                                                                            name="student_profile_image"
                                                                            accept="image/*"
                                                                            onChange={(e) => {
                                                                                setData("student_profile_image", e.target.files[0]);
                                                                                handleImageChange(e, 'student_profile_image');
                                                                            }
                                                                            }
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors?.student_profile_image
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                                <h6>
                                                                    Father Photo
                                                                </h6>
                                                                <label htmlFor="student_father_profile_image">
                                                                    {
                                                                        selectedImages?.student_father_profile_image
                                                                            ?
                                                                            <img
                                                                                src={selectedImages?.student_father_profile_image}
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
                                                                            id="student_father_profile_image"
                                                                            type="file"
                                                                            name="student_father_profile_image"
                                                                            accept="image/*"
                                                                            onChange={(e) => {
                                                                                setData("student_father_profile_image", e.target.files[0]);
                                                                                handleImageChange(e, 'student_father_profile_image');
                                                                            }
                                                                            }
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors?.student_father_profile_image
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                                <h6>
                                                                    Mother Photo
                                                                </h6>
                                                                <label htmlFor="student_mother_profile_image">
                                                                    {
                                                                        selectedImages?.student_mother_profile_image
                                                                            ?
                                                                            <img
                                                                                src={selectedImages?.student_mother_profile_image}
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
                                                                            id="student_mother_profile_image"
                                                                            type="file"
                                                                            name="student_mother_profile_image"
                                                                            accept="image/*"
                                                                            onChange={(e) => {
                                                                                setData("student_mother_profile_image", e.target.files[0]);
                                                                                handleImageChange(e, 'student_mother_profile_image');
                                                                            }
                                                                            }
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors?.student_mother_profile_image
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                                <h6>
                                                                    Guardian Photo
                                                                </h6>
                                                                <label htmlFor="student_guardian_profile_image">
                                                                    {
                                                                        selectedImages?.student_guardian_profile_image
                                                                            ?
                                                                            <img
                                                                                src={selectedImages?.student_guardian_profile_image}
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
                                                                            id="student_guardian_profile_image"
                                                                            type="file"
                                                                            name="student_guardian_profile_image"
                                                                            accept="image/*"
                                                                            onChange={(e) => {
                                                                                setData("student_guardian_profile_image", e.target.files[0]);
                                                                                handleImageChange(e, 'student_guardian_profile_image');
                                                                            }
                                                                            }
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors?.student_guardian_profile_image
                                                                            }
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
                                {/* upload image form end */}

                                <div className="educare-create-school-details-form-wrap">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div
                                            className={`educare-school-form-action-title ${cardActive ? "" : "pb-0"
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
                                                    className={`${cardActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                        }`}
                                                ></i>
                                            </span>
                                        </div>
                                        <div
                                            className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${cardActive ? "" : "hidden"
                                                }`}
                                        >
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="bank_id"
                                                            value="Select a Bank"
                                                        />
                                                        <SelectInput
                                                            id="bank_id"
                                                            data_label="a bank"
                                                            data={banks}
                                                            value={
                                                                data?.bank_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "bank_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.bank_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="account_name"
                                                            value="Account Name"
                                                        />
                                                        <TextInput
                                                            id="account_name"
                                                            value={
                                                                data?.account_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "account_name",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.account_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="account_type"
                                                            value="Account Type"
                                                        />
                                                        <SelectInput
                                                            id="account_type"
                                                            data_label="Account Type"
                                                            data={accountArr}
                                                            value={
                                                                data?.account_type
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "account_type",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.account_type
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="account_no"
                                                            value="Account No"
                                                        />
                                                        <TextInput
                                                            id="account_no"
                                                            value={
                                                                data?.account_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "account_no",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.account_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="ifsc_code"
                                                            value="IFSC Code"
                                                        />
                                                        <TextInput
                                                            id="ifsc_code"
                                                            value={
                                                                data?.ifsc_code
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ifsc_code",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.ifsc_code
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="micr_no"
                                                            value="MICR No"
                                                        />
                                                        <TextInput
                                                            id="micr_no"
                                                            value={
                                                                data?.micr_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "micr_no",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.micr_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="branch_name"
                                                            value="Branch Name"
                                                        />
                                                        <TextInput
                                                            id="branch_name"
                                                            value={
                                                                data?.branch_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "branch_name",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.branch_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                {customFieldData?.filter(item => item?.form_section == 'Student Bank Details')?.map((item, index) => (
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor={item?.name}
                                                                        value={item?.name}
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('custom_field.list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add Custom Field
                                                                </a>
                                                            </div>

                                                            {item?.data_type == 'List' &&
                                                                <SelectInput
                                                                    id={item?.name}
                                                                    data_label={item?.name}
                                                                    data={item?.list_values}
                                                                    value={
                                                                        item?.value
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChangeCustomFieldValue(
                                                                            item?.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                            }

                                                            {item?.data_type == 'Date' &&
                                                                <DatePicker
                                                                    selected={item?.value ? new Date(item?.value) : null}
                                                                    onChange={(date) =>
                                                                        handleChangeCustomFieldValue(item?.id, date)
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    id={item?.name}
                                                                    className="w-full"
                                                                />
                                                            }

                                                            {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                                <TextInput
                                                                    id={item?.name}
                                                                    value={item?.value}
                                                                    onChange={(e) =>
                                                                        handleChangeCustomFieldValue(
                                                                            item?.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                    className="block"
                                                                />
                                                            }

                                                            <InputError
                                                                message={
                                                                    customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* school bank details form end */}

                                <div className="educare-create-school-details-form-wrap">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div
                                            className={`educare-school-form-action-title ${cardActive1 ? "" : "pb-0"
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
                                                    className={`${cardActive1
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                        }`}
                                                ></i>
                                            </span>
                                        </div>
                                        <div
                                            className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${cardActive1 ? "" : "hidden"
                                                }`}
                                        >
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="prev_school_name"
                                                            value="School Name"
                                                        />
                                                        <TextInput
                                                            id="prev_school_name"
                                                            value={
                                                                data?.prev_school_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "prev_school_name",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.prev_school_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="prev_school_class"
                                                            value="School Class"
                                                        />
                                                        <TextInput
                                                            id="prev_school_class"
                                                            value={
                                                                data?.prev_school_class
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "prev_school_class",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.prev_school_class
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="prev_school_year"
                                                            value="School Year"
                                                        />
                                                        <TextInput
                                                            id="prev_school_year"
                                                            value={
                                                                data?.prev_school_year
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "prev_school_year",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.prev_school_year
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="prev_school_tc_no"
                                                            value="TC Number"
                                                        />
                                                        <TextInput
                                                            id="prev_school_tc_no"
                                                            value={
                                                                data.prev_school_tc_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "prev_school_tc_no",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.prev_school_tc_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                {customFieldData?.filter(item => item?.form_section == 'Previous School Details')?.map((item, index) => (
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor={item?.name}
                                                                        value={item?.name}
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('custom_field.list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add Custom Field
                                                                </a>
                                                            </div>

                                                            {item?.data_type == 'List' &&
                                                                <SelectInput
                                                                    id={item?.name}
                                                                    data_label={item?.name}
                                                                    data={item?.list_values}
                                                                    value={
                                                                        item?.value
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChangeCustomFieldValue(
                                                                            item?.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                            }

                                                            {item?.data_type == 'Date' &&
                                                                <DatePicker
                                                                    selected={item?.value ? new Date(item?.value) : null}
                                                                    onChange={(date) =>
                                                                        handleChangeCustomFieldValue(item?.id, date)
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    id={item?.name}
                                                                    className="w-full"
                                                                />
                                                            }

                                                            {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                                <TextInput
                                                                    id={item?.name}
                                                                    value={item?.value}
                                                                    onChange={(e) =>
                                                                        handleChangeCustomFieldValue(
                                                                            item?.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                    className="block"
                                                                />
                                                            }

                                                            <InputError
                                                                message={
                                                                    customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
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
                                                                htmlFor="f_first_name"
                                                                value="First Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="f_first_name"
                                                        required
                                                        value={
                                                            data.f_first_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_first_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                        style={{ borderColor: customErr.father_name ? 'red' : '' }}
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_first_name
                                                        }
                                                        className="mt-2"
                                                    />

                                                    {customErr.father_name &&
                                                        <InputError
                                                            message={customErr.father_name}
                                                            className="mt-2"
                                                        />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_middle_name"
                                                        value="Middle Name"
                                                    />
                                                    <TextInput
                                                        id="f_middle_name"
                                                        value={
                                                            data.f_middle_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_middle_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_middle_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_last_name"
                                                        value="Last Name"
                                                    />
                                                    <TextInput
                                                        id="f_last_name"
                                                        value={
                                                            data.f_last_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_last_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_last_name
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
                                                                htmlFor="f_email"
                                                                value="Email"
                                                            />
                                                            {/* <sup>*</sup> */}
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="f_email"
                                                        value={
                                                            data.f_email
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_email",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="email"
                                                        className="block"
                                                        style={{ borderColor: customErr.father_email ? 'red' : '' }}
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_email
                                                        }
                                                        className="mt-2"
                                                    />
                                                    {customErr.father_email &&
                                                        <InputError
                                                            message={customErr.father_email}
                                                            className="mt-2"
                                                        />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="f_phone"
                                                                value="Mobile"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="f_phone"
                                                        required
                                                        value={
                                                            data.f_phone
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_phone",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                        style={{ borderColor: customErr.father_phone ? 'red' : '' }}
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_phone
                                                        }
                                                        className="mt-2"
                                                    />
                                                    {customErr.father_phone &&
                                                        <InputError
                                                            message={customErr.father_phone}
                                                            className="mt-2"
                                                        />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="f_sms_phone"
                                                                value="SMS Number"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="f_sms_phone"
                                                        required
                                                        value={
                                                            data.f_sms_phone
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_sms_phone",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_sms_phone
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_highest_qualification"
                                                        value="Highest Qualification"
                                                    />
                                                    <TextInput
                                                        id="f_highest_qualification"
                                                        value={
                                                            data.f_highest_qualification
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_highest_qualification",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="Type for suggestions"
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_highest_qualification
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="father_occupation_id"
                                                        value="Occupation"
                                                    />

                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-type-file-styles">
                                                        <Autocomplete
                                                            disablePortal
                                                            options={occupations}
                                                            value={selectedOptions}
                                                            onChange={handleSelectChange} 
                                                            getOptionLabel={(option) => option ? option.title : ''}
                                                            renderInput={(params) => <TextField {...params} label="" placeholder='Select' />}
                                                        />
                                                        </div>
                                                    </div>

                                                    <InputError
                                                        message={
                                                            errors.father_occupation_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_income_per_year"
                                                        value="Income Per Year"
                                                    />
                                                    <TextInput
                                                        id="f_income_per_year"
                                                        value={
                                                            data.f_income_per_year
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_income_per_year",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_income_per_year
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_department"
                                                        value="Department"
                                                    />
                                                    <TextInput
                                                        id="f_department"
                                                        value={
                                                            data.f_department
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_department",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_department
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_designation"
                                                        value="Designation"
                                                    />
                                                    <TextInput
                                                        id="f_designation"
                                                        value={
                                                            data.f_designation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_designation",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_designation
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_aadhar_card_no"
                                                        value="Aadhar Card No"
                                                    />
                                                    <TextInput
                                                        id="f_aadhar_card_no"
                                                        value={
                                                            data.f_aadhar_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_aadhar_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_aadhar_card_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_pan_card_no"
                                                        value="Pan Card No"
                                                    />
                                                    <TextInput
                                                        id="f_pan_card_no"
                                                        value={
                                                            data.f_pan_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_pan_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_pan_card_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_company_name"
                                                        value="Company Name"
                                                    />
                                                    <TextInput
                                                        id="f_company_name"
                                                        value={
                                                            data.f_company_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_company_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_company_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="f_office_address"
                                                        value="Office Address"
                                                    />
                                                    <TextInput
                                                        id="f_office_address"
                                                        value={
                                                            data.f_office_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "f_office_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.f_office_address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            {customFieldData?.filter(item => item?.form_section == "Father's Details")?.map((item, index) => (
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor={item?.name}
                                                                    value={item?.name}
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('custom_field.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add Custom Field
                                                            </a>
                                                        </div>

                                                        {item?.data_type == 'List' &&
                                                            <SelectInput
                                                                id={item?.name}
                                                                data_label={item?.name}
                                                                data={item?.list_values}
                                                                value={
                                                                    item?.value
                                                                }
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                        }

                                                        {item?.data_type == 'Date' &&
                                                            <DatePicker
                                                                selected={item?.value ? new Date(item?.value) : null}
                                                                onChange={(date) =>
                                                                    handleChangeCustomFieldValue(item?.id, date)
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={false}
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                id={item?.name}
                                                                className="w-full"
                                                            />
                                                        }

                                                        {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                            <TextInput
                                                                id={item?.name}
                                                                value={item?.value}
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                className="block"
                                                            />
                                                        }

                                                        <InputError
                                                            message={
                                                                customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
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
                                                                htmlFor="m_first_name"
                                                                value="First Name"
                                                            />

                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="m_first_name"
                                                        value={
                                                            data.m_first_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_first_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_first_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_middle_name"
                                                        value="Middle Name"
                                                    />
                                                    <TextInput
                                                        id="m_middle_name"
                                                        value={
                                                            data.m_middle_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_middle_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_middle_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_last_name"
                                                        value="Last Name"
                                                    />
                                                    <TextInput
                                                        id="m_last_name"
                                                        value={
                                                            data.m_last_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_last_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_last_name
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
                                                                htmlFor="m_email"
                                                                value="Email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="m_email"
                                                        value={
                                                            data.m_email
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_email",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="email"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_email
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_phone"
                                                        value="Mobile"
                                                    />
                                                    <TextInput
                                                        id="m_phone"
                                                        value={
                                                            data.m_phone
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_phone",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_phone
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_highest_qualification"
                                                        value="Highest Qualification"
                                                    />
                                                    <TextInput
                                                        id="m_highest_qualification"
                                                        value={
                                                            data.m_highest_qualification
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_highest_qualification",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="Type for suggestions"
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_highest_qualification
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="mother_occupation_id"
                                                        value="Occupation"
                                                    />
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-type-file-styles">
                                                        <Autocomplete
                                                            disablePortal
                                                            options={occupations}
                                                            value={selectedOptionsMother}
                                                            onChange={handleSelectChangeMother} 
                                                            getOptionLabel={(option) => option ? option.title : ''}
                                                            renderInput={(params) => <TextField {...params} label="" placeholder='Select' />}
                                                        />
                                                        </div>
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.mother_occupation_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_income_per_year"
                                                        value="Income Per Year"
                                                    />
                                                    <TextInput
                                                        id="m_income_per_year"
                                                        value={
                                                            data.m_income_per_year
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_income_per_year",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_income_per_year
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_department"
                                                        value="Department"
                                                    />
                                                    <TextInput
                                                        id="m_department"
                                                        value={
                                                            data.m_department
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_department",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_department
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_designation"
                                                        value="Designation"
                                                    />
                                                    <TextInput
                                                        id="m_designation"
                                                        value={
                                                            data.m_designation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_designation",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_designation
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_aadhar_card_no"
                                                        value="Aadhar Card No"
                                                    />
                                                    <TextInput
                                                        id="m_aadhar_card_no"
                                                        value={
                                                            data.m_aadhar_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_aadhar_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_aadhar_card_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_pan_card_no"
                                                        value="Pan Card No"
                                                    />
                                                    <TextInput
                                                        id="m_pan_card_no"
                                                        value={
                                                            data.m_pan_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_pan_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_pan_card_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_company_name"
                                                        value="Company Name"
                                                    />
                                                    <TextInput
                                                        id="m_company_name"
                                                        value={
                                                            data.m_company_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_company_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_company_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="m_office_address"
                                                        value="Office Address"
                                                    />
                                                    <TextInput
                                                        id="m_office_address"
                                                        value={
                                                            data.m_office_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "m_office_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.m_office_address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            {customFieldData?.filter(item => item?.form_section == "Mother's Details")?.map((item, index) => (
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor={item?.name}
                                                                    value={item?.name}
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('custom_field.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add Custom Field
                                                            </a>
                                                        </div>

                                                        {item?.data_type == 'List' &&
                                                            <SelectInput
                                                                id={item?.name}
                                                                data_label={item?.name}
                                                                data={item?.list_values}
                                                                value={
                                                                    item?.value
                                                                }
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                        }

                                                        {item?.data_type == 'Date' &&
                                                            <DatePicker
                                                                selected={item?.value ? new Date(item?.value) : null}
                                                                onChange={(date) =>
                                                                    handleChangeCustomFieldValue(item?.id, date)
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={false}
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                id={item?.name}
                                                                className="w-full"
                                                            />
                                                        }

                                                        {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                            <TextInput
                                                                id={item?.name}
                                                                value={item?.value}
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                className="block"
                                                            />
                                                        }

                                                        <InputError
                                                            message={
                                                                customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Mother's details form end */}

                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${cardActive2 ? "" : "pb-0"
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
                                                className={`${cardActive2
                                                    ? "icon-minus"
                                                    : "icon-plus"
                                                    }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${cardActive2 ? "" : "hidden"
                                            }`}
                                    >
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="g_first_name"
                                                                value="Full Name"
                                                            />

                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="g_first_name"
                                                        value={
                                                            data.g_first_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_first_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_first_name
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
                                                                htmlFor="g_email"
                                                                value="Email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="g_email"
                                                        value={
                                                            data.g_email
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_email",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="email"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_email
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_phone"
                                                        value="Mobile"
                                                    />
                                                    <TextInput
                                                        id="g_phone"
                                                        value={
                                                            data.g_phone
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_phone",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_phone
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_relation"
                                                        value="Relation"
                                                    />
                                                    <TextInput
                                                        id="g_relation"
                                                        value={
                                                            data.g_relation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_relation",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_relation
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_highest_qualification"
                                                        value="Highest Qualification"
                                                    />
                                                    <TextInput
                                                        id="g_highest_qualification"
                                                        value={
                                                            data.g_highest_qualification
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_highest_qualification",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="Type for suggestions"
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_highest_qualification
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_occupation"
                                                        value="Occupation"
                                                    />
                                                    <TextInput
                                                        id="g_occupation"
                                                        value={
                                                            data.g_occupation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_occupation",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="Type for suggestions"
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_occupation
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_department"
                                                        value="Department"
                                                    />
                                                    <TextInput
                                                        id="g_department"
                                                        value={
                                                            data.g_department
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_department",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_department
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_designation"
                                                        value="Designation"
                                                    />
                                                    <TextInput
                                                        id="g_designation"
                                                        value={
                                                            data.g_designation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_designation",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_designation
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_aadhar_card_no"
                                                        value="Aadhar Card No"
                                                    />
                                                    <TextInput
                                                        id="g_aadhar_card_no"
                                                        value={
                                                            data.g_aadhar_card_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_aadhar_card_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_aadhar_card_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_id_no"
                                                        value="Guardian Id"
                                                    />
                                                    <TextInput
                                                        id="g_id_no"
                                                        value={
                                                            data.g_id_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_id_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_id_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_city"
                                                        value="Village/City"
                                                    />
                                                    <TextInput
                                                        id="g_city"
                                                        value={
                                                            data.g_city
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_city",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_city
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="g_address"
                                                        value="Address"
                                                    />
                                                    <TextInput
                                                        id="g_address"
                                                        value={
                                                            data.g_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "g_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.g_address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            {customFieldData?.filter(item => item?.form_section == "Guardian Details")?.map((item, index) => (
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor={item?.name}
                                                                    value={item?.name}
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('custom_field.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add Custom Field
                                                            </a>
                                                        </div>

                                                        {item?.data_type == 'List' &&
                                                            <SelectInput
                                                                id={item?.name}
                                                                data_label={item?.name}
                                                                data={item?.list_values}
                                                                value={
                                                                    item?.value
                                                                }
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                        }

                                                        {item?.data_type == 'Date' &&
                                                            <DatePicker
                                                                selected={item?.value ? new Date(item?.value) : null}
                                                                onChange={(date) =>
                                                                    handleChangeCustomFieldValue(item?.id, date)
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={false}
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                id={item?.name}
                                                                className="w-full"
                                                            />
                                                        }

                                                        {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                            <TextInput
                                                                id={item?.name}
                                                                value={item?.value}
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                className="block"
                                                            />
                                                        }

                                                        <InputError
                                                            message={
                                                                customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Guardian details form end */}

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
                                                        htmlFor="present_city"
                                                        value="City"
                                                    />
                                                    <TextInput
                                                        id="present_city"
                                                        value={
                                                            data.present_city
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "present_city",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.present_city
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="present_taluka"
                                                        value="Taluka"
                                                    />
                                                    <TextInput
                                                        id="present_taluka"
                                                        value={
                                                            data?.present_taluka
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "present_taluka",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.present_taluka
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="present_district"
                                                        value="District"
                                                    />
                                                    <TextInput
                                                        id="present_district"
                                                        value={
                                                            data.present_district
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "present_district",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.present_district
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="present_pin_code"
                                                        value="Pin code"
                                                    />
                                                    <TextInput
                                                        id="present_pin_code"
                                                        value={
                                                            data?.present_pin_code
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "present_pin_code",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.present_pin_code
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            {customFieldData?.filter(item => item?.form_section == "Present Address")?.map((item, index) => (
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor={item?.name}
                                                                    value={item?.name}
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('custom_field.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add Custom Field
                                                            </a>
                                                        </div>

                                                        {item?.data_type == 'List' &&
                                                            <SelectInput
                                                                id={item?.name}
                                                                data_label={item?.name}
                                                                data={item?.list_values}
                                                                value={
                                                                    item?.value
                                                                }
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                        }

                                                        {item?.data_type == 'Date' &&
                                                            <DatePicker
                                                                selected={item?.value ? new Date(item?.value) : null}
                                                                onChange={(date) =>
                                                                    handleChangeCustomFieldValue(item?.id, date)
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={false}
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                id={item?.name}
                                                                className="w-full"
                                                            />
                                                        }

                                                        {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                            <TextInput
                                                                id={item?.name}
                                                                value={item?.value}
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                className="block"
                                                            />
                                                        }

                                                        <InputError
                                                            message={
                                                                customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
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
                                                                name="student_present_same"
                                                                onClick={(e) => handlePresentPermanent(e)}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
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
                                                        htmlFor="permanent_taluka"
                                                        value="Taluka"
                                                    />
                                                    <TextInput
                                                        id="permanent_taluka"
                                                        value={
                                                            data?.permanent_taluka
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "permanent_taluka",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.permanent_taluka
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="permanent_district"
                                                        value="District"
                                                    />
                                                    <TextInput
                                                        id="permanent_district"
                                                        value={
                                                            data.permanent_district
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "permanent_district",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.permanent_district
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

                                            {customFieldData?.filter(item => item?.form_section == "Permanent Address")?.map((item, index) => (
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor={item?.name}
                                                                    value={item?.name}
                                                                />
                                                            </div>
                                                            <a
                                                                href={route('custom_field.list')}
                                                                className="educare-secondary-btn-sm-stroke"
                                                                target="_blank"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add Custom Field
                                                            </a>
                                                        </div>

                                                        {item?.data_type == 'List' &&
                                                            <SelectInput
                                                                id={item?.name}
                                                                data_label={item?.name}
                                                                data={item?.list_values}
                                                                value={
                                                                    item?.value
                                                                }
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                        }

                                                        {item?.data_type == 'Date' &&
                                                            <DatePicker
                                                                selected={item?.value ? new Date(item?.value) : null}
                                                                onChange={(date) =>
                                                                    handleChangeCustomFieldValue(item?.id, date)
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={false}
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                id={item?.name}
                                                                className="w-full"
                                                            />
                                                        }

                                                        {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                            <TextInput
                                                                id={item?.name}
                                                                value={item?.value}
                                                                onChange={(e) =>
                                                                    handleChangeCustomFieldValue(
                                                                        item?.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                className="block"
                                                            />
                                                        }

                                                        <InputError
                                                            message={
                                                                customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
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
                                                            id="document_pan_card"
                                                            name="document_pan_card"
                                                            checked={
                                                                data.pan_card
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
                                                                data.aadhaar_card
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
                                                                data.voter_card
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
                                                                data.passport_card
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
                            {/* Document attached form end */}
                        </div>
                    </div>
                    <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
                        <PrimaryButton
                            disabled={processing}
                            type="button"
                            className="educare-gray-btn-lg-fill"
                            onClick={handleReset}
                        >
                            Reset
                        </PrimaryButton>
                        <DangerButton
                            disabled={processing}
                            className="educare-danger-btn-lg-fill"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </DangerButton>

                        <PrimaryButton
                            disabled={processing}
                            className="educare-primary-btn-lg-fill"
                            type="submit"
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <CheckSiblingPopupForm
                data={data}
                setData={setData}
                onSelectStudents={handleSelectStudents}
                siblingData={siblingData}
                editSiblingPopupOpen={editSiblingPopupOpen}
                setSiblingEditPopupOpen={setSiblingEditPopupOpen} />
        </>
    );
};

export default CreateStudentForm;
