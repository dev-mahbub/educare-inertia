import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import SelectInput2 from "@/Components/SelectInput2";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import infoIcon from "../../../../../images/icon/info.png";
import Checkbox from "@/Components/Checkbox";
import RadioInput from "@/Components/RadioInput";

export default function CreateSchoolForm({ className = '', timezones, countries, states, boards, durations, academicYears }) {
    const [cardActive, setCardActive] = useState(false);
    const [cardActive1, setCardActive1] = useState(false);
    const [cardActive2, setCardActive2] = useState(false);
    const handleToggle = () => {
        setCardActive(!cardActive);
    };
    const handleToggle1 = () => {
        setCardActive1(!cardActive1);
    };
    const handleToggle2 = () => {
        setCardActive2(!cardActive2);
    };

    const [stateData, setStateData] = useState(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        school_name: "",
        country_id: "",
        state_id: "",
        timezone_id: "",
        city: "",
        zip: "",
        phone: "",
        phone_2: "",
        description: "",
        mail: "",
        affiliation_no: "",
        school_number: "",
        udise_code: "",
        display_name_board: "",
        established_at: "",
        medium: "",
        board_id: "",
        android_app_url: "",
        google_business_url: "",
        street_address: "",
        school_key: "",

        //setting
        academic_year_id: "",
        admission_seed: "",
        admission_prefix: "",
        admission_postfix: "",
        ticket_url: "",
        ticket_userid: "",
        ticket_password: "",
        create_homework: "",
        is_email_notify: "",
        is_sms_notify: "",
        is_teacher_reply: "",
        is_teacher_compose: "",
        is_parent_reply: "",
        is_parent_compose: "",
        is_enable_email: "",
        is_attendance_backdate: "",
        is_parent_newsletter: "",
        is_teacher_newsletter: "",
        is_student_roll_softable: "",
        is_class_wise_report: "",
        is_teacher_self_attendance: "",
        is_password_visible: "",
        is_biometric_integration: "",
        is_student_biometric_attendance: "",
        is_view_parent_contact: "",
        is_view_tc_copy: "",
        is_pay_online_fee_voucher: "",
        is_uploaded_photo_app: "",
        is_transport_boarding_student: "",
        is_event_module_teacher_login: "",
        is_allow_upload_document: "",
        is_weekly_status_send_to_parent: "",

        image: "",
        duration: "",
        training_url: "",
        admin_number: "",
        client_name: ""
    });

    const schoolData = (e) => {
        e.preventDefault();
        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // handelCountry
    const handelCountry = (countryId) => {
        setData({
            ...data,
            country_id: countryId,
            state_id: "",
        })
        const filteredState = states?.filter(item => item?.country_id == countryId);
        setStateData(filteredState);
    }

    // handelBoard
    const handelBoard = (boardId) => {
        const filteredBoard = boards?.find(item => item?.id == boardId);
        if (filteredBoard) {
            setData({
                ...data,
                board_id: boardId,
                display_name_board: filteredBoard?.full_name,
            });
        } else {
            setData({
                ...data,
                board_id: "",
                display_name_board: "",
            });
        }

    }

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={schoolData}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="lg:col-span-5 col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i>
                                                <img src={infoIcon} alt="" />
                                            </i>
                                            Set school details
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="school_name"
                                                        value="School Name*"
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
                                                        message={errors.school_name}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-select-field-styles">
                                                    <InputLabel
                                                        htmlFor="country_id"
                                                        value="Country"
                                                    />

                                                    <SelectInput
                                                        id="country_id"
                                                        data_label="Country"
                                                        data={countries}
                                                        onChange={(e) => { handelCountry(e.target.value) }}
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.country_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-select-field-styles">
                                                    <InputLabel
                                                        htmlFor="state_id"
                                                        value="State"
                                                    />

                                                    <SelectInput2
                                                        id="state_id"
                                                        data_label="State"
                                                        data={stateData}
                                                        selectedData={data.state_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "state_id",
                                                                e.target.value
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
                                            <div className="col-span-12">
                                                <div className="educare-select-field-styles">
                                                    <InputLabel
                                                        htmlFor="timezone_id"
                                                        value="Timezone"
                                                    />

                                                    <SelectInput
                                                        id="timezone_id"
                                                        data_label="Timezone"
                                                        data={timezones}
                                                        value={data.timezone}
                                                        onChange={(e) =>
                                                            setData(
                                                                "timezone_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.timezone_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="city"
                                                        value="City"
                                                    />

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
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="zip"
                                                        value="Zip"
                                                    />

                                                    <TextInput
                                                        id="zip"
                                                        value={data.zip}
                                                        onChange={(e) =>
                                                            setData(
                                                                "zip",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={errors.zip}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="clientName"
                                                        value="Client Name"
                                                    />

                                                    <TextInput
                                                        id="clientName"
                                                        value={data.client_name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "client_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={errors.client_name}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="phone"
                                                        value="Phone 1"
                                                    />

                                                    <TextInput
                                                        id="phone"
                                                        value={data.phone}
                                                        onChange={(e) =>
                                                            setData(
                                                                "phone",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={errors.phone}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="phone_2"
                                                        value="Phone 2"
                                                    />

                                                    <TextInput
                                                        id="phone_2"
                                                        value={data.phone_2}
                                                        onChange={(e) =>
                                                            setData(
                                                                "phone_2",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={errors.phone_2}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="mail"
                                                        value="Mail"
                                                    />

                                                    <TextInput
                                                        id="mail"
                                                        value={data.mail}
                                                        onChange={(e) =>
                                                            setData(
                                                                "mail",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={errors.mail}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="affiliation_no"
                                                        value="Affiliation No.*"
                                                    />

                                                    <TextInput
                                                        id="affiliation_no"
                                                        value={
                                                            data.affiliation_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "affiliation_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.affiliation_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="school_number"
                                                        value="School Number*"
                                                    />

                                                    <TextInput
                                                        id="school_number"
                                                        value={
                                                            data.school_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "school_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.school_number
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="udise_code"
                                                        value="UDISE Code"
                                                    />

                                                    <TextInput
                                                        id="udise_code"
                                                        value={data.udise_code}
                                                        onChange={(e) =>
                                                            setData(
                                                                "udise_code",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.udise_code
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-select-field-styles">
                                                    <InputLabel
                                                        htmlFor="display_name_board"
                                                        value="Board Display Name"
                                                    />

                                                    <TextInput
                                                        id="display_name_board"
                                                        value={
                                                            data.display_name_board
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "display_name_board",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.display_name_board
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="established_at"
                                                        value="Established on"
                                                    />

                                                    <TextInput
                                                        id="established_at"
                                                        value={
                                                            data.established_at
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "established_at",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.established_at
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 minMax2Xl:col-span-12 minMaxXl:col-span-12 minMaxLg:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="medium"
                                                        value="Medium of Education"
                                                    />

                                                    <TextInput
                                                        id="medium"
                                                        value={data.medium}
                                                        onChange={(e) =>
                                                            setData(
                                                                "medium",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={errors.medium}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="board_id"
                                                        value="Board"
                                                    />
                                                    <SelectInput
                                                        id="board_id"
                                                        data_label="board"
                                                        data={boards}
                                                        value={data.board_id}
                                                        onChange={(e) => {
                                                            handelBoard(e.target.value);
                                                        }
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.board_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 hidden">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="android_app_url"
                                                        value="Android App Url"
                                                    />
                                                    <TextInput
                                                        id="android_app_url"
                                                        value={
                                                            data.android_app_url
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "android_app_url",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.android_app_url
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 hidden">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="google_business_url"
                                                        value="Google Business Url"
                                                    />
                                                    <TextInput
                                                        id="google_business_url"
                                                        value={
                                                            data.google_business_url
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "google_business_url",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.google_business_url
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 hidden">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="street_address"
                                                        value="Address"
                                                    />
                                                    <TextInput
                                                        id="street_address"
                                                        value={
                                                            data.street_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "street_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.street_address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 hidden">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Description"
                                                    />
                                                    <TextareaInput
                                                        id="description"
                                                        value={
                                                            data.description
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.street_address
                                                        }
                                                        className="mt-2"
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school details form start */}

                            {/* web message form start */}
                            <div className="educare-web-message-configure-wrapper hidden">
                                <div className="educare-web-message-configure-wrap bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pb-[26px] pt-[24px] rounded-lg maxXs:p-[15px] mb-5">
                                    <div className={`educare-school-form-action-title ${cardActive1 ? '' : 'pb-0'}`}>
                                        <h5 onClick={handleToggle1}>
                                            <i className={`${cardActive1 ? 'icon-minus' : 'icon-plus'}`}></i>
                                            Web message configaration setting
                                        </h5>
                                    </div>
                                    <div className={`educare-web-message-configure flex flex-col gap-y-6 border-t border-grayLight/20 pt-6 ${cardActive1 ? '' : 'hidden'}`}>
                                        <div>
                                            <div className="educare-web-message-configure-list">
                                                <div className="educare-web-message-configure-list-title">
                                                    <h6>
                                                        Is teacher can reply?
                                                    </h6>
                                                </div>
                                                <div className="educare-web-message-configure-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_teacher_reply"
                                                            checked={
                                                                data.is_teacher_reply
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_teacher_reply",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-web-message-configure-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="educare-web-message-configure-list">
                                                <div className="educare-web-message-configure-list-title">
                                                    <h6>
                                                        Is teacher can compose?
                                                    </h6>
                                                </div>
                                                <div className="educare-web-message-configure-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_teacher_compose"
                                                            checked={
                                                                data.is_teacher_compose
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_teacher_compose",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-web-message-configure-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="educare-web-message-configure-list">
                                                <div className="educare-web-message-configure-list-title">
                                                    <h6>
                                                        Is parent can reply?
                                                    </h6>
                                                </div>
                                                <div className="educare-web-message-configure-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_parent_reply"
                                                            checked={
                                                                data.is_parent_reply
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_parent_reply",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-web-message-configure-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="educare-web-message-configure-list">
                                                <div className="educare-web-message-configure-list-title">
                                                    <h6>
                                                        Is parent can compose?
                                                    </h6>
                                                </div>
                                                <div className="educare-web-message-configure-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_parent_compose"
                                                            checked={
                                                                data.is_parent_compose
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_parent_compose",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-web-message-configure-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="educare-web-message-configure-list">
                                                <div className="educare-web-message-configure-list-title">
                                                    <h6>
                                                        Web notification setting
                                                    </h6>
                                                </div>
                                                <div className="educare-web-message-configure-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="is_sms_notify"
                                                            value="On"
                                                            checked={data.is_sms_notify === "On"}
                                                            onChange={(e) => setData("is_sms_notify", "On")}
                                                        />
                                                        <RadioInput
                                                            name="is_sms_notify"
                                                            value="Off"
                                                            checked={data.is_sms_notify === "Off"}
                                                            onChange={(e) => setData("is_sms_notify", "Off")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-web-message-configure-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* web message form end */}
                        </div>
                    </div>
                    <div className="lg:col-span-7 col-span-12">
                        <div className="educare-upload-school-logo-wrap mb-3">
                            <div className="educare-upload-school-logo bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pb-[26px] pt-[24px] maxXs:p-[15px] rounded-lg maxXs:mb-5">
                                <div>
                                    <div className={`educare-school-form-action-title ${cardActive ? 'mb-6 border-b border-grayLight/20' : 'mb-0 pb-0'}`}>
                                        <h5 onClick={handleToggle}>
                                            <i className={`${cardActive ? 'icon-minus' : 'icon-plus'}`}></i>
                                            Upload School logo
                                        </h5>
                                    </div>
                                    <div className={`educare-upload-school-logo-list max3Xl:flex-wrap ${cardActive ? '' : 'hidden'}`}>
                                        <div className="educare-upload-school-logo-list-drag">
                                            <label>
                                                <input
                                                    id="image"
                                                    type="file"
                                                    name="image"
                                                    onChange={(e) =>
                                                        setData("image", e.target.files[0])
                                                    }
                                                    className={
                                                        'rounded border-border text-primary shadow-sm translate-y-[-1px] focus:ring-primary' +
                                                        className
                                                    } />
                                            </label>
                                        </div>
                                        <div className="educare-upload-school-logo-list-btn">
                                            <div className="educare-button-field-styles hidden">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    className="h-[40px] bg-primary/20 text-primary text-[16px] rounded-md font-medium px-4 font-primary inline-block"
                                                >
                                                    Upload logo
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                        <div className="educare-upload-school-logo-list-success">
                                            <i className="icon-check-1 inline-block hidden"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-create-school-settings">
                            {/* school setting form start */}
                            <div className="educare-create-school-settings-form-wrap">
                                <div className="educare-create-school-settings-wrap bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pb-[26px] pt-[24px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i>
                                                <img src={infoIcon} alt="" />
                                            </i>
                                            Set school setting
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-settings flex flex-col gap-y-6 border-t border-grayLight/20 pt-6">
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>School key *</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="school_key"
                                                            value={data.school_key}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "school_key",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.school_key
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="educare-button-field-styles mt-2.5">
                                                <PrimaryButton
                                                    type="submit"
                                                    disabled={processing}
                                                    className="h-12 bg-primary text-white text-[16px] rounded-md font-medium px-6 font-primary inline-block"
                                                >
                                                    Save
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Current academic year*
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-select-field-styles">
                                                        <SelectInput
                                                            id="academic_year_id"
                                                            data_label="academic year"
                                                            data={academicYears}
                                                            value={
                                                                data.academic_year_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "academic_year_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
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
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Admission seed*</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="admission_seed"
                                                            value={
                                                                data.admission_seed
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "admission_seed",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.admission_seed
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Admission prefix*</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="admission_prefix"
                                                            value={
                                                                data.admission_prefix
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "admission_prefix",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.admission_prefix
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Admission postfix*</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="admission_postfix"
                                                            value={
                                                                data.admission_postfix
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "admission_postfix",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.admission_postfix
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Ticket url*</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="ticket_url"
                                                            value={
                                                                data.ticket_url
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ticket_url",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.ticket_url
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Ticket userid</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="ticket_userid"
                                                            value={
                                                                data.ticket_userid
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ticket_userid",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.ticket_userid
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Ticket password</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="ticket_password"
                                                            value={
                                                                data.ticket_password
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ticket_password",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.ticket_password
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Is attendance on
                                                        backdate
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_attendance_backdate"
                                                            checked={
                                                                data.is_attendance_backdate
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_attendance_backdate",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Send newsletter to
                                                        parents
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_parent_newsletter"
                                                            checked={
                                                                data.is_parent_newsletter
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_parent_newsletter",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Send newsletter to
                                                        teachers
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_teacher_newsletter"
                                                            checked={
                                                                data.is_teacher_newsletter
                                                            }

                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_teacher_newsletter",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Is student roll no
                                                        sortable
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_student_roll_softable"
                                                            checked={
                                                                data.is_student_roll_softable
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_student_roll_softable",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        All report class wise
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_class_wise_report"
                                                            checked={
                                                                data.is_class_wise_report
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_class_wise_report",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Can see password?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_password_visible"
                                                            checked={
                                                                data.is_password_visible
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_password_visible",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Is biometric integration
                                                        enable
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_biometric_integration"
                                                            checked={
                                                                data.is_biometric_integration
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_biometric_integration",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Is student biometeric
                                                        attendence enable?
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_student_biometric_attendance"
                                                            checked={
                                                                data.is_student_biometric_attendance
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_student_biometric_attendance",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Can teacher see parent
                                                        contact details
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_view_parent_contact"
                                                            checked={
                                                                data.is_view_parent_contact
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_view_parent_contact",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Can show “Duplicate
                                                        copy” text on tc
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_view_tc_copy"
                                                            checked={
                                                                data.is_view_tc_copy
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_view_tc_copy",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Pay online fees through
                                                        either voucher or
                                                        instalment wise
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_pay_online_fee_voucher"
                                                            checked={
                                                                data.is_pay_online_fee_voucher
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_pay_online_fee_voucher",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Do not allow photo
                                                        upload in app
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_uploaded_photo_app"
                                                            checked={
                                                                data.is_uploaded_photo_app
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_uploaded_photo_app",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Allow transport to
                                                        boarding student or
                                                        instalment wise?
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_transport_boarding_student"
                                                            checked={
                                                                data.is_transport_boarding_student
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_transport_boarding_student",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Allow upload document
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_allow_upload_document"
                                                            checked={
                                                                data.is_allow_upload_document
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_allow_upload_document",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Create homework/class
                                                        for classes*
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-select-field-styles">
                                                        <SelectInput
                                                            id="create_homework"
                                                            data_label="All assigned classes of a teacher"
                                                            data={[]}
                                                            value={
                                                                data.create_homework
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "create_homework",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.create_homework
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Admin number</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="admin_number"
                                                            value={data.admin_number}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "admin_number",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.admin_number
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Email enable</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="is_enable_email"
                                                            value="On"
                                                            checked={data.is_enable_email === "On"}
                                                            onChange={(e) => setData("is_enable_email", "On")}
                                                        />
                                                        <RadioInput
                                                            name="is_enable_email"
                                                            value="Off"
                                                            checked={data.is_enable_email === "Off"}
                                                            onChange={(e) => setData("is_enable_email", "Off")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Helpdesk for parents
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <a target="_blank"
                                                        href={route('support_ticket.student_parents_support')}
                                                        className="text-primary font-normal"
                                                    >
                                                        Click here
                                                    </a>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Training url</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="training_url"
                                                            value={data.training_url}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "training_url",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.training_url
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school setting form start */}

                            {/* Email configuration settings start */}
                            <div className="educare-create-school-settings-form-wrap hidden">
                                <div className="educare-create-school-settings-wrap bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pb-[26px] pt-[24px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className={`educare-school-form-action-title ${cardActive2 ? '' : 'pb-0'}`}>
                                        <h5 onClick={handleToggle2}>
                                            <i className={`${cardActive2 ? 'icon-minus' : 'icon-plus'}`}></i>
                                            Set school setting
                                        </h5>
                                    </div>
                                    <div className={`educare-create-school-settings flex flex-col gap-y-6 border-t border-grayLight/20 pt-6 ${cardActive2 ? '' : 'hidden pb-0'}`}>
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Is student weekly status
                                                        send to parent?
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="is_weekly_status_send_to_parent"
                                                            checked={
                                                                data.is_weekly_status_send_to_parent
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_weekly_status_send_to_parent",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Duration
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-select-field-styles">
                                                        <SelectInput
                                                            id="duration"
                                                            data_label="duration"
                                                            data={durations}
                                                            value={data.duration}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "duration",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.duration
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Email configuration settings end */}
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}
