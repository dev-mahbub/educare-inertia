import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const TeacherSaleReturn = ({
    ledgerTitles = [],
    products = [],
    teachers = [],
    teacherNames,
    discountTypes,
    receiptNo,
    saleLedger
}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [isInvalidInvoiceNo, setIsInvalidInvoiceNo] = useState(false);
    const [formFields, setFormFields] = useState([
        // {
        //     product_id: "",
        //     quantity: "",
        //     rate: "",
        //     amount: "",
        //     description: "",
        // },
    ])

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        // teacher
        teacher_id: "",
        email: "",
        address: "",
        phone: "",
        // product
        products: formFields,
        item_total: 0,
        item_total_amount_total: 0,
        discount_type: "",
        discount_value: 0,
        item_discount_value_total: 0,
        item_tax_amount_total: 0,
        // sale item
        receipt_no: "",
        sale_invoice_no: "",
        ledger_id: "",
        description: "",
        return_date_at: "",
    });

    useEffect(() => {
        if (saleLedger != null) {
            setFormFields(saleLedger?.sale_ledger_products?.map(item => ({
                product_id: item?.product_id,
                quantity: item?.quantity,
                rate: item?.rate,
                amount: (item?.rate * item?.quantity)?.toFixed(2),
                description: "",
            })));

            const newSubtotal = saleLedger?.sale_ledger_products.reduce((sum, item) => {
                return sum + parseFloat((item?.rate * item?.quantity)) || 0;
            }, 0);

            const selectedTeacher = teachers.find((item => (item.id == saleLedger?.staff_id)));

            setData(prevData => ({
                ...prevData,
                item_total: newSubtotal,
                item_total_amount_total: newSubtotal,
                ledger_id: saleLedger?.ledger_id,
                teacher_id: selectedTeacher?.id,
                email: selectedTeacher?.email,
                address: selectedTeacher?.address,
                phone: selectedTeacher?.phone,
            }));
        }
    }, [saleLedger]);

    useEffect(() => {
        setData('receipt_no', receiptNo);
    }, [receiptNo]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            products: formFields
        }));
    }, [formFields]);

    useEffect(() => {
        if (data.discount_type === "Percentage") {
            // Handle percentage discount (e.g., data.discount_value is the percentage value)
            const discountPercentage = parseFloat(data.discount_value) || 0;
            const discountAmount = (discountPercentage / 100) * data.item_total;
            const newGrandTotal = data.item_total - discountAmount;

            // Update item_total_amount_total in the state
            setData((prevData) => ({
                ...prevData,
                item_total_amount_total: newGrandTotal,
                item_discount_value_total: discountAmount,
            }));
        }

        if (data.discount_type === "Flat") {
            // Handle flat discount (e.g., data.discount_value is the flat discount amount)
            const flatDiscount = parseFloat(data.discount_value) || 0;
            const newGrandTotal = data.item_total - flatDiscount;

            // Update item_total_amount_total in the state
            setData((prevData) => ({
                ...prevData,
                item_total_amount_total: newGrandTotal,
                item_discount_value_total: flatDiscount,
            }));
        }

        if (data.item_tax_amount_total) {
            const item_tax_amount_total = parseFloat(data.item_tax_amount_total) || 0;
            const newGrandTotalTax = (data.item_total - data?.item_discount_value_total) + item_tax_amount_total;

            // Update item_total_amount_total in the state
            setData((prevData) => ({
                ...prevData,
                item_total_amount_total: newGrandTotalTax,
            }));
        }
    }, [data.discount_value, data.products, data.discount_type, data.item_tax_amount_total, data.item_discount_value_total, data.item_total]);

    // handle sale invoice no change start
    const handleSaleInvoiceNoChange = (e) => {
        const sale_invoice_no = e.target.value;

        setData((prevData) => ({
            ...prevData,
            sale_invoice_no: sale_invoice_no
        }));
    }

    const handleSaleInvoiceNoKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            const form_data = {
                classroom_id: data?.classroom_id,
                admission_no: data?.admission_no,
                sale_invoice_no: data?.sale_invoice_no,
                filter_type: 'sale_ledger'
            }

            router.post(route('teacher_sale_return.create'), form_data, {
                onSuccess: () => {
                    setIsInvalidInvoiceNo(false);
                },
                onError: (errors) => {
                    for (const key in errors) {
                        if (key == 'sale_invoice_no') {
                            setIsInvalidInvoiceNo(true);
                            break;
                        }
                    }
                }
            });
        }
    }
    // handle sale invoice no change end

    //repeatable form fields start
    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = event.target.value;

        // Calculate the amount based on quantity and rate
        if (field === "quantity" || field === "rate") {
            const quantity = parseFloat(updatedFields[index].quantity) || 0;
            const rate = parseFloat(updatedFields[index].rate) || 0;
            updatedFields[index].amount = (quantity * rate).toFixed(2);
        } else if (field == 'product_id') {
            updatedFields[index]['rate'] = products?.find((item) => item?.id == event.target.value)?.sale_price?.toFixed(2);
            updatedFields[index].amount = ((parseFloat(updatedFields[index].quantity) || 0) * (parseFloat(updatedFields[index].rate) || 0)).toFixed(2);
        }

        setFormFields(updatedFields);

        // Recalculate subtotal
        const newSubtotal = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.amount) || 0;
        }, 0);

        setData(prevData => ({
            ...prevData,
            products: updatedFields,
            item_total: newSubtotal,
            item_total_amount_total: newSubtotal,
        }));
    }


    const addFields = () => {
        setFormFields([...formFields,
        {
            product_id: "",
            quantity: "",
            rate: "",
            amount: "",
            description: "",
        },
        ]);
    }

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];
        updatedFormFields.splice(index, 1);
        setFormFields(updatedFormFields);

        // Recalculate subtotal
        const newSubtotal = updatedFormFields.reduce((sum, item) => {
            return sum + parseFloat(item.amount) || 0;
        }, 0);

        setData((prevData) => ({
            ...prevData,
            products: updatedFormFields,
            item_total: newSubtotal,
            item_total_amount_total: newSubtotal - parseFloat(prevData.item_discount_value_total) || 0,
        }));

    }
    //repeatable form fields end

    const handleTeacher = (id) => {
        const selectedTeacher = teachers.find((item => (item.id == id)));
        if (selectedTeacher) {
            setData((prevData) => ({
                ...prevData,
                teacher_id: selectedTeacher.id,
                email: selectedTeacher.email,
                address: selectedTeacher.address,
                phone: selectedTeacher.phone,
            }));
        }
    };

    const handelReset = () => {
        setFormFields([]);

        // Reset data state
        setData({
            products: [],
            item_total: 0,
            item_total_amount_total: 0,
            discount_type: "",
            discount_value: 0,
            item_discount_value_total: 0,
            item_tax_amount_total: 0,
            teacher_id: "",
            email: "",
            address: "",
            phone: "",
        });

        setStartDate(new Date());
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();

        data.return_date_at = startDate;

        post(route("teacher_sale_return.save"), {
            preserveScroll: true,
            onSuccess: () => {
                handelReset();
                reset();
            },
            onError: (errors) => {
                for (const key in errors) {
                    if (key == 'products') {
                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        });

                        break;
                    }
                }
            }
        });
    };

    // handle change discount type start
    const handleChangeDiscountType = (type) => {
        setData((prevData) => ({
            ...prevData,
            discount_type: type
        }));

        if (type == "") {
            setData((prevData) => ({
                ...prevData,
                discount_value: 0,
                item_discount_value_total: 0
            }));
        }
    }
    // handle change discount type end

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-6">
                        <div className="educare-common-card">
                            <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-school-form-action-title mb-3">
                                    <h5>
                                        <i className="icon-ShoppingCart"></i>
                                        Sale Return
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="receipt_no"
                                                    value="Receipt No."
                                                />
                                                <TextInput
                                                    id="receipt_no"
                                                    value={data.receipt_no}
                                                    onChange={(e) =>
                                                        setData(
                                                            "receipt_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    type="text"
                                                    disabled
                                                />
                                                <InputError
                                                    message={errors.receipt_no}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="sale_invoice_no"
                                                            value="Sale invoice no"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="sale_invoice_no"
                                                    value={data.sale_invoice_no}
                                                    onChange={(e) =>
                                                        handleSaleInvoiceNoChange(e)
                                                    }
                                                    onKeyPress={(e) => {
                                                        handleSaleInvoiceNoKeyPress(e)
                                                    }}
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    // message={errors.sale_invoice_no}
                                                    message={isInvalidInvoiceNo ? 'Sale receipt number entered wrong!' : errors.sale_invoice_no}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel value="Date" />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Select Date"
                                                    className="w-full"
                                                />
                                                <InputError
                                                    message={
                                                        errors.return_date_at
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="ledger_id"
                                                            value="Sale Ledger"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    id="ledger_id"
                                                    data_label="Sale Ledger"
                                                    data={ledgerTitles}
                                                    value={
                                                        data.ledger_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "ledger_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors.ledger_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
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
                                                    value={data.description}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="educare-common-card">
                            <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="flex flex-wrap justify-between items-center gap-4 mb-5">
                                    <div>
                                        <div className="educare-school-form-action-title pb-none">
                                            <h5>
                                                <i className="icon-student"></i>
                                                Teacher Info
                                            </h5>
                                        </div>
                                    </div>
                                    <div>
                                        <Link
                                            href={route('student_sale_return.create')}
                                            className="educare-secondary-btn-md-stroke hidden">
                                            Sale for student
                                        </Link>
                                    </div>
                                </div>
                                <div className="educare-common-card-wrap-border">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="teacher_id"
                                                            value="Teacher"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    id="teacher_id"
                                                    data_label="teacher"
                                                    data={teacherNames}
                                                    value={
                                                        data.teacher_id
                                                    }
                                                    onChange={(e) => handleTeacher(e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors.teacher_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="email"
                                                    value="Email"
                                                />
                                                <TextInput
                                                    id="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block disabled"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={errors.email}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="address"
                                                    value="Address"
                                                />
                                                <TextInput
                                                    id="address"
                                                    value={data.address}
                                                    onChange={(e) =>
                                                        setData(
                                                            "address",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block disabled"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={errors.address}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="phone"
                                                    value="Phone"
                                                />
                                                <TextInput
                                                    id="phone"
                                                    value={data.phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            "phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block disabled"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={errors.phone}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="educare-classroom-form-area mb-10 mt-5">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className='educare-admission-filtar-bar-area z-[4] relative'>
                                    <div className="py-3 pt-0 educare-admission-filtar-bar">
                                        <div className="educare-admission-filtar-bar-filter justify-between">
                                            <div className="educare-card-title pb-none">
                                                <h5>
                                                    <i className="icon-ListBullets"></i>
                                                    Products
                                                </h5>
                                            </div>
                                            <div className="educare-admission-filtar-bar-filter-fields-wrap relative">
                                                <div className="educare-admission-filtar-bar-filter-fields">
                                                    <div className="educare-classroom-button-wrapper">
                                                        <div className="flex">
                                                            <PrimaryButton
                                                                type="button"
                                                                className="educare-primary-btn-md-fill"
                                                                onClick={addFields}
                                                            >
                                                                Add product
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="educare-admission-list min-width-1400-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            Product name
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Description</th>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            Quantity
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            Rate
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Amount</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formFields?.length > 0 ?
                                                formFields?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-1">
                                                                <SelectInput
                                                                    id="product_id"
                                                                    data_label="product"
                                                                    data={products}
                                                                    onChange={(event) => handleFormChange(event, index, "product_id")}
                                                                    value={item.product_id}
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`products.${index}.product_id`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>

                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-1">
                                                                <TextInput
                                                                    id="description"
                                                                    onChange={(event) => handleFormChange(event, index, "description")}
                                                                    value={item.description}
                                                                    className="block"
                                                                    type="text"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`products.${index}.description`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-1">
                                                                <TextInput
                                                                    id="quantity"
                                                                    onChange={(event) => handleFormChange(event, index, "quantity")}
                                                                    value={item.quantity}
                                                                    className="block"
                                                                    type="number"
                                                                // required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`products.${index}.quantity`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-1">
                                                                <TextInput
                                                                    id="rate"
                                                                    onChange={(event) => handleFormChange(event, index, "rate")}
                                                                    value={item.rate}
                                                                    className="block"
                                                                    type="number"
                                                                // required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`products.${index}.rate`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-1">
                                                                <TextInput
                                                                    id="amount"
                                                                    value={item.amount}
                                                                    className="block disabled"
                                                                    type="number"
                                                                    disabled={true}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`products.${index}.amount`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='educare-list-action-btn'>
                                                                <Tooltip
                                                                    title="Remove"
                                                                    placement="top"
                                                                    arrow
                                                                    as="button"
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeFields(index)}
                                                                        className="educare-danger-btn-sm-fill"
                                                                    >
                                                                        X
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }
                                            {formFields?.length > 0 ?
                                                <>
                                                    <tr>
                                                        <td colSpan="3">
                                                        </td>
                                                        <td>
                                                            <span className="font-bold">Sub Total</span>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="item_total"
                                                                    value={data?.item_total?.toFixed(2)}
                                                                    className="block disabled"
                                                                    type="number"
                                                                    disabled={true}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="discount_type"
                                                                    data_label="discount type"
                                                                    data={discountTypes}
                                                                    onChange={(e) =>
                                                                        handleChangeDiscountType(e.target.value)
                                                                    }
                                                                    className="block"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="discount_value"
                                                                    onChange={(e) =>
                                                                        setData("discount_value", e.target.value)
                                                                    }
                                                                    value={data?.discount_value}
                                                                    className={`block ${data?.discount_type == "" ? 'cursor-not-allowed' : ''}`}
                                                                    type="number"
                                                                    disabled={data?.discount_type == "" ? true : false}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="font-bold">Discount</span>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data?.item_discount_value_total?.toFixed(2)}
                                                                    className="block disabled"
                                                                    type="number"
                                                                    disabled={true}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3">
                                                        </td>
                                                        <td>
                                                            <span className="font-bold">Tax Amount</span>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="item_tax_amount_total"
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "item_tax_amount_total",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="number"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3">
                                                        </td>
                                                        <td>
                                                            <span className="font-bold">Grand total</span>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="item_total_amount_total"
                                                                    value={data?.item_total_amount_total?.toFixed(2)}
                                                                    className="block disabled"
                                                                    type="number"
                                                                    disabled={true}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                </>

                                                : ''
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan="10">
                                                    <div className='flex flex-wrap justify-end gap-5 pr-5'>
                                                        <PrimaryButton
                                                            className="educare-gray-btn-md-stroke"
                                                            type="button"
                                                            onClick={handelReset}
                                                            disabled={processing}
                                                        >
                                                            Reset
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            className="educare-primary-btn-md-fill hidden"
                                                            type="submit"
                                                            disabled={processing}
                                                        >
                                                            Return product
                                                        </PrimaryButton>
                                                    </div>
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default TeacherSaleReturn;
