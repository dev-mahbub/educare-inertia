import React from "react";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";

export default function RowAdd() {

    const [formFields, setFormFields] = useState([
        {
            book_title: "",
            select_book_category: "",
            select_class: "",
            select_subject: "",
            author: "",
            quantity: "",
            price: "",
            total_price: "",
        },
    ])

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        // receipt
        account_group_id: "",
        receipt_no: "",
        payment_date_at: "",
        description: "",
        // item
        items: formFields,
        total: 0,
    });


    const handleFormChange = (event, index, field, selectedValue) => {
        const updatedFields = [...formFields];
        if (selectedValue) {
            updatedFields[index][field] = selectedValue;
        }
        else {
            updatedFields[index][field] = event.target.value;
        }
        setData(prevData => ({
            ...prevData,
            items: updatedFields,
            // total: newSubtotal,
        }));
    }

    //add field
    const addFields = () => {
        setFormFields([...formFields,
        {
            book_title: "",
            select_book_category: "",
            select_class: "",
            select_subject: "",
            author: "",
            quantity: "",
            price: "",
            total_price: "",
        },
        ]);
    }
    //remove specific field
    const removeFields = (index) => {
        const remainingField = formFields.filter((field, i) => i !== index);
        setFormFields(remainingField)
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
                            // disabled={processing}
                            className="educare-primary-btn-md-fill"
                            onClick={addFields}
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
                                                <InputLabel
                                                    value="Book Title"
                                                />
                                                <TextInput
                                                    value={item?.book_title}
                                                    onChange={(event, value) => handleFormChange(event, index, "book_title", value)}
                                                    className="block"
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
                                                data={[]}
                                                value={item?.select_book_category}
                                                onChange={(event, value) => handleFormChange(event, index, "select_book_category", value)}
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.select_book_category
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
                                                data={[]}
                                                value={item?.select_class}
                                                onChange={(event, value) => handleFormChange(event, index, "select_class", value)}
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.select_class
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
                                                data={[]}
                                                value={item?.select_subject}
                                                onChange={(event, value) => handleFormChange(event, index, "select_subject", value)}
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.select_subject
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
                                                <InputLabel
                                                    value="Total Price"
                                                />
                                                <TextInput
                                                    value={item?.total_price}
                                                    onChange={(event, value) => handleFormChange(event, index, "total_price", value)}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.total_price
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )) :
                            <div className="text-center text-red-500 py-5" colSpan="10">Data not found</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}