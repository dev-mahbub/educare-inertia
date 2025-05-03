import Checkbox from '@/Components/Checkbox';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from '@/Components/RadioInput';
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const StudentSaleReturn = ({
    ledgerTitles = [],
    classroomTitles = [],
    paymentArrType = [],
    products = [],
    students,
    student,
    discountTypes
}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [transactionDate, setTransactionDate] = useState(null);
    const [studentNames, setStudentNames] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});

    const [formFields, setFormFields] = useState([
        {
            product_id: "",
            quantity: 0,
            rate: 0,
            item_amount: 0,
            item_discount_value: 0,
            item_amount_after_discount: 0,
            item_tax_amount: 0,
            item_total_amount: 0,
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
        receipt_no: "",
        sale_invoice_no: "",
        products: formFields,
        item_total: 0,
        item_discount_value_total: 0,
        item_tax_amount_total: 0,
        item_total_amount_total: 0,
        payment_type: "",

        is_print_receipt: false,
        paid_type: "Paid",
        transaction_no: "",
        transaction_desc: "",
        transaction_date: "",

        // sale item
        ledger_id: "",
        description: "",
        return_date_at: "",
        // student
        classroom_id: "",
        student_id: "",
        admission_no: "",
        father_name: "",
        father_phone: "",
    });

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = event.target.value;

        // Calculate
        const quantity = parseFloat(updatedFields[index].quantity) || 0;
        const rate = parseFloat(updatedFields[index].rate) || 0;
        const item_discount_value = parseFloat(updatedFields[index].item_discount_value) || 0;
        const item_tax_amount = parseFloat(updatedFields[index].item_tax_amount) || 0;
        const item_amount = (quantity * rate).toFixed(2);
        const item_amount_with_discount = item_amount - item_discount_value;

        if (field === "quantity" || field === "rate") {
            updatedFields[index].item_amount = item_amount;
            updatedFields[index].item_amount_after_discount = (item_amount_with_discount - item_tax_amount).toFixed(2);
            updatedFields[index].item_total_amount = (item_amount_with_discount - item_tax_amount).toFixed(2);
        }

        if (field === "item_discount_value") {
            updatedFields[index].item_amount = item_amount;
            updatedFields[index].item_amount_after_discount = (item_amount_with_discount).toFixed(2);
            updatedFields[index].item_total_amount = (item_amount_with_discount - item_tax_amount).toFixed(2);
        }

        setFormFields(updatedFields);

        // sum itemTotal
        const itemTotal = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_amount) || 0;
        }, 0);

        // sum item_discount_value
        const itemDiscountValue = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_discount_value) || 0;
        }, 0);

        // sum item_discount_value
        const itemAmountWithDiscount = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_amount_after_discount) || 0;
        }, 0);

        // sum item_tax_amount
        const itemTaxAmount = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_tax_amount) || 0;
        }, 0);

        // sum item_total_amount
        const itemTotalAmount = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_total_amount) || 0;
        }, 0);

        setData(prevData => ({
            ...prevData,
            products: updatedFields,
            item_total: itemTotal,
            item_discount_value_total: itemDiscountValue,
            item_amount_with_discount_total: itemAmountWithDiscount,
            item_tax_amount_total: itemTaxAmount,
            item_total_amount_total: itemTotalAmount,
            // grand_total: newSubtotal,
        }));
    }


    const addFields = () => {
        setFormFields([...formFields,
        {
            product_id: "",
            quantity: 0,
            rate: 0,
            item_amount: 0,
            item_discount_value: 0,
            item_amount_after_discount: 0,
            item_tax_amount: 0,
            item_total_amount: 0,
        },
        ]);
    }

    const concatName = (first_name = null, middle_name = null, last_name = null) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.customData) {
            setStudentNames(flash.customData);
        }
        if (flash.customData2) {
            setData((prevData) => ({
                ...prevData,
                student_id: flash.customData2.id,
                classroom_id: flash.customData2.classroom_id,
                admission_no: flash.customData2.admission_no,
                father_name: concatName(flash.customData2.father_first_name, flash.customData2.father_middle_name, flash.customData2.father_last_name),
                father_phone: flash.customData2.father_phone,
            }));
        }
        if (flash.customData3) {
            setFormFields([...formFields,
            {
                product_id: flash.customData3.id,
                quantity: flash.customData3.opening_stock || 0,
                rate: flash.customData3.rate_per_product || 0,
                item_tax_amount: flash.customData3.gst_tax || 0,
                item_discount_value: 0,
            },
            ]);
        }
    }, [flash]);

    const handleClassroom = (id) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            student_id: "",
            admission_no: "",
            father_name: "",
            father_phone: "",
        }));
        router.post(route('get_student_by_classroom_id'), { 'id': id });
    }

    const handleStudent = (id) => {
        setData('student_id', id)
        router.post(route('get_student_info_by_id'), { 'id': id });
    }

    const handleProduct = (id) => {
        // router.post(route('get_product_by_id'), { 'id': id });
        const selectProduct = products.find((item => (item.id == id)));
        if (selectProduct) {
            setFormFields([...formFields,
            {
                product_id: selectProduct.id,
                quantity: selectProduct.opening_stock || 0,
                rate: selectProduct.rate_per_product || 0,
                item_tax_amount: selectProduct.gst_tax || 0,
                item_discount_value: 0,
            },
            ]);
        }

    };

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];
        updatedFormFields.splice(index, 1);
        setFormFields(updatedFormFields);

        // sum itemTotal
        const itemTotal = updatedFormFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_amount) || 0;
        }, 0);

        // sum item_discount_value
        const itemDiscountValue = updatedFormFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_discount_value) || 0;
        }, 0);

        // sum item_discount_value
        const itemAmountWithDiscount = updatedFormFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_amount_after_discount) || 0;
        }, 0);

        // sum item_tax_amount
        const itemTaxAmount = updatedFormFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_tax_amount) || 0;
        }, 0);

        // sum item_total_amount
        const itemTotalAmount = updatedFormFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_total_amount) || 0;
        }, 0);

        setData(prevData => ({
            ...prevData,
            products: updatedFormFields,
            item_total: itemTotal,
            item_discount_value_total: itemDiscountValue,
            item_amount_with_discount_total: itemAmountWithDiscount,
            item_tax_amount_total: itemTaxAmount,
            item_total_amount_total: itemTotalAmount,
            // grand_total: newSubtotal,
        }));
    }

    const handelReset = () => {
        setFormFields([
            {
                product_id: "",
                quantity: 0,
                rate: 0,
                item_amount: 0,
                item_discount_value: 0,
                item_amount_after_discount: 0,
                item_tax_amount: 0,
                item_total_amount: 0,
            },
        ]);

        // Reset data state
        setData({
            products: [],
            item_total: 0,
            item_discount_value_total: 0,
            item_tax_amount_total: 0,
            item_total_amount_total: 0,

            is_print_receipt: false,
            paid_type: "Paid",
            transaction_no: "",
            transaction_desc: "",
            transaction_date: "",

            // sale item
            ledger_id: "",
            description: "",
            // student
            classroom_id: "",
            student_id: "",
            admission_no: "",
            father_name: "",
            father_phone: "",
        });
        setStartDate(new Date());
        setTransactionDate(null)
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        data.transaction_date = transactionDate;
        data.return_date_at = startDate;
        post(route("student_sale_return_ledger.save"), {
            preserveScroll: true,
            onSuccess: () => {
                handelReset();
                reset();
            },
        });
    };

    console.log("all data", data);

    console.log("products", products);

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
                                                        setData(
                                                            "sale_invoice_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.sale_invoice_no}
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
                                <div className="flex flex-wrap justify-between gap-4 mb-5">
                                    <div>
                                        <div className="educare-school-form-action-title pb-none">
                                            <h5>
                                                <i className="icon-student"></i>
                                                Student Info
                                            </h5>
                                        </div>
                                    </div>
                                    <div>
                                        <Link
                                            href={route('teacher_sale_return.create')}
                                            className="educare-secondary-btn-md-stroke hidden">
                                            Sale for teacher
                                        </Link>
                                    </div>
                                </div>

                                <div className="educare-common-card-wrap-border">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="admission_no"
                                                    value="Admission No."
                                                />
                                                <TextInput
                                                    id="admission_no"
                                                    value={data.admission_no}
                                                    onChange={(e) =>
                                                        setData(
                                                            "admission_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block disabled"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={errors.admission_no}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="classroom_id"
                                                            value="Class"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="class"
                                                    data={classroomTitles}
                                                    value={
                                                        data.classroom_id
                                                    }
                                                    onChange={(e) => handleClassroom(e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors.classroom_id
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
                                                            htmlFor="student_id"
                                                            value="Student"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    id="student_id"
                                                    data_label="student"
                                                    data={studentNames}
                                                    value={data.student_id}
                                                    onChange={(e) => handleStudent(e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="father_name"
                                                    value="Father name"
                                                />
                                                <TextInput
                                                    id="father_name"
                                                    value={data.father_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block disabled"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={errors.father_name}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="father_phone"
                                                    value="Mobile No"
                                                />
                                                <TextInput
                                                    id="father_phone"
                                                    value={data.father_phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            "father_phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block disabled"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={errors.father_phone}
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
                                            {/* <div className="educare-admission-filtar-bar-filter-fields-wrap relative">
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
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="educare-admission-list min-width-1400-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap min-w-[270px]">
                                                        <div className="educare-input-field-styles-label">
                                                            Product name
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </th>
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
                                                <th><span className="block min-w-[150px]">Total</span></th>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            Discount (Rs)
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Amt. after discount</th>
                                                <th>Tax Amt</th>
                                                <th>Total Amt</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formFields?.length > 0 ?
                                                formFields?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-input-field-styles max-w-[350px] max2Xl:max-w-[250px]">
                                                                <SelectInput
                                                                    id="product_id"
                                                                    data_label="product"
                                                                    data={products}
                                                                    onChange={(e) => handleProduct(e.target.value)}
                                                                    value={item.product_id}
                                                                    className="block"
                                                                    required={index === 0 ? false : true}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.product_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles max-w-[130px]">
                                                                <TextInput
                                                                    id="quantity"
                                                                    onChange={(event) => handleFormChange(event, index, "quantity")}
                                                                    value={item.quantity}
                                                                    className={`block ${index === 0 ? 'disabled' : ''}`}
                                                                    type="number"
                                                                    required
                                                                    disabled={index === 0 ? true : false}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.quantity
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles max-w-[130px]">
                                                                <TextInput
                                                                    id="rate"
                                                                    onChange={(event) => handleFormChange(event, index, "rate")}
                                                                    value={item.rate}
                                                                    className={`block ${index === 0 ? 'disabled' : ''}`}
                                                                    disabled={index === 0 ? true : false}
                                                                    type="number"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.rate
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>{item?.item_amount}</td>
                                                        <td>
                                                            <div className="educare-input-field-styles max-w-[130px]">
                                                                <TextInput
                                                                    id="item_discount_value"
                                                                    onChange={(event) => handleFormChange(event, index, "item_discount_value")}
                                                                    value={item.item_discount_value}
                                                                    className={`block ${index === 0 ? 'disabled' : ''}`}
                                                                    disabled={index === 0 ? true : false}
                                                                    type="number"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.item_discount_value
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {item?.item_amount_after_discount}
                                                        </td>
                                                        <td>{item?.item_tax_amount}</td>
                                                        <td>{item?.item_total_amount}</td>
                                                        <td>
                                                            {index !== 0 ?
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
                                                                :
                                                                ''
                                                            }

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
                                                        <td></td>
                                                        <td></td>
                                                        <td className="font-bold">Total</td>
                                                        <td className="font-bold">{data?.item_total?.toFixed(2)}</td>
                                                        <td className="font-bold">{data?.item_discount_value_total?.toFixed(2)}</td>
                                                        <td className="font-bold">{data?.item_amount_with_discount_total?.toFixed(2)}</td>
                                                        <td className="font-bold">{data?.item_tax_amount_total?.toFixed(2)}</td>
                                                        <td className="font-bold">{data?.item_total_amount_total?.toFixed(2)}</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td colSpan={2}>
                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        id="is_print_receipt"
                                                                        name="is_print_receipt"
                                                                        checked={
                                                                            data.is_print_receipt
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "is_print_receipt",
                                                                                e.target.checked
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <InputLabel
                                                                        htmlFor="is_print_receipt"
                                                                        value="Do you want to print receipt ?"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td colSpan={2}>
                                                            <div className="educare-create-school-settings-list-check">
                                                                <div className="educare-radio-field-styles flex gap-3">
                                                                    <RadioInput
                                                                        name="paid_type"
                                                                        value="Paid"
                                                                        checked={data.paid_type === "Paid"}
                                                                        onChange={() => setData("paid_type", "Paid")}
                                                                    />
                                                                    <RadioInput
                                                                        name="paid_type"
                                                                        value="Unpaid"
                                                                        checked={data.paid_type === "Unpaid"}
                                                                        onChange={() => setData("paid_type", "Unpaid")}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {data.paid_type === 'Paid' ?
                                                                <div className="educare-input-field-styles">
                                                                    <SelectInput
                                                                        id="payment_type"
                                                                        data_label="Payment to"
                                                                        data={paymentArrType}
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "payment_type",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        value={data.payment_type}
                                                                        className="block"
                                                                    />
                                                                </div>
                                                                :
                                                                ''
                                                            }
                                                        </td>
                                                        <td className="font-bold">Payable</td>
                                                        <td className="font-bold">{data?.item_total_amount_total?.toFixed(2)}</td>
                                                        <td></td>
                                                    </tr>
                                                    {data.paid_type === 'Paid' ?
                                                        <tr>
                                                            <td></td>
                                                            <td colSpan={2}>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="transaction_no"
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "transaction_no",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        value={data.transaction_no}
                                                                        className="block"
                                                                        type="text"
                                                                        placeHolder="Transaction no/cheque no"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.transaction_no
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td colSpan={3}>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="transaction_desc"
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "transaction_desc",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        value={data.transaction_desc}
                                                                        className="block"
                                                                        type="text"
                                                                        placeHolder="Transaction description"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.transaction_desc
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td colSpan={2}>
                                                                <div className="educare-input-field-styles">
                                                                    <DatePicker
                                                                        selected={transactionDate}
                                                                        onChange={(date) => setTransactionDate(date)}
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
                                                                </div>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        :

                                                        ''}

                                                </>

                                                : ''
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan="10">
                                                    <div className='flex flex-wrap gap-5 justify-end pr-5'>
                                                        <PrimaryButton
                                                            className="educare-gray-btn-md-stroke"
                                                            type="button"
                                                            onClick={handelReset}
                                                        >
                                                            Reset
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            className="educare-primary-btn-md-fill hidden"
                                                            type="submit"
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

export default StudentSaleReturn;
