import React from 'react';
import PurchaseLeftForm from './PurchaseLeftForm';
import PurchaseRightForm from './PurchaseRightForm';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const PurchaseTables = ({
    bookTypes,
    paymentMode,
    libraryVendor,
    bankNames,
    bookCategory,
    classNames,
    subjects,
}) => {

    const [formFields, setFormFields] = useState([
        {
            book_title: "",
            category_id: "",
            class_name_id: "",
            subject_id: "",
            author: "",
            quantity: 0,
            price: 0,
            item_total_price: 0,
        },
    ]);

    // Function to add a new book item
    const addFields = () => {
        setFormFields([...formFields,
        {
            book_title: "",
            category_id: "",
            class_name_id: "",
            subject_id: "",
            author: "",
            quantity: 0,
            price: 0,
            item_total_price: 0,
        },
        ]);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        bill_number: "",
        purchase_date_at: "",
        library_vendor_id: "",
        purchase_by: "",
        book_type_id: "",
        payment_mode: "Cash",
        cheque_no: "",
        cheque_date_at: "",
        amount: "",
        bank_id: "",
        branch: "",
        transaction_no: "",
        purchase_note: "",

        // book item
        discount_type: 'percentage',
        discount_amount: 0,
        tax_amount: 0,
        discount: 0,
        grand_total: 0,
        book_items: [],
        grace_total_price: 0,
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("book.book_purchase_save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFormFields([]);
                setFormFields(
                    [
                        {
                            book_title: "",
                            category_id: "",
                            class_name_id: "",
                            subject_id: "",
                            author: "",
                            quantity: 0,
                            price: 0,
                            item_total_price: 0,
                        },
                    ]
                );
            }
        });
    };

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                        <PurchaseLeftForm
                            bookTypes={bookTypes}
                            paymentMode={paymentMode}
                            data={data}
                            setData={setData}
                            errors={errors}
                            post={post}
                            reset={reset}
                            processing={processing}
                            libraryVendor={libraryVendor}
                            bankNames={bankNames}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-8 lg:col-span-8">
                        <PurchaseRightForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            post={post}
                            reset={reset}
                            processing={processing}
                            bookCategory={bookCategory}
                            classNames={classNames}
                            subjects={subjects}
                            formFields={formFields}
                            setFormFields={setFormFields}
                            addFields={addFields}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default PurchaseTables;
