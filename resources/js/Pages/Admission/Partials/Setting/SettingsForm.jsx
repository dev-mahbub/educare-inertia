import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import RadioInput from '@/Components/RadioInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import React from 'react';

const SettingsForm = ({ siteSettingsRegistration = {}, siteSettingsAccount = {}, siteSettingsPayment = {}, siteSettingsAdmission = {} }) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        is_fee_editable: siteSettingsRegistration.is_fee_editable ?? '',
        capitalize_form_input: siteSettingsRegistration.capitalize_form_input ?? '',
        backdate_registration: siteSettingsRegistration.backdate_registration ?? '',
        intregated_account: siteSettingsAccount.intregated_account ?? '',
        payment_gateway: siteSettingsPayment.payment_gateway ?? '',
        page_description: siteSettingsAdmission.page_description ?? '',
        terms_conditions: siteSettingsAdmission.terms_conditions ?? '',
        reg_title: siteSettingsAdmission.reg_title ?? '',
    });

    // const handleRegistrationSettingData = (e) => {
    //     e.preventDefault();
    //     post(route("admission.registration_setting.save"), {
    //         preserveScroll: true,
    //         onSuccess: () => reset()
    //     });
    // };

    const handelChecked = (type, key, value, seedKey) => {

        let key_value_array = [
            { type, key, value }
        ];

        if (seedKey != null) {
            key_value_array.push({ type, key: seedKey, value: data[seedKey] })
        }

        const sendData = { key_value_array };

        router.post(route('academic.settings.save'), sendData);
    }

    return (
        // <form onSubmit={handleRegistrationSettingData}>
        <form>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-settting"></i>
                            Registration Setting
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-create-school-settings-list">
                                            <div className="educare-create-school-settings-list-title">
                                                <h6>Allow registration fee editable</h6>
                                            </div>
                                            <div className="educare-create-school-settings-list-check">
                                                <div className="educare-input-field-stylesr">
                                                    <div className="educare-create-school-settings-list-check">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name="is_fee_editable"
                                                                value="On"
                                                                checked={data.is_fee_editable === "on"}
                                                                onChange={() => setData("is_fee_editable", "on")}
                                                            />
                                                            <RadioInput
                                                                name="is_fee_editable"
                                                                value="Off"
                                                                checked={data.is_fee_editable === "off"}
                                                                onChange={() => setData("is_fee_editable", "off")}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="educare-create-school-settings-list-success">
                                                {data.is_fee_editable !== "" || undefined || null ?
                                                    <i className="icon-check-1 inline-block"></i>
                                                    : ""}
                                            </div> */}
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Registration', 'is_fee_editable', data?.is_fee_editable)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-create-school-settings-list">
                                            <div className="educare-create-school-settings-list-title">
                                                <h6>Capitalize Form Input</h6>
                                            </div>
                                            <div className="educare-create-school-settings-list-check">
                                                <div className="educare-input-field-stylesr">
                                                    <div className="educare-create-school-settings-list-check">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name="capitalize_form_input"
                                                                value="On"
                                                                checked={data.capitalize_form_input === "on"}
                                                                onChange={() => setData("capitalize_form_input", "on")}
                                                            />
                                                            <RadioInput
                                                                name="capitalize_form_input"
                                                                value="Off"
                                                                checked={data.capitalize_form_input === "off"}
                                                                onChange={() => setData("capitalize_form_input", "off")}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Registration', 'capitalize_form_input', data?.capitalize_form_input)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-create-school-settings-list">
                                            <div className="educare-create-school-settings-list-title">
                                                <h6>Allow Backdate Registration</h6>
                                            </div>
                                            <div className="educare-create-school-settings-list-check">
                                                <div className="educare-input-field-stylesr">
                                                    <div className="educare-create-school-settings-list-check">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name="backdate_registration"
                                                                value="On"
                                                                checked={data.backdate_registration === "on"}
                                                                onChange={() => setData("backdate_registration", "on")}
                                                            />
                                                            <RadioInput
                                                                name="backdate_registration"
                                                                value="Off"
                                                                checked={data.backdate_registration === "off"}
                                                                onChange={() => setData("backdate_registration", "off")}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Registration', 'backdate_registration', data?.backdate_registration)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
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
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-settting"></i>
                            Account Setting
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-create-school-settings-list">
                                            <div className="educare-create-school-settings-list-title">
                                                <h6>Registration Integrated with Account</h6>
                                            </div>
                                            <div className="educare-create-school-settings-list-check">
                                                <div className="educare-input-field-stylesr">
                                                    <div className="educare-create-school-settings-list-check">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name="intregated_account"
                                                                value="On"
                                                                checked={data.intregated_account === "on"}
                                                                onChange={() => setData("intregated_account", "on")}
                                                            />
                                                            <RadioInput
                                                                name="intregated_account"
                                                                value="Off"
                                                                checked={data.intregated_account === "off"}
                                                                onChange={() => setData("intregated_account", "off")}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Account', 'intregated_account', data?.intregated_account)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
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
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-settting"></i>
                            Registration Payment Gateway Setting
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-create-school-settings-list">
                                            <div className="educare-create-school-settings-list-title">
                                                <h6>Registration Payment Gateway</h6>
                                            </div>
                                            <div className="educare-create-school-settings-list-check">
                                                <div className="educare-input-field-stylesr">
                                                    <div className="educare-create-school-settings-list-check">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name="payment_gateway"
                                                                value="Enable"
                                                                checked={data.payment_gateway === "enable"}
                                                                onChange={() => setData("payment_gateway", "enable")}
                                                            />
                                                            <RadioInput
                                                                name="payment_gateway"
                                                                value="Disable"
                                                                checked={data.payment_gateway === "disable"}
                                                                onChange={() => setData("payment_gateway", "disable")}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Payment Gateway', 'payment_gateway', data?.payment_gateway)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
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
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">

                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-settting"></i>
                            Admission Content Setting
                        </h5>
                    </div>

                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 ">
                                <div className="grid grid-cols-12 gap-5">

                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="reg_title"
                                                value="Registration title"
                                            />
                                              <div className="educare-list-action-btn my-2 text-end">
                                                <button
                                                    className="educare-success-btn-sm-fill"
                                                    onClick={() => handelChecked('Admission Content', 'reg_title', data?.reg_title)}
                                                    type="button"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </div>
                                            <TextInput
                                                id="reg_title"
                                                value={
                                                    data.reg_title
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "reg_title",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.reg_title
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="page_description"
                                                value="Eligibility criteria page description"
                                            />
                                             <div className="educare-list-action-btn my-2 text-end">
                                                <button
                                                    className="educare-success-btn-sm-fill"
                                                    onClick={() => handelChecked('Admission Content', 'page_description', data?.page_description)}
                                                    type="button"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </div>
                                            <TextareaInput
                                                id="page_description"
                                                value={
                                                    data.page_description
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "page_description",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.page_description
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="terms_conditions"
                                                value="Payment terms and conditions"
                                            />
                                            <div className="educare-list-action-btn my-2 text-end">
                                                <button
                                                    className="educare-success-btn-sm-fill"
                                                    onClick={() => handelChecked('Admission Content', 'terms_conditions', data?.terms_conditions)}
                                                    type="button"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </div>
                                            <TextareaInput
                                                id="terms_conditions"
                                                value={
                                                    data.terms_conditions
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "terms_conditions",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.terms_conditions
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
        </form>
    );
};

export default SettingsForm;