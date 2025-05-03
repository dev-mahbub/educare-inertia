import React from "react";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";

export default function PurchaseRightForm({
    data,
    setData,
    errors,
    post,
    reset,
    processing,
    bookCategory = [],
    classNames = [],
    subjects = [],
    formFields = [],
    setFormFields = [],
    addFields = [],
}) {

    const discountType = [
        { id: 'percentage', title: 'Percentage' },
        { id: 'flat', title: 'Flat' }
    ]

    // Function to calculate the total price for a book item
    const calculateItemTotalPrice = (item) => {
        const quantity = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.price) || 0;
        return quantity * price;
    };

    // Function to calculate the total price for all book items
    const calculateTotalPrice = (items) => {
        let totalPrice = 0;
        items.forEach((item) => {
            totalPrice += parseFloat(item.item_total_price);
        });
        return totalPrice;
    };

    // Function to calculate discount based on the provided discount type and value
    const calculateDiscount = (totalPrice, discountType, discountValue) => {
        if (discountType === "flat") {
            return parseFloat(discountValue);
        } else if (discountType === "percentage") {
            return (totalPrice * parseFloat(discountValue)) / 100;
        } else {
            return 0;
        }
    };

    // Update handleFormChange to recalculate total price, tax amount, discount, and grand total
    const handleFormChange = (event, index, field, selectedValue) => {
        const updatedFields = [...formFields];
        if (selectedValue) {
            updatedFields[index][field] = selectedValue;
        } else {
            updatedFields[index][field] = event.target.value;
        }

        updatedFields[index].item_total_price = calculateItemTotalPrice(updatedFields[index]);
        const graceTotalPrice = calculateTotalPrice(updatedFields);
        const newDiscount = calculateDiscount(graceTotalPrice, data.discount_type, data.discount_amount);
        const grandTotal = parseFloat(graceTotalPrice) + parseFloat(data.tax_amount) - newDiscount;

        // Update formFields, total price, tax amount, discount, and grand total in data
        setFormFields(updatedFields);
        setData((prevData) => ({
            ...prevData,
            book_items: updatedFields,
            grace_total_price: graceTotalPrice,
            grand_total: grandTotal,
            discount: newDiscount,
        }));
    };

    // Function to remove a book item
    const removeFields = (index) => {
        const updatedFields = formFields.filter((field, i) => i !== index);

        // Recalculate total price for the remaining book items
        const graceTotalPrice = calculateTotalPrice(updatedFields);

        // Recalculate discount
        const newDiscount = calculateDiscount(graceTotalPrice, data.discount_type, data.discount_amount);

        // Calculate grand total
        const grandTotal = graceTotalPrice + parseFloat(data.tax_amount) - newDiscount;

        // Update formFields, total price, tax amount, discount, and grand total in data
        setFormFields(updatedFields);
        setData((prevData) => ({
            ...prevData,
            book_items: updatedFields,
            grace_total_price: graceTotalPrice,
            grand_total: grandTotal,
            discount: newDiscount,
        }));
    };

    const handleTax = (taxValue) => {
        const taxValueNum = parseFloat(taxValue);
        const totalPriceNum = parseFloat(data.grace_total_price);
        const discount = parseFloat(data.discount);
        let grandTotal = (taxValueNum + totalPriceNum) - discount
        setData({
            ...data,
            tax_amount: taxValue,
            grand_total: grandTotal,
        })
    }

    const handleDiscountType = (type) => {
        const totalPriceNum = parseFloat(data.grace_total_price);
        const newDiscount = calculateDiscount(totalPriceNum, type, data.discount_amount);
        let grandTotal = parseFloat(totalPriceNum) + parseFloat(data.tax_amount) - parseFloat(newDiscount);
        setData({
            ...data,
            discount_type: type,
            grand_total: grandTotal,
            discount: newDiscount,
        })
    }

    const handleDiscount = (discountAmount) => {
        const totalPriceNum = parseFloat(data.grace_total_price);
        const newDiscount = calculateDiscount(totalPriceNum, data.discount_type, discountAmount);
        let grandTotal = parseFloat(totalPriceNum) + parseFloat(data.tax_amount) - parseFloat(newDiscount);
        setData({
            ...data,
            grand_total: grandTotal,
            discount: newDiscount,
            discount_amount: discountAmount,
        })
    }

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="flex justify-between gap-5 mb-2">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-shopping-cart"></i>
                            Book Items
                        </h5>
                    </div>
                    <div className="flex gap-5">
                        <PrimaryButton
                            disabled={processing}
                            className="educare-primary-btn-md-fill"
                            onClick={addFields}
                            type="button"
                        >
                            <i className="icon-PlusCircle mr-1"></i>
                            Add
                        </PrimaryButton>
                    </div>

                </div>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)]  rounded-lg mb-5">
                        <div className="educare-common-card-title pt-5 pl-5">
                            <div>
                                <h5>
                                    <i className="icon-BookBookmark"></i>
                                    Add Books
                                </h5>
                            </div>
                        </div>
                        {formFields?.length > 0 ?
                            formFields?.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-4 relative px-10 py-10">
                                    {/*close button for each row */}
                                    <div className="z-[1] survey-timeline-close-btn absolute top-0 right-0 inline-block">
                                        <button
                                            type="button"
                                            className="educare-danger-btn-xs-fill cursor-pointer transition ease-in-out rounded duration-150 bg-danger/80"
                                            onClick={() => removeFields(index)}
                                        >
                                            <i className='icon-MinusCircle'></i>Close
                                        </button>
                                    </div>
                                    {/*Book Title*/}
                                    <div className="col-span-12 md:col-span-8">
                                        <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Book Title"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    value={item?.book_title}
                                                    onChange={(event, value) => handleFormChange(event, index, "book_title", value)}
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors.book_title
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Book Category"
                                            />
                                            <SelectInput
                                                data_label="Book Category"
                                                data={bookCategory}
                                                value={item?.category_id}
                                                onChange={(event, value) => handleFormChange(event, index, "category_id", value)}
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

                                    <div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Class"
                                            />
                                            <SelectInput
                                                data_label="Class"
                                                data={classNames}
                                                value={item?.class_name_id}
                                                onChange={(event, value) => handleFormChange(event, index, "class_name_id", value)}
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.class_name_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Subject"
                                            />
                                            <SelectInput
                                                data_label="Subject"
                                                data={subjects}
                                                value={item?.subject_id}
                                                onChange={(event, value) => handleFormChange(event, index, "subject_id", value)}
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.subject_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Author"
                                                />
                                                <TextInput
                                                    value={item?.author}
                                                    onChange={(event, value) => handleFormChange(event, index, "author", value)}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.author
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Quantity"
                                                />
                                                <TextInput
                                                    value={item?.quantity}
                                                    onChange={(event, value) => handleFormChange(event, index, "quantity", value)}
                                                    className="block"
                                                    type="number"
                                                />
                                                <InputError
                                                    message={
                                                        errors.quantity
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Price"
                                                />
                                                <TextInput
                                                    value={item?.price}
                                                    onChange={(event, value) => handleFormChange(event, index, "price", value)}
                                                    className="block"
                                                    type="number"
                                                />
                                                <InputError
                                                    message={
                                                        errors.price
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                            <div className="educare-input-field-styles">
                                                <InputLabel value="Total Price" />
                                                <TextInput
                                                    value={item.item_total_price}  // Change this line
                                                    readOnly={true}
                                                    placeHolder="0"
                                                    disabled={true}
                                                    className="block disabled"
                                                    type="number"
                                                />
                                                <InputError message={errors.item_total_price} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) :
                            <div className="text-center text-red-500 py-5" colSpan="10">Data not found</div>
                        }
                    </div>
                </div>
                {/* fee structure*/}
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end font-bold text-headingLight pr-2.5'>Grace Total</div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={data.grace_total_price}
                                                        placeHolder="0"
                                                        disabled={true}
                                                        className="block disabled"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.grace_total
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end font-bold text-headingLight pr-2.5'>Tax Amount</div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={
                                                            data.tax_amount
                                                        }
                                                        onChange={(e) => {
                                                            handleTax(e.target.value);
                                                        }
                                                        }
                                                        type="number"

                                                    />
                                                    <InputError
                                                        message={
                                                            errors.tax_amount
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    data_label="Discount Type"
                                                    data={discountType}
                                                    value={
                                                        data.discount_type
                                                    }
                                                    onChange={(e) => {
                                                        handleDiscountType(e.target.value)
                                                    }
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.discount_type
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={
                                                            data.discount_amount
                                                        }
                                                        onChange={(e) => {
                                                            handleDiscount(e.target.value)
                                                        }
                                                        }
                                                        placeHolder="0"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.discount_amount
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td colSpan={3}>
                                            <div className='text-end font-bold text-headingLight pr-2.5'>Discount</div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={
                                                            data.discount
                                                        }
                                                        placeHolder="0"
                                                        disabled={true}
                                                        className="block disabled"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.discount
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end font-bold text-headingLight pr-2.5'>Grand Total</div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={
                                                            data.grand_total
                                                        }
                                                        disabled={true}
                                                        className="block disabled"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.grand_total
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
