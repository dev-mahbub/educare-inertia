import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const SetSalePriceForm = ({
    productNames = [],
    setLoading,
    product = {},
}) => {
    const [selectedOptions, setSelectedOptions] = useState(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        product_id: "",
        category_id: "",
        sub_category_id: "",
        sale_price: "",
        applied_date_at: new Date(),
        note: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            product_id: product?.id,
            category_id: product?.category_id,
            sub_category_id: product?.sub_category_id,
        }));
    }, [product])

    const handleSelectChange = (event, value) => {
        setSelectedOptions(value);
        if (value && value.id) {
            const productId = value.id;
            setData((prevData) => ({
                ...prevData,
                product_id: productId,
            }));
            router.post(route('set_sale_price.create_list'), { 'product_id': productId });
            setLoading(false);
        }
    };

    const handelUpdate = (e) => {
        e.preventDefault();
        post(route("set_sale_price.save"), {
            preserveScroll: true,
            onSuccess: () => handleReset()
        });
    };

    const handleReset = () => {
        reset();
        setSelectedOptions(null)
    }

    // console.log('data', data);

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-CurrencyInr"></i>
                    Set Item Sale Price
                </h5>
            </div>

            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <form onSubmit={handelUpdate}>
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-type-file-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <label htmlFor="product_id" className="font-primary">Product</label>
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <Autocomplete
                                                id="product_id"
                                                disablePortal
                                                options={productNames}
                                                value={selectedOptions}
                                                onChange={handleSelectChange}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label=""
                                                        placeholder="Select"
                                                        required
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="category"
                                            value="Category"
                                        />
                                        <TextInput
                                            id="category"
                                            defaultValue={product?.category_title}
                                            disabled={true}
                                            className="block disabled"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="sub_category"
                                            value="Sub Category"
                                        />
                                        <TextInput
                                            id="sub_category"
                                            defaultValue={product?.sub_category_title}
                                            disabled={true}
                                            className="block disabled"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <label htmlFor="sale_price">Sale Price</label>
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="sale_price"
                                            value={data.sale_price}
                                            onChange={(e) =>
                                                setData(
                                                    "sale_price",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            type="number"
                                            required={true}
                                        />
                                        <InputError
                                            message={errors.sale_price}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <label htmlFor="applied_date_at">Date</label>
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={data?.applied_date_at && new Date(data?.applied_date_at)}
                                            onChange={(date) =>
                                                setData("applied_date_at", date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Date"
                                            className="w-full"
                                            required={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="note"
                                            value="Note"
                                        />
                                        <TextareaInput
                                            id="note"
                                            value={data.note}
                                            onChange={(e) =>
                                                setData(
                                                    "note",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.note}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                        <PrimaryButton
                                            className="educare-gray-btn-lg-stroke"
                                            type="button"
                                            disabled={processing}
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </PrimaryButton>
                                        <PrimaryButton
                                            className="educare-primary-btn-lg-fill"
                                            type="submit"
                                            disabled={processing}
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
        </>
    );
};

export default SetSalePriceForm;
