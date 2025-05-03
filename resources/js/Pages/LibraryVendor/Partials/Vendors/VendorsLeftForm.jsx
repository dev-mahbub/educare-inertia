import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

const VendorsLeftForm = ({ vendor }) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        id: "",
        vendor_name: "",
        company_name: "",
        email: "",
        website: "",
        contact_no: "",
        contact_no_two: "",
        company_address: "",
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("library_vendor.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    useEffect(() => {
        setData(vendor);
    }, [vendor]);

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('library_vendor.list'));
    }

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Vendor Details
                    </h5>
                </div>
                <form onSubmit={handleFormDataInsert}>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="vendor_name"
                                                value="Vendor Name"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="vendor_name"
                                        value={data.vendor_name}
                                        onChange={(e) =>
                                            setData(
                                                "vendor_name",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.vendor_name}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="company_name"
                                        value="Company Name"
                                    />
                                    <TextInput
                                        id="company_name"
                                        value={data.company_name}
                                        onChange={(e) =>
                                            setData(
                                                "company_name",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.company_name}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="block"
                                        type="email"

                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="website"
                                        value="Website"
                                    />
                                    <TextInput
                                        id="website"
                                        value={data.website}
                                        onChange={(e) =>
                                            setData("website", e.target.value)
                                        }
                                        className="block"
                                        type="url"
                                    />
                                    <InputError
                                        message={errors.website}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="contact_no"
                                        value="Contact No.1"
                                    />
                                    <TextInput
                                        id="contact_no"
                                        value={data.contact_no}
                                        onChange={(e) =>
                                            setData(
                                                "contact_no",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        type="number"
                                    />
                                    <InputError
                                        message={errors.contact_no}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="contact_no_two"
                                        value="Contact No.2"
                                    />
                                    <TextInput
                                        id="contact_no_two"
                                        value={data.contact_no_two}
                                        onChange={(e) =>
                                            setData(
                                                "contact_no_two",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        type="number"
                                    />
                                    <InputError
                                        message={errors.contact_no_two}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="company_address"
                                        value="Company Address"
                                    />
                                    <TextareaInput
                                        id="company_address"
                                        value={data.company_address}
                                        onChange={(e) =>
                                            setData(
                                                "company_address",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        type="text"
                                    />
                                    <InputError
                                        message={errors.company_address}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <PrimaryButton onClick={(e) => handleReset(e)} disabled={processing} type="button" className="educare-gray-btn-lg-stroke">
                                        Reset
                                    </PrimaryButton>
                                    <PrimaryButton disabled={processing} type="submit" className="educare-primary-btn-lg-fill">
                                        {data?.id ? 'Update' : 'Save'}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorsLeftForm;
