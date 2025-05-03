import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import 'react-toastify/dist/ReactToastify.css';
import CompanyList from "../List/CompanyList";
import TextareaInput from "@/Components/TextareaInput";

export default function CreateCompanyForm({
    companies,
    search,
}) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        title: "",
        mobile: "",
        email: "",
        address: "",
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("company.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-7 xl:col-span-7 col-span-12 order-2 lg:order-1">
                        <CompanyList
                            companies={companies}
                            search={search}
                        />
                    </div>
                    <div className="lg:col-span-5 xl:col-span-5 col-span-12 order-1 lg:order-2">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add company details
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataInsert}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        <div className="grid grid-cols-12 gap-5">

                                            {/* start field */}
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Company Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="title"
                                                        value={
                                                            data.title
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        style={{ borderColor: errors.title ? 'red' : '' }}
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="mobile"
                                                                value="Mobile"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="mobile"
                                                        value={
                                                            data.mobile
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mobile",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mobile
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="email"
                                                                value="Email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="email"
                                                        value={
                                                            data.email
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "email",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="email"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.email
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="address"
                                                                value="Address"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="address"
                                                        value={
                                                            data.address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "address",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="text"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                        </div>

                                        {/* Start Field  */}
                                        <div className="educare-classroom-button-wrapper mt-6">
                                            <div className="flex justify-end">
                                                <PrimaryButton
                                                    type="submit"
                                                    className="educare-primary-btn-lg-fill"
                                                >
                                                    Save
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
