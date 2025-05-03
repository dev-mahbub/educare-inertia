import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import CompanyList from "../List/CompanyList";

export default function EditCompanyForm({
    company,
    companies,
    search,
}) {

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        title: company?.title,
        mobile: company?.mobile,
        email: company?.email,
        address: company?.address,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            title: company?.title,
            mobile: company?.mobile,
            email: company?.email,
            address: company?.address
        }));
    }, [company]);

    const handleFormDataUpdate = (e) => {
        e.preventDefault();
        put(route("company.update", company?.id), data, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-7 xl:col-span-7 col-span-12">
                        <CompanyList
                            companies={companies}
                            search={search}
                            editedItemId={company?.id}
                        />
                    </div>
                    <div className="lg:col-span-5 xl:col-span-5 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Update company details
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataUpdate}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        <div className="grid grid-cols-12 gap-5">

                                            {/* start field */}
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Company name"
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
                                            <div className="flex">
                                                <PrimaryButton
                                                    type="submit"
                                                    disabled={processing}
                                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                >
                                                    Update
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
