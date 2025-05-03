import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-toastify/dist/ReactToastify.css';
import ConsumptionList from "../List/ConsumptionList";


export default function EditConsumptionForm({ product, products, productTitles = [], vendorTitles = [] }) {

    const [startDate, setStartDate] = useState(new Date(product.date_at));

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        product_id: product.product_id,
        vendor_id: product.vendor_id,
        quantity: product.quantity,
        description: product.description,
        type: product.type,
        date_at: product.date_at,
    });

    const handleFormDataUpdate = (e) => {
        e.preventDefault();
        data.date_at = startDate;
        put(route("product_consumption.update", product.id), data, {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                setStartDate(new Date())
            }
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <ConsumptionList products={products} productId={product.id} />
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Update consumption product
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataUpdate}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 mb-5 gap-5">

                                            {/* Start Field  */}
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="product_id"
                                                                value="Product"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="product_id"
                                                        data_label="product"
                                                        data={productTitles}
                                                        value={data.product_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "product_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.product_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* Start Field  */}

                                            {/* Start Field  */}
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="vendor_id"
                                                                value="Vendor"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="vendor_id"
                                                        data_label="vendor"
                                                        data={vendorTitles}
                                                        value={data.vendor_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "vendor_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.vendor_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* Start Field  */}

                                            {/* Start Field  */}
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="quantity"
                                                                value="Quantity"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="quantity"
                                                        value={data?.quantity}
                                                        onChange={(e) =>
                                                            setData(
                                                                "quantity",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="number"
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.quantity
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* Start Field  */}

                                            {/* Start Field  */}
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="date_at"
                                                                value="Date"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) =>
                                                            setStartDate(date)
                                                        }
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
                                                    <InputError
                                                        message={
                                                            errors.date_at
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* Start Field  */}

                                            {/* Start Field  */}
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="description"
                                                                value="Description"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="description"
                                                        value={data?.description}
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* Start Field  */}
                                        </div>
                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex justify-end gap-4">
                                                <Link
                                                    href={route('product_consumption.list')}
                                                    disabled={processing}
                                                    className="educare-gray-btn-lg-fill"
                                                >
                                                    Reset
                                                </Link>

                                                <PrimaryButton
                                                    type="submit"
                                                    disabled={processing}
                                                    className="educare-primary-btn-lg-fill"
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
