import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";

import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import infoIcon from "../../../../images/icon/info.png";
import Checkbox from "@/Components/Checkbox";
import RadioInput from "@/Components/RadioInput";

export default function SchoolForm({className = ""}) {
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

    const titleInput = useRef();
    const countryInput = useRef();
    const stateInput = useRef();
    const timezoneInput = useRef();
    const cityInput = useRef();
    const zipInput = useRef();
    const phoneInput = useRef();
    const phone2Input = useRef();
    const mailInput = useRef();
    const schoolCodeInput = useRef();
    const schoolNumberInput = useRef();
    const udiseCodeInput = useRef();
    const displayNameBoardInput = useRef();
    const establishedAtInput = useRef();
    const mediumInput = useRef();
    const boardInput = useRef();
    const androidAppUrlInput = useRef();
    const googleBusinessUrlInput = useRef();
    const streetAddressInput = useRef();
    //
    const currentAcademyYearIdInput = useRef();
    const admissionSeedInput = useRef();
    const admissionPrefixInput = useRef();
    const admissionPostfixInput = useRef();
    const ticketUrlInput = useRef();
    const ticketUserIdInput = useRef();
    const ticketPasswordInput = useRef();
    const createHomeworkInput = useRef();
    const imageInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        school_name: "",
        country_id: "",
        state_id: "",
        timezone_id: "",
        city: "",
        zip: "",
        phone: "",
        phone_2: "",
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
        //
        current_academy_year_id: "",
        admission_seed: "",
        admission_prefix: "",
        admission_postfix: "",
        ticket_url: "",
        ticket_user_id: "",
        ticket_password: "",
        create_homework: "",

        //checkox start
        teacher_can_reply: "",
        teacher_compose: "",
        parent_reply: "",
        parent_compose: "",
        attendance_on_backdate: "",
        send_newsletter_parents: "",
        send_newsletter_teachers: "",
        student_roll_sortable: "",
        report_class_wise: "",
        can_see_password: "",
        biometric_integration_enable: "",
        biometeric_attendence_enable: "",
        teacher_see_parent_details: "",
        show_duplicate_copy_text_on_tc: "",
        pay_online_fees_through_either_voucher: "",
        do_not_allow_photo_upload_in_app: "",
        allow_transport_to_boarding_student: "",
        allow_upload_document: "",
        is_student_weekly_status_send_to_parent: "",
        email_enable: "",
        email_enable_a: "",
        notification_enable_on: "",
        notification_enable_off: "",
        image: null,
        //checkox end
    });

    const schoolData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.city) {
                    reset("city", "zip");
                    cityInput.current.focus();
                }

                if (errors.school_name) {
                    reset("school_name");
                    titleInput.current.focus();
                }
            },
        });
    };

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
                                                        ref={titleInput}
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
                                                        data={[]}
                                                        ref={countryInput}
                                                        value={data.country}
                                                        onChange={(e) =>
                                                            setData(
                                                                "country_id",
                                                                e.target.value
                                                            )
                                                        }
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

                                                    <SelectInput
                                                        id="state_id"
                                                        data_label="State"
                                                        data={[]}
                                                        ref={stateInput}
                                                        value={data.state}
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
                                                        data={[]}
                                                        ref={timezoneInput}
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
                                                        ref={cityInput}
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
                                                        ref={zipInput}
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
                                                        htmlFor="phone"
                                                        value="Phone 1"
                                                    />

                                                    <TextInput
                                                        id="phone"
                                                        ref={phoneInput}
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
                                                        ref={phone2Input}
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
                                                        ref={mailInput}
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
                                                        ref={schoolCodeInput}
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
                                                        ref={schoolNumberInput}
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
                                                        ref={udiseCodeInput}
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
                                            <div className="col-span-12">
                                                <div className="educare-select-field-styles">
                                                    <InputLabel
                                                        htmlFor="display_name_board"
                                                        value="Board Display Name"
                                                    />

                                                    <TextInput
                                                        id="display_name_board"
                                                        ref={
                                                            displayNameBoardInput
                                                        }
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
                                                        ref={establishedAtInput}
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
                                                        ref={mediumInput}
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
                                                        data={[]}
                                                        ref={boardInput}
                                                        value={data.board_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "board_id",
                                                                e.target.value
                                                            )
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
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="android_app_url"
                                                        value="Android App Url"
                                                    />
                                                    <TextInput
                                                        id="android_app_url"
                                                        ref={androidAppUrlInput}
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
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="google_business_url"
                                                        value="Google Business Url"
                                                    />
                                                    <TextInput
                                                        id="google_business_url"
                                                        ref={
                                                            googleBusinessUrlInput
                                                        }
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
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="street_address"
                                                        value="Address"
                                                    />
                                                    <TextInput
                                                        id="street_address"
                                                        ref={streetAddressInput}
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school details form start */}

                            {/* web message form start */}
                            <div className="educare-web-message-configure-wrapper">
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
                                                            name="teacher_can_reply"
                                                            checked={
                                                                data.teacher_can_reply
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "teacher_can_reply",
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
                                                            name="teacher_compose"
                                                            checked={
                                                                data.teacher_compose
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "teacher_compose",
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
                                                            name="parent_reply"
                                                            checked={
                                                                data.parent_reply
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "parent_reply",
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
                                                            name="parent_compose"
                                                            checked={
                                                                data.parent_compose
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "parent_compose",
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
                                                            name="notification_enable"
                                                            value="On"
                                                            checked={
                                                                data.notification_enable_on
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "notification_enable_on",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                        <RadioInput
                                                            name="notification_enable"
                                                            value="Off"
                                                            checked={
                                                                data.notification_enable_off
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "notification_enable_off",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
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

                            {/* web message form start */}
                            <div className="educare-upload-school-logo-wrap">
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
                                                    ref={imageInput}
                                                    type="file" 
                                                    name="image"
                                                    onChange={(e) =>
                                                        setData("image", e.target.files[0])
                                                    }
                                                    className={
                                                        'rounded border-border text-primary shadow-sm translate-y-[-1px] focus:ring-primary' +
                                                        className
                                                    }/>
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

                                                    <Transition
                                                        show={
                                                            recentlySuccessful
                                                        }
                                                        enter="transition ease-in-out"
                                                        enterFrom="opacity-0"
                                                        leave="transition ease-in-out"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <p className="text-sm text-gray-600">
                                                            Upload logo
                                                        </p>
                                                    </Transition>
                                                </div>
                                            </div>
                                            <div className="educare-upload-school-logo-list-success">
                                                <i className="icon-check-1 inline-block hidden"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* web message form end */}
                        </div>
                    </div>
                    <div className="lg:col-span-7 col-span-12">
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
                                                    <h6>
                                                        Current academic year*
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-select-field-styles">
                                                        <SelectInput
                                                            id="current_academy_year_id"
                                                            data_label="academic year"
                                                            data={[]}
                                                            ref={
                                                                currentAcademyYearIdInput
                                                            }
                                                            value={
                                                                data.academic_year
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "current_academy_year_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.current_academy_year_id
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
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Admission seed*</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="admission_seed"
                                                            ref={
                                                                admissionSeedInput
                                                            }
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
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Admission prefix*</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="admission_prefix"
                                                            ref={
                                                                admissionPrefixInput
                                                            }
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
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Admission postfix*</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="admission_postfix"
                                                            ref={
                                                                admissionPostfixInput
                                                            }
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
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Ticket url*</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="ticket_url"
                                                            ref={ticketUrlInput}
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
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Ticket userid</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="ticket_user_id"
                                                            ref={
                                                                ticketUserIdInput
                                                            }
                                                            value={
                                                                data.ticket_user_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ticket_user_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />

                                                        <InputError
                                                            message={
                                                                errors.ticket_user_id
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
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Ticket password</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="ticket_password"
                                                            ref={
                                                                ticketPasswordInput
                                                            }
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

                                        <div>
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
                                                            name="attendance_on_backdate"
                                                            checked={
                                                                data.attendance_on_backdate
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "attendance_on_backdate",
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
                                                        Send newsletter to
                                                        parents
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="send_newsletter_parents"
                                                            checked={
                                                                data.send_newsletter_parents
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "send_newsletter_parents",
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
                                                        Send newsletter to
                                                        teachers
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="send_newsletter_teachers"
                                                            checked={
                                                                data.send_newsletter_teachers
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "send_newsletter_teachers",
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
                                                        Is student roll no
                                                        sortable
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="student_roll_sortable"
                                                            checked={
                                                                data.student_roll_sortable
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "student_roll_sortable",
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
                                                        All report class wise
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="report_class_wise"
                                                            checked={
                                                                data.report_class_wise
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "report_class_wise",
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
                                                    <h6>Can see password?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="can_see_password"
                                                            checked={
                                                                data.can_see_password
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "can_see_password",
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
                                                        Is biometric integration
                                                        enable
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="biometric_integration_enable"
                                                            checked={
                                                                data.biometric_integration_enable
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "biometric_integration_enable",
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
                                                        Is student biometeric
                                                        attendence enable?
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="biometeric_attendence_enable"
                                                            checked={
                                                                data.biometeric_attendence_enable
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "biometeric_attendence_enable",
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
                                                        Can teacher see parent
                                                        contact details
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="teacher_see_parent_details"
                                                            checked={
                                                                data.teacher_see_parent_details
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "teacher_see_parent_details",
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
                                                        Can show “Duplicate
                                                        copy” text on tc
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="show_duplicate_copy_text_on_tc"
                                                            checked={
                                                                data.show_duplicate_copy_text_on_tc
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "show_duplicate_copy_text_on_tc",
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
                                                        Pay online fees through
                                                        either voucher or
                                                        instalment wise
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="pay_online_fees_through_either_voucher"
                                                            checked={
                                                                data.pay_online_fees_through_either_voucher
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "pay_online_fees_through_either_voucher",
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
                                                        Do not allow photo
                                                        upload in app
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="do_not_allow_photo_upload_in_app"
                                                            checked={
                                                                data.do_not_allow_photo_upload_in_app
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "do_not_allow_photo_upload_in_app",
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
                                                        Allow transport to
                                                        boarding student or
                                                        instalment wise?
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="allow_transport_to_boarding_student"
                                                            checked={
                                                                data.allow_transport_to_boarding_student
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "allow_transport_to_boarding_student",
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
                                                        Allow upload document
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="allow_upload_document"
                                                            checked={
                                                                data.allow_upload_document
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "allow_upload_document",
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
                                                            ref={
                                                                createHomeworkInput
                                                            }
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
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Admin number</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="city"
                                                            ref={cityInput}
                                                            value={data.city}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "city",
                                                                    e.target
                                                                        .value
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
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Email enable</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="email_enable"
                                                            value="On"
                                                            checked={
                                                                data.email_enable_a
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "email_enable_a",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                        <RadioInput
                                                            name="email_enable"
                                                            value="Off"
                                                            checked={
                                                                data.email_enable
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "email_enable",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>School key *</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="city"
                                                            ref={cityInput}
                                                            value={data.city}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "city",
                                                                    e.target
                                                                        .value
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
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>
                                                        Helpdesk for parents
                                                    </h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <a
                                                        href="#"
                                                        className="text-primary font-normal"
                                                    >
                                                        https://www.figma.com/proto/7o7XocKCEV9p1lqq5WHVov/Educare-study?page-id=0%3A1
                                                    </a>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block hidden"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Training url</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="city"
                                                            ref={cityInput}
                                                            value={data.city}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "city",
                                                                    e.target
                                                                        .value
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
                            <div className="educare-create-school-settings-form-wrap">
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
                                                            name="is_student_weekly_status_send_to_parent"
                                                            checked={
                                                                data.is_student_weekly_status_send_to_parent
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_student_weekly_status_send_to_parent",
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
                                                            id="country_id"
                                                            data_label="duration"
                                                            data={[]}
                                                            ref={countryInput}
                                                            value={data.country}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "country_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
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
                <div className="educare-button-field-styles mt-2.5 text-end">
                    <PrimaryButton
                        disabled={processing}
                        className="h-12 bg-primary text-white text-[16px] rounded-md font-medium px-6 font-primary inline-block"
                    >
                        Save
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
}
