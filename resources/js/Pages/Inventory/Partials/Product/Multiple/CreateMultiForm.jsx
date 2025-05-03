import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm, usePage } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function CreateMultiForm({
    products,
    proCats = [],
    uomTitles = [],
    productArrType = [],
    proSubCats = []
}) {
    const [subCatData, setSubCatData] = useState([]);
    const [formFields, setFormFields] = useState([
        {
            // category_id: "",
            // sub_category_id: "",
            title: "",
            description: "",
            uom_id: "",
            type: "",
            opening_stock: "",
            rate_per_product: "",
            gst_tax: "",
            product_code: "",
            product_size: "",
        },
    ]);

    const { data, setData, errors, post, reset, processing } = useForm({
        category_id: "",
        sub_category_id: "",
        products: formFields,
    });

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = event.target.value;
        setFormFields(updatedFields);

        setData((prevData) => ({
            ...prevData,
            products: updatedFields,
        }));
    };

    const addFields = () => {
        setFormFields([
            ...formFields,
            {
                // category_id: "",
                // sub_category_id: "",
                title: "",
                description: "",
                uom_id: "",
                type: "",
                opening_stock: "",
                rate_per_product: "",
                gst_tax: "",
                product_code: "",
                product_size: "",
            },
        ]);
    };

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];
        updatedFormFields.splice(index, 1);
        setFormFields(updatedFormFields);
        setData((prevData) => {
            const updatedProducts = [...prevData.products];
            updatedProducts.splice(index, 1);
            return {
                ...prevData,
                products: updatedProducts,
            };
        });
    };
    //repeatable form fields end

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("multi_product.save"), {
            products: formFields,
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.customData) {
            setSubCatData(flash.customData);
        }
    }, [flash]);

    const handleCategory = (id) => {
        setData("category_id", id);
        router.post(route("create_multiple_product.list"), { category_id: id });
    };

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    // handle reset start
    const handleReset = () => {
        router.get(route("create_multiple_product.list"));
    }
    // handle reset end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-header-filtar-bar-area z-[4] relative">
                                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                                    <div className="educare-header-filtar-bar-main">
                                        <div>
                                            <div className=" educare-header-filtar-bar-inner-main">
                                                {/* delete count if don't need */}
                                                <div className="educare-header-filtar-bar-count mr-auto">
                                                    <div className="educare-card-title pb-none">
                                                        <h5>
                                                            <i className="icon-ListBullets"></i>
                                                            Add multiple product
                                                        </h5>
                                                    </div>
                                                </div>
                                                {/* delete count if don't need */}
                                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                                    <div className="educare-header-filtar-bar-fields-area relative">
                                                        <span
                                                            className="educare-header-filter-prev"
                                                            onClick={
                                                                handlePrevClick
                                                            }
                                                        >
                                                            <i className="icon-left-chevron"></i>
                                                        </span>
                                                        <div
                                                            className="educare-header-filtar-bar-fields-wrap"
                                                            ref={listRef}
                                                            style={{
                                                                transform: `translateX(-${
                                                                    currentIndex *
                                                                    120
                                                                }px)`,
                                                            }}
                                                        >
                                                            {/* Replace changable inputs */}
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput
                                                                    id="category_id"
                                                                    data_label="group*"
                                                                    data={
                                                                        proCats
                                                                    }
                                                                    value={
                                                                        data.category_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleCategory(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput
                                                                    id="sub_category_id"
                                                                    data_label="sub group"
                                                                    data={
                                                                        proSubCats
                                                                    }
                                                                    value={
                                                                        data.sub_category_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "sub_category_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                            </div>
                                                            {/* Replace changable inputs */}
                                                        </div>
                                                        <span
                                                            className="educare-header-filter-next"
                                                            onClick={
                                                                handleNextClick
                                                            }
                                                        >
                                                            <i className="icon-chevron"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                                    {/* Replace changable buttons */}
                                                    <div>
                                                        <Tooltip
                                                            title="Add product"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    addFields
                                                                }
                                                                className="educare-dark-btn-md-fill"
                                                            >
                                                                <i className="icon-PlusCircle"></i>{" "}
                                                                Add product
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    {/* Replace changable buttons */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleFormDataInsert}>
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product name *</th>
                                                <th>UOM</th>
                                                <th>Type*</th>
                                                <th>Opening Stock</th>
                                                <th>GST Tax(%)</th>
                                                <th>Rate</th>
                                                <th>Product Code</th>
                                                <th>Product Size</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formFields?.length > 0 ? (
                                                formFields?.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="educare-input-field-styles maxMd:min-w-[80px]">
                                                                    <TextInput
                                                                        id="title"
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleFormChange(
                                                                                event,
                                                                                index,
                                                                                "title"
                                                                            )
                                                                        }
                                                                        value={
                                                                            item.title
                                                                        }
                                                                        className="block"
                                                                        required
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles maxMd:min-w-[80px]">
                                                                    <SelectInput
                                                                        id="uom_id"
                                                                        data_label="uom"
                                                                        data={
                                                                            uomTitles
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleFormChange(
                                                                                event,
                                                                                index,
                                                                                "uom_id"
                                                                            )
                                                                        }
                                                                        value={
                                                                            item.uom
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
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles maxMd:min-w-[80px]">
                                                                    <SelectInput
                                                                        id="type"
                                                                        data_label="type"
                                                                        data={
                                                                            productArrType
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleFormChange(
                                                                                event,
                                                                                index,
                                                                                "type"
                                                                            )
                                                                        }
                                                                        value={
                                                                            item.type
                                                                        }
                                                                        className="block"
                                                                        required
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles maxMd:min-w-[80px]">
                                                                    <TextInput
                                                                        id="opening_stock"
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleFormChange(
                                                                                event,
                                                                                index,
                                                                                "opening_stock"
                                                                            )
                                                                        }
                                                                        value={
                                                                            item.opening_stock
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
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles maxMd:min-w-[80px]">
                                                                    <TextInput
                                                                        id="gst_tax"
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleFormChange(
                                                                                event,
                                                                                index,
                                                                                "gst_tax"
                                                                            )
                                                                        }
                                                                        value={
                                                                            item.gst_tax
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
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles maxMd:min-w-[80px]">
                                                                    <TextInput
                                                                        id="rate_per_product"
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleFormChange(
                                                                                event,
                                                                                index,
                                                                                "rate_per_product"
                                                                            )
                                                                        }
                                                                        value={
                                                                            item.rate_per_product
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
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles maxMd:min-w-[80px]">
                                                                    <TextInput
                                                                        id="product_code"
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleFormChange(
                                                                                event,
                                                                                index,
                                                                                "product_code"
                                                                            )
                                                                        }
                                                                        value={
                                                                            item.product_code
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
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles maxMd:min-w-[80px]">
                                                                    <TextInput
                                                                        id="product_size"
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleFormChange(
                                                                                event,
                                                                                index,
                                                                                "product_size"
                                                                            )
                                                                        }
                                                                        value={
                                                                            item.product_size
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
                                                            </td>
                                                            <td>
                                                                <div className="educare-list-action-btn">
                                                                    <Tooltip
                                                                        title="Remove"
                                                                        placement="top"
                                                                        arrow
                                                                        as="button"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeFields(
                                                                                    index
                                                                                )
                                                                            }
                                                                            className="educare-danger-btn-sm-fill"
                                                                        >
                                                                            X
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        className="text-center text-red-500"
                                                        colSpan="10"
                                                    >
                                                        Data not found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan="10">
                                                    <div className="flex flex-wrap justify-end pr-5">
                                                        <PrimaryButton
                                                            className="educare-primary-btn-md-fill hidden mr-5"
                                                            type="submit"
                                                        >
                                                            Create multiple
                                                            product
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            className="educare-gray-btn-md-stroke"
                                                            type="button"
                                                            onClick={handleReset}
                                                        >
                                                            Reset
                                                        </PrimaryButton>
                                                    </div>
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
