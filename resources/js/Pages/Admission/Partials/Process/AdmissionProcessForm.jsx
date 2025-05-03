import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import RadioInput from "@/Components/RadioInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const AdmissionProcessForm = ({ data = '', setData = '' }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // const {
    //     data,
    //     setData,
    //     errors,
    //     post,
    //     reset,
    //     processing,
    //     recentlySuccessful,
    // } = useForm({
    //     admission_title: "",
    //     registration_seed: "",
    //     start_date_at: "",
    //     end_date_at: "",
    //     contact_email: "",
    //     contact_mobile: "",
    //     is_open_or_close: "",
    //     is_current: "",
    //     is_online_registration: "",
    // });
    // const admissionProcessData = (e) => {
    //     e.preventDefault();
    //     data.start_date_at = startDate;
    //     data.end_date_at = endDate;

    //     post(route("admission.process.save"), {
    //         preserveScroll: true,
    //         onSuccess: () => reset(),
    //         onError: (errors) => { },
    //     });
    // };

    return (
        <div className="educare-common-card">
            <form onSubmit={admissionProcessData}>
                <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="admission_title"
                                                value="Admission Title"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="admission_title"
                                        value={data.admission_title}
                                        onChange={(e) =>
                                            setData(
                                                "admission_title",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.admission_title}
                                        className="mt-2"
                                    />

                                    <input
                                        name="academic_year_id"
                                        value="hiddenValue"
                                        type="hidden"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="registration_seed"
                                        value="Registration Seed"
                                    />
                                    <TextInput
                                        id="registration_seed"
                                        value={data.registration_seed}
                                        onChange={(e) =>
                                            setData(
                                                "registration_seed",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.registration_seed}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel value="Start Date" />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Start date"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel value="End Date" />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="End Date"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="contact_email"
                                        value="Contact Email"
                                    />
                                    <TextInput
                                        id="contact_email"
                                        value={data.contact_email}
                                        onChange={(e) =>
                                            setData(
                                                "contact_email",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.contact_email}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="contact_mobile"
                                        value="Contact mobile"
                                    />
                                    <TextInput
                                        id="contact_mobile"
                                        value={data.contact_mobile}
                                        onChange={(e) =>
                                            setData(
                                                "contact_mobile",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.contact_mobile}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                <div className="educare-create-school-settings-list-check">
                                    <div className="educare-radio-field-styles flex gap-3">
                                        <RadioInput
                                            name="is_open_or_close"
                                            value="Open"
                                            checked={
                                                data.is_open_or_close === "open"
                                            }
                                            onChange={() =>
                                                setData(
                                                    "is_open_or_close",
                                                    "open"
                                                )
                                            }
                                        />
                                        <RadioInput
                                            name="is_open_or_close"
                                            value="Close"
                                            checked={
                                                data.is_open_or_close ===
                                                "close"
                                            }
                                            onChange={() =>
                                                setData(
                                                    "is_open_or_close",
                                                    "close"
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                <div className="flex flex-wrap gap-5 sm:gap-x-10">
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="is_current"
                                                value="Is Current :"
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="is_current"
                                                name="is_current"
                                                checked={data.is_current}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_current",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="is_online_registration"
                                                value="Is Online Registration without Payment :"
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="is_online_registration"
                                                name="is_online_registration"
                                                checked={
                                                    data.is_online_registration
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "is_online_registration",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdmissionProcessForm;
