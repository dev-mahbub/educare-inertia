import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import DatePicker from "react-datepicker";
import TextInput from "@/Components/TextInput";

import { useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";

const CreateForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        full_name: "",
        alumni_type: "",
        gender: "",
        phone: "",
        email: "",
        passing_year: "",
        leaving_time: "",
        current_organisation: "",
        designation: "",
        achivment: "",
        address: "",
        zip_code: "",
        city: "",
        state: "",
        country: "",
    });

    const handleForm = (e) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <form onSubmit={handleForm}>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                            {/* personal details */}

                            <>
                                <div className="educare-common-card">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div className="educare-common-card-title">
                                            <h5>
                                                <i className="icon-user"></i>
                                                Personal Details
                                            </h5>
                                        </div>
                                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="full_name"
                                                                    value="Full Name"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="full_name"
                                                            value={
                                                                data.full_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "full_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.full_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="alumni_type"
                                                                    value="Alumni Type"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="alumni_type"
                                                            data_label="Class"
                                                            data={[]}
                                                            value={
                                                                data.alumni_type
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "alumni_type",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.alumni_type
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="gender"
                                                            value="Gender"
                                                        />
                                                        <SelectInput
                                                            id="gender"
                                                            data_label="Class"
                                                            data={[]}
                                                            value={data.gender}
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
                                                                errors.gender
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="select_date"
                                                            value="Date"
                                                        />
                                                        <DatePicker
                                                            selected={
                                                                data?.select_date
                                                                    ? new Date(
                                                                          data?.select_date
                                                                      )
                                                                    : new Date()
                                                            }
                                                            onChange={(date) =>
                                                                setData(
                                                                    "select_date",
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
                                                            placeholderText="Date"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="phone"
                                                            value="Phone Number"
                                                        />
                                                        <TextInput
                                                            id="phone"
                                                            value={data.phone}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "phone",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.phone
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="email"
                                                                    value="Email"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="email"
                                                            value={data.email}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "email",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.email
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="passing_year"
                                                                    value="Year of Passing / Leaving"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="passing_year"
                                                            data_label="Class"
                                                            data={[]}
                                                            value={
                                                                data.passing_year
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "passing_year",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.passing_year
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                {data.alumni_type ===
                                                    "teacher" && (
                                                    <div className="col-span-12 md:col-span-8">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="leaving_time"
                                                                value="Designation At The Time Of Leaving"
                                                            />
                                                            <TextInput
                                                                id="leaving_time"
                                                                value={
                                                                    data.leaving_time
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "leaving_time",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.leaving_time
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {data.alumni_type ===
                                                    "student" && (
                                                    <div className="col-span-12 md:col-span-8">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="leaving_time"
                                                                value="Last School / College Attended"
                                                            />
                                                            <TextInput
                                                                id="leaving_time"
                                                                value={
                                                                    data.leaving_time
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "leaving_time",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.leaving_time
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>

                            {/*end personal details */}

                            {/* employement details */}

                            <>
                                <div className="educare-common-card">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div className="educare-common-card-title">
                                            <h5>
                                                <i className="icon-ShoppingBagOpen"></i>
                                                Employment Details
                                            </h5>
                                        </div>

                                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-12 md:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="current_organisation"
                                                            value="Current Organisation"
                                                        />
                                                        <TextInput
                                                            id="current_organisation"
                                                            value={
                                                                data.current_organisation
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "current_organisation",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.current_organisation
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12 md:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="designation"
                                                            value="Designation"
                                                        />
                                                        <TextInput
                                                            id="designation"
                                                            value={
                                                                data.designation
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "designation",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.designation
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="achivment"
                                                            value="Achievement"
                                                        />
                                                        <TextareaInput
                                                            id="achivment"
                                                            value={
                                                                data.achivment
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "achivment",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.achivment
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>

                            {/* end employement details */}
                        </div>
                        <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                            {/* address */}

                            <>
                                <div className="educare-common-card">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div className="educare-common-card-title">
                                            <h5>
                                                <i className="icon-MapPin"></i>
                                                Address
                                            </h5>
                                        </div>
                                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="country"
                                                            value="Country"
                                                        />
                                                        <SelectInput
                                                            id="country"
                                                            data_label="Class"
                                                            data={[]}
                                                            value={data.country}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "country",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.country
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="state"
                                                            value="State"
                                                        />
                                                        <SelectInput
                                                            id="state"
                                                            data_label="Class"
                                                            data={[]}
                                                            value={data.state}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "state",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.state
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-12 md:col-span-4">
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
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
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

                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="zip_code"
                                                            value="Zip Code"
                                                        />
                                                        <TextInput
                                                            id="zip_code"
                                                            value={
                                                                data.zip_code
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "zip_code",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.zip_code
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="address"
                                                            value="Address"
                                                        />
                                                        <TextareaInput
                                                            id="address"
                                                            value={data.address}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "address",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.address
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 mt-5">
                                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                        <PrimaryButton className="educare-gray-btn-lg-stroke">
                                            Reset
                                        </PrimaryButton>
                                        <PrimaryButton className="educare-primary-btn-lg-fill">
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </>
                            {/* End  address */}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateForm;
