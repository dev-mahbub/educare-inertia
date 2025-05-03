import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import React from 'react';

const EditparentprofileForm = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        //My Details field
        first_name: "",
        middle_name: "",
        last_name: "",
        type_email: "",
        mobile_num: "",
        highest_qualification: "",
        type_occupation: "",
        company_name: "",
        type_department: "",
        card_number: "",
        pan_card_no: "",
        //Spouse Details field
        sp_first_name: "",
        sp_last_name: "",
        sp_type_email: "",
        sp_mobile_num: "",
        sp_highest_qualification: "",
        sp_type_occupation: "",
        sp_company_name: "",
        sp_type_department: "",
        sp_card_number: "",
        sp_pan_card_number: "",
        //Present Address field
        pa_address: "",
        pa_city: "",
        pa_select_state: "",
        pa_pin_code: "",
        //Permanent Address field
        per_address: "",
        per_city: "",
        per_select_state: "",
        per_pin_code: "",

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
                <div className="grid grid-cols-12 gap-5 font-primary">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        My Details
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
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
                                                    value={
                                                        data.first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.first_name
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
                                                        data.middle_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "middle_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.middle_name
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
                                                        data.last_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.last_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="type_email"
                                                    value="Email"
                                                />
                                                <TextInput
                                                    id="type_email"
                                                    value={
                                                        data.type_email
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "type_email",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.type_email
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="mobile_num"
                                                    value="Mobile"
                                                />
                                                <TextInput
                                                    id="mobile_num"
                                                    value={
                                                        data.mobile_num
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "mobile_num",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.mobile_num
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="highest_qualification"
                                                    value="Highest Qualification"
                                                />
                                                <TextInput
                                                    id="highest_qualification"
                                                    value={
                                                        data.highest_qualification
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "highest_qualification",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.highest_qualification
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="type_occupation"
                                                    value="Occupation"
                                                />
                                                <TextInput
                                                    id="type_occupation"
                                                    value={
                                                        data.type_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "type_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.type_occupation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="company_name"
                                                    value="Company Name"
                                                />
                                                <TextInput
                                                    id="company_name"
                                                    value={
                                                        data.company_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "company_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.company_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="type_department"
                                                    value="Department"
                                                />
                                                <TextInput
                                                    id="type_department"
                                                    value={
                                                        data.type_department
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "type_department",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.type_department
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="card_number"
                                                    value="Aadhar Card No."
                                                />
                                                <TextInput
                                                    id="card_number"
                                                    value={
                                                        data.card_number
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "card_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.card_number
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="pan_card_no"
                                                    value="Pan Card No."
                                                />
                                                <TextInput
                                                    id="pan_card_no"
                                                    value={
                                                        data.pan_card_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "pan_card_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.pan_card_no
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
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        Spouse Details
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_first_name"
                                                    value="First Name"
                                                />
                                                <TextInput
                                                    id="sp_first_name"
                                                    value={
                                                        data.sp_first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_last_name"
                                                    value="Last Name"
                                                />
                                                <TextInput
                                                    id="sp_last_name"
                                                    value={
                                                        data.sp_last_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_middle_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_type_email"
                                                    value="Email"
                                                />
                                                <TextInput
                                                    id="sp_type_email"
                                                    value={
                                                        data.sp_type_email
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_type_email",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_type_email
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_mobile_num"
                                                    value="Mobile"
                                                />
                                                <TextInput
                                                    id="sp_mobile_num"
                                                    value={
                                                        data.sp_mobile_num
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_mobile_num",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_mobile_num
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_highest_qualification"
                                                    value="Highest Qualification"
                                                />
                                                <TextInput
                                                    id="sp_highest_qualification"
                                                    value={
                                                        data.sp_highest_qualification
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_highest_qualification",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_highest_qualification
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_type_occupation"
                                                    value="Occupation"
                                                />
                                                <TextInput
                                                    id="sp_type_occupation"
                                                    value={
                                                        data.sp_type_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_type_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_type_occupation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_company_name"
                                                    value="Company Name"
                                                />
                                                <TextInput
                                                    id="sp_company_name"
                                                    value={
                                                        data.sp_company_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_company_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_company_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_type_department"
                                                    value="Department"
                                                />
                                                <TextInput
                                                    id="sp_type_department"
                                                    value={
                                                        data.sp_type_department
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_type_department",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_type_department
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_card_number"
                                                    value="Aadhar Card No."
                                                />
                                                <TextInput
                                                    id="sp_card_number"
                                                    value={
                                                        data.sp_card_number
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_card_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_card_number
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_pan_card_number"
                                                    value="Pan Card No."
                                                />
                                                <TextInput
                                                    id="sp_pan_card_number"
                                                    value={
                                                        data.sp_pan_card_number
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_pan_card_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_pan_card_number
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
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        Present Address
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="pa_address"
                                                    value="Address"
                                                />
                                                <TextInput
                                                    id="pa_address"
                                                    value={
                                                        data.pa_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "pa_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.pa_address
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="pa_city"
                                                    value="City"
                                                />
                                                <TextInput
                                                    id="pa_city"
                                                    value={
                                                        data.pa_city
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "pa_city",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.pa_city
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="pa_select_state"
                                                    value="State"
                                                />
                                                <SelectInput
                                                    id="pa_select_state"
                                                    data_label="State"
                                                    data={[]}
                                                    value={
                                                        data.pa_select_state
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "pa_select_state",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.pa_select_state
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="pa_pin_code"
                                                    value="Pin Code"
                                                />
                                                <TextInput
                                                    id="pa_pin_code"
                                                    value={
                                                        data.pa_pin_code
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "pa_pin_code",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.pa_pin_code
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
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        Permanent Address
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="per_address"
                                                    value="Address"
                                                />
                                                <TextInput
                                                    id="per_address"
                                                    value={
                                                        data.per_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "per_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.per_address
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="per_city"
                                                    value="City"
                                                />
                                                <TextInput
                                                    id="per_city"
                                                    value={
                                                        data.per_city
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "per_city",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.per_city
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="per_select_state"
                                                    value="State"
                                                />
                                                <SelectInput
                                                    id="per_select_state"
                                                    data_label="State"
                                                    data={[]}
                                                    value={
                                                        data.per_select_state
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "per_select_state",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.per_select_state
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="per_pin_code"
                                                    value="Pin Code"
                                                />
                                                <TextInput
                                                    id="per_pin_code"
                                                    value={
                                                        data.per_pin_code
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "per_pin_code",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.per_pin_code
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
                <div className="educare-button-field-styles mt-5 flex flex-wrap gap-4 justify-end">
                    <PrimaryButton
                        className="educare-gray-btn-lg-stroke"
                    >
                        Reset
                    </PrimaryButton>
                    <PrimaryButton
                        className="educare-primary-btn-lg-fill"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default EditparentprofileForm;
