import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import placeholderImage from "../../../../../images/icon/placeholder.jpg";
import AddSiblingPopupForm from "./Popup/AddSiblingPopupForm";

const CreateAdmissionForm = ({
    classNames = [],
    schBoaArr = [],
    genderArr = [],
    categories = [],
    bloodGroups = [],
    religions = [],
    countries = [],
    states = [],
    banks = [],
    academicYears = [],
    users = [],
    admissionSources = [],
    paymentMode = [],
    catEmps = [],
    referenceTypeArr = [],
    alumniTypeArr = [],
    staffs = [],
    admissionProcess,
    enquiry,
    students,
    academicYearId,
    customFields
}) => {
    const [birthDate, setBirthDate] = useState(null);
    const [regDate, setRegDate] = useState(new Date());
    const [cardActive, setCardActive] = useState(false);
    const [cardActive1, setCardActive1] = useState(false);
    const [cardActive2, setCardActive2] = useState(true);
    const [cardActive3, setCardActive3] = useState(false);
    const [cardActive4, setCardActive4] = useState(false);
    // const [attachedFile, setAttachedFile] = useState({});
    // const [selectedSiblings, setSelectedSiblings] = useState([]);
    const [editSiblingPopupOpen, setSiblingEditPopupOpen] = useState(false);
    const [chequeDate, setChequeDate] = useState();
    const [bankAccountData, setBankAccountData] = useState([]);
    const [classAdmissionProcessData, setClassAdmissionProcessData] = useState({});
    const [selectedSibling, setSelectedSibling] = useState({});

    const [customFieldData, setCustomFieldData] = useState(customFields);
    const [customFieldErrors, setCustomFieldErrors] = useState({});

    // const { flash } = usePage().props;

    // useEffect(() => {
    //     if (flash.bankAccounts) {
    //         setBankAccountData(flash.bankAccounts);
    //     }
    // }, [flash]);

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

    const { data, setData, errors, post, reset, processing } = useForm({
        // Student Academic Details
        enquiry_id: enquiry?.id ?? "",
        sibling_id: "",
        selectedSibling: [],
        academic_year_id: enquiry?.admission_academic_year_id != null ? enquiry?.admission_academic_year_id : academicYearId,
        class_name_id: enquiry?.class_name_id ?? "",
        academic_fee: "",
        user_id: "",
        source_id: "",
        reference_by: "",
        staff_id: "",
        reference_by_parent: "",
        reference_by_alumni: "",
        employment_category_id: "",
        //payment mode start
        payment_mode: "",
        payment_note: "",
        cheque_date: "",
        school_receipt_no: "",
        keep_same_payment_detail: "",
        //cheque
        cheque_no: "",
        bank_name: "",
        branch: "",
        //Bank Process form
        bank_account_id: "",
        bank_id: "",
        //Paytm
        paytm_ref_no: "",
        paytm_mobile: "",
        //Neft
        neft_number: "",
        neft_desc: "",
        //UPI
        upi_description: "",
        upi_number: "",
        //payment mode end
        // selectedSibling: [],

        //Student Personal Details
        first_name: enquiry?.first_name ?? "",
        middle_name: enquiry?.middle_name ?? "",
        last_name: enquiry?.last_name ?? "",
        gender: enquiry?.gender ?? "",
        contact_email: "",
        blood_group: "",
        date_of_birth: enquiry?.birth_date_at ?? "",
        religion: "",
        category_id: "",
        country_id: "",
        contact_number: "",
        country_code: "",
        date_of_registration: "",
        form_no: "",
        aadhar_card_no: "",
        srn_no: "",
        child_id: "",
        samagra_id: "",
        mother_tongue: "",
        medical_condition: "",
        is_physically_disabled: "",
        is_special_child: "",
        conomically_weaker_section: "",

        // start father info
        father_first_name: enquiry?.guardian?.father_first_name ?? "",
        father_middle_name: enquiry?.guardian?.father_middle_name ?? "",
        father_last_name: enquiry?.guardian?.father_last_name ?? "",
        father_email: enquiry?.guardian?.father_email ?? "",
        father_mobile: "",
        father_sms_number: "",
        father_highest_qualification: "",
        father_occupation: enquiry?.guardian?.father_occupation ?? "",
        father_income_per_year: "",
        father_department: "",
        father_designation: "",
        father_aadhar_card_no: "",
        father_pan_card_no: "",
        father_office_address: "",
        father_company_name: "",
        // end father info

        // start mother info
        mother_first_name: enquiry?.guardian?.mother_first_name ?? "",
        mother_middle_name: enquiry?.guardian?.mother_middle_name ?? "",
        mother_last_name: enquiry?.guardian?.mother_last_name ?? "",
        mother_email: enquiry?.guardian?.mother_email ?? "",
        mother_mobile: "",
        mother_highest_qualification: "",
        mother_occupation: enquiry?.guardian?.mother_occupation ?? "",
        mother_income_per_year: "",
        mother_department: "",
        mother_designation: "",
        mother_aadhar_card_no: "",
        mother_pan_card_no: "",
        mother_company_name: "",
        mother_office_address: "",
        // end mother info

        present_address: enquiry?.present_address ?? "",
        present_state: enquiry?.state_id ?? "",
        city: enquiry?.city ?? "",
        taluka: "",
        district: enquiry?.district ?? "",
        pin_code: "",

        permanent_address: "",
        permanent_state: "",
        permanent_city: "",
        permanent_taluka: "",
        permanent_district: "",
        permanent_pin_code: "",

        document_attached: [],

        school_name: enquiry?.school_name ?? "",
        school_class: enquiry?.school_class ?? "",
        school_year: enquiry?.school_year ?? "",
        tc_no: enquiry?.tc_no ?? "",
        referred_by: enquiry?.referred_by ?? "",

        boarding_scholar: enquiry?.boarding_scholar ?? "",
        is_transport_availed: "",

        sibling_name: "",
        sibling_std: "",
        sibling_adm_no: "",
        sibling_year: "",
        is_have_sibling: "",

        // images
        student_image: null,
        father_image: null,
        mother_image: null,
        guardian_image: null,

        // custom fields
        custom_fields: customFieldData
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            custom_fields: customFieldData?.map(item => ({
                id: item?.id,
                value: item?.value
            }))
        }));
    }, [customFieldData]);

    useEffect(() => {
        if(data?.is_have_sibling == true){
            setData((prevData) => ({
                ...prevData,
                sibling_id: selectedSibling?.id ?? ""
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                sibling_id:  ""
            }));
        }
    }, [data?.is_have_sibling, selectedSibling]);

    useEffect(() => {
        setClassAdmissionProcessData(admissionProcess?.admission_classrooms?.find(item => item?.class_name_id == data?.class_name_id));
    }, [data?.class_name_id]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            academic_fee: classAdmissionProcessData?.reg_fee ?? ""
        }));
    }, [classAdmissionProcessData]);

    // handle academic year change start
    const handleAacademicYearChange = (e) => {
        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id: academic_year_id,
            class_name_id: "",
        }));

        if(enquiry?.id != null) {
            router.post(route('admission_enquery_reg.create_registration', {enquiry_id: enquiry?.id}), {academic_year_id: academic_year_id});
        }
        else {
            router.post(route('admission_enquery_reg.create_registration'), {academic_year_id: academic_year_id});
        }
    }
    // handle academic year change end


    // handle class name change start
    const handleClassNameChange = (e) => {
        const class_name_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
            academic_fee: "",
        }));

        setClassAdmissionProcessData(admissionProcess?.admission_classrooms?.find(item => item?.class_name_id == class_name_id));
    }
    // handle class name change end

    // const handleSelectStudents = (selectedStudents) => {
    //     setSelectedSiblings(selectedStudents);
    // };

    // useEffect(() => {
    //     setData("selectedSibling", selectedSiblings);
    // }, [selectedSiblings]);

    const [customErr, setCustomErr] = useState({
        father_name: "",
        father_email: "",
        father_phone: "",
    });

    const handlePresentPermanent = (e) => {
        if (e.target.checked) {
            setData((prevData) => ({
                ...prevData,
                permanent_address: prevData.present_address,
                permanent_state: prevData.present_state,
                permanent_city: prevData.city,
                permanent_taluka: prevData.taluka,
                permanent_district: prevData.district,
                permanent_pin_code: prevData.pin_code,
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                permanent_address: "",
                permanent_state: "",
                permanent_city: "",
                permanent_taluka: "",
                permanent_district: "",
                permanent_pin_code: "",
            }));
        }
    };

    // const handleAttachedFile = (title, isChecked) => {
    //     setAttachedFile((prevState) => ({
    //         ...prevState,
    //         [title]: isChecked,
    //     }));
    //     setAttachedFileInData(title, isChecked);
    // };

    // const setAttachedFileInData = (title, isChecked) => {
    //     setAttachedFile((prevState) => {
    //         const updatedAFiles = {
    //             ...prevState,
    //             [title]: isChecked,
    //         };

    //         const attachedFileArray = Object.entries(updatedAFiles).map(
    //             ([title, is_have]) => ({ title, is_have })
    //         );
    //         setData("document_attached", attachedFileArray);

    //         return updatedAFiles;
    //     });
    // };


    const createStudentData = (e) => {
        e.preventDefault();

        let hasError = false;
        const custom_field_errors = {};

        customFieldData?.forEach(item => {
            if (item?.is_required && item?.value == '') {
                hasError = true;

                custom_field_errors[`${item?.id}_${item?.name}`] = 'required';
            }
        });

        setCustomFieldErrors(custom_field_errors);

        if (hasError == false) {
            data.cheque_date = chequeDate;
            data.date_of_birth = birthDate;
            data.date_of_registration = regDate;

            // post(route("admission_registration.save"), {
            //     preserveScroll: true,
            //     onSuccess: () => reset(),
            // });

            if(enquiry?.id != null) {
                post(route("admission_enquery_reg.enquiry_push_to_registration", enquiry?.id), {
                    preserveScroll: true,
                    onSuccess: () => reset(),
                });
            }
            else {
                post(route("admission_enquery_reg.registration_save"), {
                    preserveScroll: true,
                    onSuccess: () => reset(),
                });
            }
        }
    };

    // handle add sibling start
    const handelAddSibling = (e) => {
        e.preventDefault();

        setSiblingEditPopupOpen(!editSiblingPopupOpen);
    }
    // handle add sibling end

    // const handelCheckSibling = (
    //     isChecked,
    //     fatherName,
    //     fatherEmail,
    //     fatherMobile
    // ) => {
    //     setCustomErr({
    //         father_name: "",
    //         father_email: "",
    //         father_phone: "",
    //     });
    //     if (!fatherName) {
    //         setCustomErr((prevErr) => ({
    //             ...prevErr,
    //             father_name: "Father's name is required",
    //         }));
    //         setData("is_have_sibling", false);
    //     }
    //     if (!fatherEmail) {
    //         setCustomErr((prevErr) => ({
    //             ...prevErr,
    //             father_email: "Father's email is required",
    //         }));
    //         setData("is_have_sibling", false);
    //     }
    //     if (!fatherMobile) {
    //         setCustomErr((prevErr) => ({
    //             ...prevErr,
    //             father_phone: "Father's phone number is required",
    //         }));
    //         setData("is_have_sibling", false);
    //     }

    //     if (
    //         customErr.father_name ||
    //         customErr.father_email ||
    //         customErr.father_phone
    //     ) {
    //         setData("is_have_sibling", false);
    //         return;
    //     }

    //     if (fatherName && fatherEmail && fatherMobile) {
    //         const fatherInfo = { fatherName, fatherEmail, fatherMobile };
    //         router.post(route("student.sibling_check"), fatherInfo);
    //         setData("is_have_sibling", isChecked);
    //         setSiblingEditPopupOpen(!editSiblingPopupOpen);
    //     }
    // };

    // const handlePaymentModeChange = (e) => {
    //     e.preventDefault();
    //     // if (e.target.value == "Bank Process" && data?.student_id != "") {
    //     //     post(route("fee.get_bank_accounts_by_student"), data, {
    //     //         preserveScroll: true,
    //     //         onSuccess: () => reset(),
    //     //     });
    //     // }
    // };

    const handleReset = () => {
        reset();
        setBirthDate(null);
    };

    // handle change custom field value start
    const handleChangeCustomFieldValue = (id, value) => {
        setCustomFieldData(customFieldData?.map(item => ({
            ...item,
            value: item?.id == id ? value : item?.value
        })));
    }
    // handle change custom field value end

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
                                                                    htmlFor="academic_year"
                                                                    value="Academic Year"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="academic_year_id"
                                                            data_label="Academic Year"
                                                            data={academicYears}
                                                            required={true}
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
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.academic_year_id
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
                                                                    htmlFor="class_name_id"
                                                                    value="Class Name"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="class_name_id"
                                                            data_label="Class"
                                                            required={true}
                                                            data={classNames}
                                                            value={
                                                                data?.class_name_id
                                                            }
                                                            onChange={(e) =>
                                                                handleClassNameChange(e)
                                                                // setData(
                                                                //     "class_name_id",
                                                                //     e.target
                                                                //         .value
                                                                // )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.class_name_id
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
                                                                    htmlFor="academic_fee"
                                                                    value="Fee"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="academic_fee"
                                                            value={
                                                                data.academic_fee
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "academic_fee",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                            type="number"
                                                            required
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.academic_fee
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                {/* payment mode start */}
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="payment_mode"
                                                                    value="Payment Mode"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="payment_mode"
                                                            data_label="Payment Mode"
                                                            data={paymentMode}
                                                            value={data.payment_mode}
                                                            onChange={(e) => {
                                                                setData("payment_mode", e.target.value);
                                                                // handlePaymentModeChange(e);
                                                            }}
                                                            className="block"
                                                            required
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.payment_mode
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                {/* If Enable Bank Process Start */}
                                                {data.payment_mode ===
                                                    "Bank Process" ? (
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="bank_account_id"
                                                                        value="Account Name"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <SelectInput
                                                                id="bank_account_id"
                                                                data_label="Account"
                                                                data={
                                                                    bankAccountData
                                                                }
                                                                value={
                                                                    data.bank_account_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "bank_account_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                                required
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.bank_account_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {/* If Enable Bank Process End */}

                                                {/* If Enable Cheque Start */}
                                                {data.payment_mode ===
                                                    "Cheque" ? (
                                                    <>
                                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="cheque_no"
                                                                            value="Cheque No"
                                                                        />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <TextInput
                                                                    value={data.cheque_no}
                                                                    onChange={(e) => setData("cheque_no", e.target.value)}
                                                                    className="block"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.cheque_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel value="Cheque Date" />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <DatePicker
                                                                    selected={
                                                                        chequeDate
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) =>
                                                                        setChequeDate(
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
                                                                    placeholderText="Date"
                                                                    className="w-full"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="bank_id"
                                                                            value="Bank Name"
                                                                        />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <SelectInput
                                                                    id="bank_id"
                                                                    data_label="Bank"
                                                                    data={banks}
                                                                    value={
                                                                        data.bank_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "bank_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.bank_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {/* If Enable Cheque End */}

                                                {/* If Enable Paytm Start */}
                                                {data.payment_mode ===
                                                    "Paytm" ? (
                                                    <>
                                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="paytm_ref_no"
                                                                            value="Paytm Ref. No"
                                                                        />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <TextInput
                                                                    value={
                                                                        data.paytm_ref_no
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "paytm_ref_no",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.paytm_ref_no
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
                                                                            htmlFor="paytm_mobile"
                                                                            value="Paytm MobNo"
                                                                        />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <TextInput
                                                                    value={
                                                                        data.paytm_mobile
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "paytm_mobile",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.paytm_mobile
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {/* If Enable Paytm End */}

                                                {/* If Enable Neft Start */}
                                                {data.payment_mode ===
                                                    "Neft" ? (
                                                    <>
                                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="neft_number"
                                                                            value="Neft Number"
                                                                        />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <TextInput
                                                                    value={
                                                                        data.neft_number
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "neft_number",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.neft_number
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
                                                                            htmlFor="neft_desc"
                                                                            value="Neft Desc"
                                                                        />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <TextInput
                                                                    value={
                                                                        data.neft_desc
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "neft_desc",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.neft_desc
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {/* If Enable Neft End */}

                                                {/* If Enable UPI Start */}
                                                {data.payment_mode === "UPI" ? (
                                                    <>
                                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="upi_number"
                                                                            value="UPI Transection ID"
                                                                        />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <TextInput
                                                                    value={
                                                                        data.upi_number
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "upi_number",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="UPI Transection ID"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.upi_number
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
                                                                            htmlFor="upi_description"
                                                                            value="UPI Description"
                                                                        />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <TextInput
                                                                    value={
                                                                        data.upi_description
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "upi_description",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="UPI Description"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.upi_description
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {/* If Enable UPI End */}

                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="payment_note"
                                                            value="Payment Note"
                                                        />
                                                        <TextInput
                                                            id="payment_note"
                                                            value={
                                                                data.payment_note
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "payment_note",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                            placeHolder="Payment Note"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.payment_note
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                {/* payment mode end */}
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="user_id"
                                                            value="Registration By"
                                                        />
                                                        <SelectInput
                                                            id="user_id"
                                                            data_label="Registration By"
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
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="source_id"
                                                            value="Registration Source"
                                                        />
                                                        <SelectInput
                                                            id="source_id"
                                                            data_label="Registration Source"
                                                            data={admissionSources}
                                                            value={
                                                                data.source_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "source_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.source_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="reference_by"
                                                            value="Reference By"
                                                        />
                                                        <SelectInput
                                                            id="reference_by"
                                                            data_label="Reference By"
                                                            data={referenceTypeArr}
                                                            value={
                                                                data.reference_by
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "reference_by",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.reference_by
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                {/* reference by start */}
                                                {data.reference_by ===
                                                    "Staff" ? (
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="staff_id"
                                                                value="Select Staff"
                                                            />
                                                            <SelectInput
                                                                id="staff_id"
                                                                data_label="Staff"
                                                                data={staffs}
                                                                value={
                                                                    data.staff_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "staff_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.staff_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {data.reference_by ===
                                                    "Alumni" ? (
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="reference_by_alumni"
                                                                value="Select Alumni"
                                                            />
                                                            <SelectInput
                                                                id="reference_by_alumni"
                                                                data_label="Alumni"
                                                                data={alumniTypeArr}
                                                                value={
                                                                    data.reference_by_alumni
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "reference_by_alumni",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.reference_by_alumni
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {data.reference_by ===
                                                    "Parent" ? (
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="reference_by_parent"
                                                                value="Select Parent"
                                                            />
                                                            <TextInput
                                                                id="reference_by_parent"
                                                                value={
                                                                    data.reference_by_parent
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "reference_by_parent",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                                placeHolder="Enter Parent Name, Mobile no. or Ref. note"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.reference_by_parent
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {/* payment mode end */}
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="employment_category_id"
                                                            value="Employment"
                                                        />
                                                        <SelectInput
                                                            id="employment_category_id"
                                                            data_label="employment category"
                                                            data={catEmps}
                                                            value={data.employment_category_id}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "employment_category_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.employment_category_id
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

                                {/* Sibling Details start*/}
                                { (data?.is_have_sibling == true && selectedSibling?.id != null) &&
                                    <div className="educare-create-school-details-form-wrap">
                                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                            <div className="educare-school-form-action-title">
                                                <h5>
                                                    <i className="icon-user"></i>
                                                    Sibling Details
                                                </h5>
                                            </div>
                                            <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                                        <div className="educare-admission-list-area">
                                                            <div className="educare-admission-list-inner">
                                                                <div className="educare-admission-list-inner-wrapper">
                                                                    <div className="educare-admission-list">
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Name</th>
                                                                                    <th>Class</th>
                                                                                    <th>Roll No.</th>
                                                                                    <th>Admission No.</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>{`${selectedSibling?.first_name ?? ""} ${selectedSibling?.middle_name ?? ""} ${selectedSibling?.last_name ?? ""}`}</td>
                                                                                    <td>{selectedSibling?.classroom?.title ?? ""}</td>
                                                                                    <td>{selectedSibling?.classroom_roll?.roll_no ?? ""}</td>
                                                                                    <td>{selectedSibling?.admission_no ?? ""}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {/* Sibling Details end*/}

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
                                                            required
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
                                                            htmlFor="contact_email"
                                                            value="Email"
                                                        />
                                                        <TextInput
                                                            id="contact_email"
                                                            value={data?.contact_email}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "contact_email",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="email"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.contact_email
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
                                                                    e.target
                                                                        .value
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
                                                        <InputLabel
                                                            htmlFor="country_code"
                                                            value="Country Code"
                                                        />
                                                        <TextInput
                                                            id="country_code"
                                                            value={
                                                                data.country_code
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "country_code",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.country_code
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
                                                                    value="Date of registration"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <DatePicker
                                                            selected={regDate}
                                                            onChange={(date) => setRegDate(date)}
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={false}
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            placeholderText="Start date"
                                                            className="w-full"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="form_no"
                                                            value="Form No"
                                                        />
                                                        <TextInput
                                                            id="form_no"
                                                            value={
                                                                data.form_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "form_no",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.form_no
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
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="srn_no"
                                                            value="SRN No."
                                                        />
                                                        <TextInput
                                                            id="srn_no"
                                                            value={data?.srn_no}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "srn_no",
                                                                    e.target
                                                                        .value
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
                                                                    e.target
                                                                        .value
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
                                                                    e.target
                                                                        .value
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
                                                                    e.target
                                                                        .value
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
                                                                    e.target
                                                                        .value
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
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-checkbox-field-styles">
                                                        <InputLabel
                                                            htmlFor="is_physically_disabled"
                                                            value="Is Physically Disabled?"
                                                        />
                                                        <Checkbox
                                                            id="is_physically_disabled"
                                                            name="is_physically_disabled"
                                                            checked={
                                                                data.is_physically_disabled
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_physically_disabled",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-checkbox-field-styles">
                                                        <InputLabel
                                                            htmlFor="is_special_child"
                                                            value="Is Special Child (mentally)?"
                                                        />
                                                        <Checkbox
                                                            name="is_special_child"
                                                            id="is_special_child"
                                                            checked={
                                                                data.is_special_child
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_special_child",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-checkbox-field-styles">
                                                        <InputLabel
                                                            htmlFor="conomically_weaker_section"
                                                            value="Is this student falls in EWS category?"
                                                        />
                                                        <Checkbox
                                                            name="conomically_weaker_section"
                                                            id="conomically_weaker_section"
                                                            checked={
                                                                data.conomically_weaker_section
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "conomically_weaker_section",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {customFieldData?.filter(item => item?.form_section == 'Student Details For Registration')?.map((item, index) => (
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
                                                <i className="icon-FileText"></i>
                                                Service Availed
                                            </h5>
                                        </div>
                                        <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="boarding_scholar"
                                                            value="Day Schollar/Boarding"
                                                        />
                                                        <SelectInput
                                                            id="boarding_scholar"
                                                            data_label="Schollar"
                                                            data={schBoaArr}
                                                            value={
                                                                data.boarding_scholar
                                                            }
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
                                                {/* <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-checkbox-field-styles">
                                                        <InputLabel
                                                            htmlFor="is_transport_availed"
                                                            value="Transport Availed ?"
                                                        />
                                                        <Checkbox
                                                            id="is_transport_availed"
                                                            name="is_transport_availed"
                                                            checked={
                                                                data.is_transport_availed
                                                            }
                                                            onChange={(e) =>
                                                                handleAttachedFile(
                                                                    "Transport availed",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* service availed */}

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
                                                                Image size
                                                                allowed upto -{" "}
                                                                <span className="text-danger">
                                                                    1Mb
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className="educare-student-parent-profile-images-wrap flex flex-wrap gap-x-5 justify-between">
                                                            <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                                <h6>
                                                                    Student
                                                                    Photo
                                                                </h6>
                                                                <label htmlFor="student_image">
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
                                                                            id="student_image"
                                                                            type="file"
                                                                            name="student_image"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "student_image",
                                                                                    e
                                                                                        .target
                                                                                        .files[0]
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                                <h6>
                                                                    Father Photo
                                                                </h6>
                                                                <label htmlFor="father_image">
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
                                                                            id="father_image"
                                                                            type="file"
                                                                            name="father_image"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "father_image",
                                                                                    e
                                                                                        .target
                                                                                        .files[0]
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                                <h6>
                                                                    Mother Photo
                                                                </h6>
                                                                <label htmlFor="mother_image">
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
                                                                            id="mother_image"
                                                                            type="file"
                                                                            name="mother_image"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "mother_image",
                                                                                    e
                                                                                        .target
                                                                                        .files[0]
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="educare-student-parent-profile-image w-[47%] maxXs:w-full">
                                                                <h6>
                                                                    Guardian
                                                                    Photo
                                                                </h6>
                                                                <label htmlFor="guardian_image">
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
                                                                            id="guardian_image"
                                                                            type="file"
                                                                            name="guardian_image"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "guardian_image",
                                                                                    e
                                                                                        .target
                                                                                        .files[0]
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div> */}
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
                                                            htmlFor="school_name"
                                                            value="School Name"
                                                        />
                                                        <TextInput
                                                            id="school_name"
                                                            value={
                                                                data?.school_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "school_name",
                                                                    e.target
                                                                        .value
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
                                                                data?.school_class
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "school_class",
                                                                    e.target
                                                                        .value
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
                                                            value={
                                                                data?.school_year
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "school_year",
                                                                    e.target
                                                                        .value
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
                                                            value="TC Number"
                                                        />
                                                        <TextInput
                                                            id="tc_no"
                                                            value={
                                                                data.tc_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "tc_no",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.tc_no
                                                            }
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
                                                            value={
                                                                data.referred_by
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "referred_by",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.referred_by
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* prev school end */}
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
                                        <div className="inline-flex gap-5">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="is_have_sibling"
                                                        value="Have sibling ?"
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="is_have_sibling"
                                                        name="is_have_sibling"
                                                        checked={
                                                            data.is_have_sibling
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "is_have_sibling",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {data.is_have_sibling === true ?
                                                <button onClick={(e) => handelAddSibling(e)} className="educare-secondary-btn-md-stroke" type="button">Add Sibling</button>
                                                : ""}
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
                                                    {/* <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="father_email"
                                                                value="Email"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div> */}
                                                    <InputLabel
                                                        htmlFor="father_email"
                                                        value="Email"
                                                    />
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
                                                        // required
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
                                                    {/* <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="father_sms_number"
                                                                value="SMS Number"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div> */}
                                                    <InputLabel
                                                        htmlFor="father_sms_number"
                                                        value="SMS Number"
                                                    />
                                                    <TextInput
                                                        id="father_sms_number"
                                                        // required
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
                                                        htmlFor="father_department"
                                                        value="Department"
                                                    />
                                                    <TextInput
                                                        id="father_department"
                                                        value={
                                                            data.father_department
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_department",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_department
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="father_designation"
                                                        value="Designation"
                                                    />
                                                    <TextInput
                                                        id="father_designation"
                                                        value={
                                                            data.father_designation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_designation",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_designation
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
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="father_company_name"
                                                        value="Company Name"
                                                    />
                                                    <TextInput
                                                        id="father_company_name"
                                                        value={
                                                            data.father_company_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_company_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_company_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="father_office_address"
                                                        value="Office Address"
                                                    />
                                                    <TextInput
                                                        id="f_office_address"
                                                        value={
                                                            data.father_office_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_office_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.father_office_address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            {customFieldData?.filter(item => item?.form_section == 'Father Details For Registration')?.map((item, index) => (
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
                                                                htmlFor="mother_first_name: "
                                                                value="First Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="mother_first_name: "
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
                                                        required
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
                                                        htmlFor="mother_department"
                                                        value="Department"
                                                    />
                                                    <TextInput
                                                        id="mother_department"
                                                        value={
                                                            data.mother_department
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_department",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mother_department
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="mother_designation"
                                                        value="Designation"
                                                    />
                                                    <TextInput
                                                        id="m_designation"
                                                        value={
                                                            data.mother_designation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_designation",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mother_designation
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
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="mother_company_name"
                                                        value="Company Name"
                                                    />
                                                    <TextInput
                                                        id="mother_company_name"
                                                        value={
                                                            data.mother_company_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_company_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mother_company_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="mother_office_address"
                                                        value="Office Address"
                                                    />
                                                    <TextInput
                                                        id="m_office_address"
                                                        value={
                                                            data.mother_office_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_office_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mother_office_address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            {customFieldData?.filter(item => item?.form_section == 'Mother Details For Registration')?.map((item, index) => (
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
                                                        htmlFor="taluka"
                                                        value="Taluka"
                                                    />
                                                    <TextInput
                                                        id="taluka"
                                                        value={
                                                            data?.taluka
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "taluka",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.taluka
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="district"
                                                        value="District"
                                                    />
                                                    <TextInput
                                                        id="district"
                                                        value={
                                                            data.district
                                                        }
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
                                                        message={
                                                            errors?.district
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

                                            {customFieldData?.filter(item => item?.form_section == 'Present Address For Registration')?.map((item, index) => (
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
                                                            Same As Present
                                                            Address
                                                        </h6>
                                                    </div>
                                                    <div className="educare-create-school-settings-list-check">
                                                        <label className="inline-block">
                                                            <Checkbox
                                                                name="student_present_same"
                                                                onClick={(e) =>
                                                                    handlePresentPermanent(
                                                                        e
                                                                    )
                                                                }
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

                                            {customFieldData?.filter(item => item?.form_section == 'Permanent Address For Registration')?.map((item, index) => (
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
                                    <div
                                        className={`educare-school-form-action-title ${cardActive2 ? "" : "pb-0"
                                            }`}
                                    >
                                        <h5>
                                            <i className="icon-Buildings"></i>
                                            Sibling's Details
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
                                                    <InputLabel
                                                        htmlFor="sibling_name"
                                                        value="Name"
                                                    />
                                                    <TextInput
                                                        id="sibling_name"
                                                        value={
                                                            data.sibling_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sibling_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.sibling_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="sibling_std"
                                                        value="Std."
                                                    />
                                                    <TextInput
                                                        id="sibling_std"
                                                        value={
                                                            data.sibling_std
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sibling_std",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.sibling_std
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="sibling_adm_no"
                                                        value="Adm No."
                                                    />
                                                    <TextInput
                                                        id="sibling_adm_no"
                                                        value={
                                                            data.sibling_adm_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sibling_adm_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.sibling_adm_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="sibling_year"
                                                        value="Year"
                                                    />
                                                    <TextInput
                                                        id="sibling_year"
                                                        value={
                                                            data.sibling_year
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sibling_year",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.sibling_year
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* siblings details form end */}
                        </div>
                    </div>
                    <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
                        <PrimaryButton
                            disabled={processing}
                            type="button"
                            className="educare-gray-btn-lg-stroke"
                            onClick={handleReset}
                        >
                            Reset
                        </PrimaryButton>

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
            <AddSiblingPopupForm
                students={students}
                editSiblingPopupOpen={editSiblingPopupOpen}
                setSiblingEditPopupOpen={setSiblingEditPopupOpen}
                enquiry={enquiry}
                formData={data}
                setFormData={setData}
                setSelectedSibling={setSelectedSibling}
                selectedSibling={selectedSibling}
            />
            {/* <CheckSiblingPopupForm
                data={data}
                setData={setData}
                onSelectStudents={handleSelectStudents}
                siblingData={siblingData}
                editSiblingPopupOpen={editSiblingPopupOpen}
                setSiblingEditPopupOpen={setSiblingEditPopupOpen}
            /> */}
        </>
    );
};

export default CreateAdmissionForm;
