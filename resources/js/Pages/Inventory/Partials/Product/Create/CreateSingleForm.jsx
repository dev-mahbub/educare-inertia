import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import SingleList from "../List/SingleList";

export default function CreateSingleForm({ products, proCats = [], uomTitles = [], productArrType = [], proSubCats = [] }) {
    const [subCatData, setSubCatData] = useState([]);
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        category_id: "",
        sub_category_id: "",
        title: "",
        description: "",
        uom_id: "",
        type: "",
        opening_stock: "",
        rate_per_product: "",
        gst_tax: "",
        product_code: "",
        product_size: "",
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("single_product.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.customData) {
            setSubCatData(flash.customData);
        }
    }, [flash]);

    const handleCategory = (catId) => {
        setData('category_id', catId)
        router.post(route('create_single_product.list'), { 'category_id': catId });
    }

    // handle form and students data reset start
    const handleReset = () => {
        router.get(route('create_single_product.list'));
        // reset();
        // setSubCatData([]);
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="xl:col-span-8 col-span-12">
                        <SingleList products={products}/>
                    </div>
                    <div className="xl:col-span-4 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add product
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataInsert}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        <div className="grid grid-cols-12 gap-5">

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="category_id"
                                                                value="Group"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="category_id"
                                                        data_label="group"
                                                        data={proCats}
                                                        value={
                                                            data.category_id
                                                        }
                                                        onChange={(e) => handleCategory(e.target.value)}
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.category_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sub_category_id"
                                                                value="Sub group"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="sub_category_id"
                                                        data_label="sub group"
                                                        data={proSubCats}
                                                        value={
                                                            data.sub_category_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sub_category_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.sub_category_id
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
                                                                htmlFor="title"
                                                                value="Title"
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
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="description"
                                                                value="Description"
                                                            />
                                                            <sup></sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="description"
                                                        value={
                                                            data.description
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="uom_id"
                                                                value="UOM"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="uom_id"
                                                        data_label="uom"
                                                        data={uomTitles}
                                                        value={
                                                            data.uom_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "uom_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.uom_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="type"
                                                                value="Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="type"
                                                        data_label="type"
                                                        data={productArrType}
                                                        value={
                                                            data.type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="opening_stock"
                                                                value="Opening Stock"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="opening_stock"
                                                        value={
                                                            data.opening_stock
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "opening_stock",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.opening_stock
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="rate_per_product"
                                                                value="RatePerItem"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="rate_per_product"
                                                        value={
                                                            data.rate_per_product
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "rate_per_product",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.rate_per_product
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="gst_tax"
                                                                value="GST Tax(Percentage)"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="gst_tax"
                                                        value={
                                                            data.gst_tax
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "gst_tax",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.gst_tax
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="product_code"
                                                                value="Product Code"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="product_code"
                                                        value={
                                                            data.product_code
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "product_code",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="text"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.product_code
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="product_size"
                                                                value="Product size"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="product_size"
                                                        value={
                                                            data.product_size
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "product_size",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="text"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.product_size
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                        </div>

                                        {/* Start Field  */}
                                        <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
                                            <PrimaryButton
                                                disabled={processing}
                                                className="educare-gray-btn-lg-stroke"
                                                type="button"
                                                onClick={(e) => {
                                                    handleReset()
                                                }}>
                                                Reset
                                            </PrimaryButton>
                                            <PrimaryButton
                                                type="submit"
                                                disabled={processing}
                                                className="educare-primary-btn-lg-fill">
                                                Save
                                            </PrimaryButton>
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
