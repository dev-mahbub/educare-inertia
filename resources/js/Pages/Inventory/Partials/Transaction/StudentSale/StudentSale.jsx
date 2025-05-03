import Checkbox from '@/Components/Checkbox';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from '@/Components/RadioInput';
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentSale = ({
    ledgerTitles = [],
    classroomTitles = [],
    paymentArrType = [],
    products = [],
    students,
    student,
    discountTypes
}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [transactionDate, setTransactionDate] = useState(new Date);
    const [selectedStudent, setSelectedStudent] = useState({});

    const [formFields, setFormFields] = useState([
        // {
        //     product_id: "",
        //     quantity: 0,
        //     rate: 0,
        //     item_amount: 0,
        //     item_discount_value: 0,
        //     item_discount_amount: 0,
        //     item_amount_after_discount: 0,
        //     item_tax_amount: 0,
        //     item_total_amount: 0,
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
        products: formFields,
        item_total: 0,
        item_discount_value_total: 0,
        item_tax_amount_total: 0,
        item_total_amount_total: 0,
        // payment_type: "",
        bank_ledger_id: "",

        is_print_receipt: false,
        paid_type: "Paid",
        transaction_no: "",
        transaction_desc: "",
        transaction_date: new Date(),
        discount_type: "",

        // sale item
        ledger_id: "",
        description: "",
        sale_date_at: new Date(),
        // student
        classroom_id: "",
        student_id: "",
        admission_no: "",
        father_name: "",
        father_phone: "",
    });

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        if (selectedStudent?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: selectedStudent?.admission_no ?? "",
                classroom_id: selectedStudent?.classroom_id ?? "",
                student_id: selectedStudent?.id ?? "",
                father_name: concatName(selectedStudent?.father?.first_name, selectedStudent?.father?.middle_name, selectedStudent?.father?.last_name),
                father_phone: selectedStudent?.father?.phone ?? "",
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: selectedStudent?.id ?? "",
                father_name: concatName(selectedStudent?.father?.first_name, selectedStudent?.father?.middle_name, selectedStudent?.father?.last_name),
                father_phone: selectedStudent?.father?.phone ?? "",
            }));
        }
    }, [selectedStudent]);

    useEffect(() => {
        // const updatedFields = formFields?.filter((item, index) => index != 0);
        const updatedFields = [...formFields];

        // sum itemTotal
        const itemTotal = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.item_amount) || 0;
        }, 0);

        // sum item_discount_value
        const itemDiscountValue = updatedFields.reduce((sum, item) => {
            // return sum + parseFloat(item.item_discount_value) || 0;
            return sum + parseFloat(item.item_discount_amount) || 0;
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
            item_total_amount_total: itemTotalAmount
        }));
    }, [formFields]);

    // handle admission no change start
    const handleAdmissionNoChange = (e) => {
        const admission_no = e.target.value;

        setData((prevData) => ({
            ...prevData,
            admission_no: admission_no
        }));
    }

    const handleAdmissionNoKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            const form_data = {
                classroom_id: data?.classroom_id,
                admission_no: data?.admission_no
            }

            router.post(route('student_sale.create'), form_data);
        }
    }
    // handle admission no change end

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        if (field === "quantity") {
            const availableStock = products?.find(item => item?.id == updatedFields[index]?.product_id)?.available_stock;

            if (event.target.value <= 0) {
                updatedFields[index][field] = 0;
            } else if (event.target.value < availableStock) {
                updatedFields[index][field] = event.target.value;
            } else if (event.target.value > availableStock) {
                updatedFields[index][field] = availableStock;
            }
        } else if ((field === "rate" || field === "item_discount_value") && event.target.value < 0) {
            updatedFields[index][field] = 0;
        } else {
            updatedFields[index][field] = event.target.value;
        }

        // Calculate
        const quantity = parseInt(updatedFields[index]?.quantity) || 0;
        const rate = parseFloat(updatedFields[index]?.rate) || 0;
        const item_amount = (quantity * rate).toFixed(2);
        const item_discount_value = data?.discount_type == 'Percentage' ? parseFloat(((parseFloat(updatedFields[index]?.item_discount_value) || 0) / 100) * item_amount).toFixed(2) : parseFloat(updatedFields[index]?.item_discount_value) || 0;
        const item_amount_with_discount = item_amount - item_discount_value;
        const item_tax_amount = (parseFloat(products?.find(item => item?.id == updatedFields[index]?.product_id)?.gst_tax || 0) / 100) * item_amount_with_discount;

        if (field === "quantity" || field === "rate") {
            updatedFields[index].item_amount = item_amount;
            updatedFields[index].item_amount_after_discount = item_amount_with_discount.toFixed(2);
            updatedFields[index].item_total_amount = (item_amount_with_discount + item_tax_amount).toFixed(2);
        }

        if (field === "item_discount_value") {
            updatedFields[index].item_amount = item_amount;
            updatedFields[index].item_amount_after_discount = (item_amount_with_discount).toFixed(2);
            updatedFields[index].item_total_amount = (item_amount_with_discount + item_tax_amount).toFixed(2);
        }

        updatedFields[index]['item_discount_amount'] = parseFloat(item_discount_value).toFixed(2);
        updatedFields[index]['item_tax_amount'] = item_tax_amount.toFixed(2);

        setFormFields(updatedFields);
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

    // handle classroom change start
    const handleClassroom = (id) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            student_id: "",
            admission_no: "",
            father_name: "",
            father_phone: "",
        }));

        router.post(route('student_sale.create'), {classroom_id: id });
    }
    // handle classroom change end

    // handle student change start
    const handleStudent = (id) => {
        // setData((prevData) => ({
        //     ...prevData,
        //     admission_no: admission_no
        // }));

        setSelectedStudent(students?.find(item => item?.id == id) ?? {})
    }
    // handle student change end

    const handleProduct = (id, index) => {
        const selectProduct = products.find((item => (item.id == id)));

        const quantity = selectProduct?.available_stock > 0 ? 1 : 0;
        const rate = parseFloat(selectProduct?.sale_price || 0);
        const item_discount_value = 0;
        const item_amount = (quantity * rate).toFixed(2);
        const item_amount_with_discount = item_amount - item_discount_value;
        const item_tax_amount = (parseFloat(selectProduct?.gst_tax || 0) / 100) * item_amount_with_discount;

        // old code to add product
        // if(index == 0) {
        //     setFormFields([...formFields,
        //     {
        //         product_id: selectProduct?.id,
        //         quantity: 1,
        //         rate: selectProduct?.sale_price || 0,
        //         item_amount: item_amount,
        //         item_discount_value: 0,
        //         item_discount_amount: 0,
        //         item_amount_after_discount: item_amount_with_discount.toFixed(2),
        //         item_tax_amount: item_tax_amount.toFixed(2),
        //         item_total_amount: (item_amount_with_discount + item_tax_amount).toFixed(2),
        //     },
        //     ]);
        // } else {
        //     setFormFields(formFields?.map((item, itemIndex) => {
        //         if(itemIndex == index) {
        //             return {
        //                 product_id: selectProduct?.id,
        //                 quantity: 1,
        //                 rate: selectProduct?.sale_price || 0,
        //                 item_amount: item_amount,
        //                 item_discount_value: 0,
        //                 item_discount_amount: 0,
        //                 item_amount_after_discount: item_amount_with_discount.toFixed(2),
        //                 item_tax_amount: item_tax_amount.toFixed(2),
        //                 item_total_amount: (item_amount_with_discount + item_tax_amount).toFixed(2),
        //             }
        //         } else {
        //             return item;
        //         }
        //     }));
        // }

        // new code to add product
        setFormFields(formFields?.map((item, itemIndex) => {
            if(itemIndex == index) {
                return {
                    product_id: selectProduct?.id,
                    quantity: quantity,
                    rate: selectProduct?.sale_price || 0,
                    item_amount: item_amount,
                    item_discount_value: 0,
                    item_discount_amount: 0,
                    item_amount_after_discount: item_amount_with_discount.toFixed(2),
                    item_tax_amount: item_tax_amount.toFixed(2),
                    item_total_amount: (item_amount_with_discount + item_tax_amount).toFixed(2),
                }
            } else {
                return item;
            }
        }));
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
            item_total_amount_total: itemTotalAmount
        }));
    }

    const handelReset = () => {
        setFormFields([
            // {
            //     product_id: "",
            //     quantity: 0,
            //     rate: 0,
            //     item_amount: 0,
            //     item_discount_value: 0,
            //     item_discount_amount: 0,
            //     item_amount_after_discount: 0,
            //     item_tax_amount: 0,
            //     item_total_amount: 0,
            // },
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
            transaction_date: new Date(),
            discount_type: "",

            // sale item
            ledger_id: "",
            description: "",
            sale_date_at: new Date(),
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
        data.sale_date_at = startDate;

        post(route("student_sale_ledger.save"), {
            preserveScroll: true,
            onSuccess: () => {
                if(data?.is_print_receipt) {
                    const url = route('pdf_account.print_sale_ledger_receipt');

                    window.open(url);
                }

                handelReset();
                reset();
            },
            onError: (errors) => {
                for (const key in errors) {
                    if (key == 'products') {
                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        })

                        break;
                    }
                }

                router.post(route('student_sale.create'), { classroom_id: data?.classroom_id });
            }
        });
    };

    // handle change discount type start
    const handleDiscountType = (type) => {
        setData((prevData) => ({
            ...prevData,
            discount_type: type
        }));

        setFormFields([
            // {
            //     product_id: "",
            //     quantity: 0,
            //     rate: 0,
            //     item_amount: 0,
            //     item_discount_value: 0,
            //     item_discount_amount: 0,
            //     item_amount_after_discount: 0,
            //     item_tax_amount: 0,
            //     item_total_amount: 0,
            // },
        ]);
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
                                        Item Sale
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border">
                                    <div className="grid grid-cols-12 gap-5">
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
                                                        errors.sale_date_at
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
                                            href={route('teacher_sale.create')}
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
                                                        handleAdmissionNoChange(e)
                                                    }
                                                    onKeyPress={(e) => {
                                                        handleAdmissionNoKeyPress(e)
                                                    }}
                                                    className="block"
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
                                                    data={students}
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
                <div className="educare-classroom-form-area mb-10">
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
                                                        <div className="flex gap-4">
                                                            <div className="educare-input-field-styles mb-1">
                                                                <SelectInput
                                                                    id="discount_type"
                                                                    data_label="Discount Type"
                                                                    data={discountTypes}
                                                                    onChange={(e) => handleDiscountType(e.target.value)}
                                                                    value={data?.discount_type}
                                                                    className="block"
                                                                />
                                                            </div>
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
                                                <th>Discount Amount</th>
                                                <th>Amt. after discount</th>
                                                <th>Tax Amt</th>
                                                <th>Total Amt</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formFields?.length > 0 ?
                                                formFields?.map((item, index) => (
                                                    // <tr key={index} className={`${index != 0 && item?.rate <= 0 ? 'bg-red-300' : ''}`}>
                                                    <tr key={index} className={`${item?.rate <= 0 ? 'bg-red-300' : ''}`}>
                                                        <td>
                                                            {/* <div className="educare-input-field-styles max-w-[350px] max2Xl:max-w-[250px] mb-1"> */}
                                                            <div className="educare-input-type-file-styles min-w-[300px] mb-1">
                                                                {/* old code */}
                                                                {/* <SelectInput
                                                                    id="product_id"
                                                                    data_label="product"
                                                                    data={products}
                                                                    onChange={(e) => handleProduct(e.target.value, index)}
                                                                    value={item.product_id}
                                                                    className="block"
                                                                /> */}
                                                                <Autocomplete
                                                                    disablePortal
                                                                    options={products}
                                                                    value={item?.label}
                                                                    onChange={(event, value) => handleProduct(value?.id, index)}
                                                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select product' />}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        // !item?.product_id && errors[`products.${index - 1}.product_id`]
                                                                        !item?.product_id && errors[`products.${index}.product_id`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            {/* {(index != 0 && item?.product_id) && */}
                                                            {item?.product_id &&
                                                                <div>
                                                                    <p className='text-success text-sm'>
                                                                        GST Tax - {products?.find(product => product.id == item?.product_id)?.gst_tax ? products?.find(product => product.id == item?.product_id)?.gst_tax + '%' : ''}, Avail. Qty - {products?.find(product => product.id == item?.product_id)?.available_stock ?? ''}
                                                                    </p>
                                                                </div>
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles max-w-[130px] mb-1">
                                                                <TextInput
                                                                    id="quantity"
                                                                    onChange={(event) => handleFormChange(event, index, "quantity")}
                                                                    value={item.quantity}
                                                                    // className={`block ${index === 0 ? 'disabled' : ''}`}
                                                                    className={`block`}
                                                                    type="number"
                                                                    required
                                                                    // disabled={index === 0 ? true : false}
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
                                                            <div className="educare-input-field-styles max-w-[130px] mb-1">
                                                                <TextInput
                                                                    id="rate"
                                                                    onChange={(event) => handleFormChange(event, index, "rate")}
                                                                    value={item.rate}
                                                                    // className={`block ${index === 0 ? 'disabled' : ''}`}
                                                                    className={`block`}
                                                                    // disabled={index === 0 ? true : false}
                                                                    type="number"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`products.${index}.rate`]
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
                                                                    // className={`block ${index === 0 ? 'disabled' : ''}`}
                                                                    className={`block`}
                                                                    // disabled={index === 0 ? true : false}
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
                                                            {item?.item_discount_amount}
                                                        </td>
                                                        <td>
                                                            {item?.item_amount_after_discount}
                                                        </td>
                                                        <td>{item?.item_tax_amount}</td>
                                                        <td>{item?.item_total_amount}</td>
                                                        <td>
                                                            {/* {index !== 0 ?
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
                                                            } */}
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
                                                        <td></td>
                                                        <td></td>
                                                        <td className="font-bold">Total</td>
                                                        <td className="font-bold">{data?.item_total?.toFixed(2)}</td>
                                                        <td></td>
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
                                                                    <InputError
                                                                        message={
                                                                            errors.paid_type
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {data.paid_type === 'Paid' ?
                                                                <div className="educare-input-field-styles">
                                                                    <SelectInput
                                                                        id="bank_ledger_id"
                                                                        data_label="Payment to"
                                                                        data={paymentArrType}
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "bank_ledger_id",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        value={data.bank_ledger_id}
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.bank_ledger_id
                                                                        }
                                                                        className="mt-2"
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
                                                                <div className="educare-input-field-styles max2Xl:max-w-[200px]">
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
                                                    <div className='flex flex-wrap justify-end gap-5 pr-5'>
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
                                                            Sale product
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

export default StudentSale;
