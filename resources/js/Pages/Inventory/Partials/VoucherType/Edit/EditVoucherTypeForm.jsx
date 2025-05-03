import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import VoucherTypeList from "../List/VoucherTypeList";


export default function EditVoucherTypeForm({ voucher, vouchers, voucherTypeArr = [], vendors = [] }) {

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        vendor_id: voucher.company_id,
        title: voucher.title,
        sub_type: voucher.sub_type,
        description: voucher.description,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            vendor_id: voucher?.company_id,
            title: voucher?.title,
            sub_type: voucher?.sub_type,
            description: voucher?.description
        }));
    }, [voucher]);

    const handleFormDataUpdate = (e) => {
        e.preventDefault();
        put(route("product_voucher_type.update", voucher.id), data, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <VoucherTypeList vouchers={vouchers} editedItemId={voucher.id} />
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Edit voucher type
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataUpdate}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Title"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="title"
                                                        value={data?.title}
                                                        onChange={(e) =>
                                                            setData("title", e.target.value)
                                                        }
                                                        type="text"
                                                        className="block"
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sub_type"
                                                                value="Base type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        id="sub_type"
                                                        data_label="base type"
                                                        data={voucherTypeArr}
                                                        value={
                                                            data.sub_type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sub_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.sub_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="vendor_id"
                                                                value="Company"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        id="vendor_id"
                                                        data_label="company"
                                                        data={vendors}
                                                        value={
                                                            data.vendor_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "vendor_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.vendor_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Description"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextareaInput
                                                        id="description"
                                                        value={data?.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex justify-end">
                                                <PrimaryButton
                                                    type="submit"
                                                    disabled={processing}
                                                    className="educare-primary-btn-md-fill"
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
