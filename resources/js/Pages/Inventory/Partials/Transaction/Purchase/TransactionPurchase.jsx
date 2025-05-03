import Checkbox from '@/Components/Checkbox';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionPurchase = ({
    productNames = [],
    ledgerNames = [],
    partyAccountNames = [],
    receiptNo = '',
}) => {

    const discountTypeData = [
        { id: 'Percentage', title: 'Percentage' },
        { id: 'Flat', title: 'Flat' },
    ]
    const [startDate, setStartDate] = useState(new Date());
    const [partyAccountSelect, setPartyAccountSelect] = useState(null);

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
        // receipt
        ledger_id: "",
        party_account_id: "",
        receipt_no: receiptNo,
        supplier_invoice_no: "",
        purchase_date_at: "",
        description: "",
        // product
        products: formFields,
        sub_total: 0,
        grand_total: 0,
        discount_type: "",
        discount_value: 0,
        discount_amount: 0,
        tax_amount: 0,
        is_print_receipt: false
    });

    useEffect(() => {
        setData('receipt_no', receiptNo);
    }, [receiptNo]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            products: formFields
        }));
    }, [formFields]);

    const handlePartyAccountName = (event, value) => {
        if (value) {
            setData(prevData => ({
                ...prevData,
                party_account_id: value.id
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                party_account_id: ""
            }));
        }
        setPartyAccountSelect(value);
    }

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = event.target.value;

        // Calculate the amount based on quantity and rate
        if (field === "quantity" || field === "rate") {
            const quantity = parseFloat(updatedFields[index].quantity) || 0;
            const rate = parseFloat(updatedFields[index].rate) || 0;
            updatedFields[index].amount = (quantity * rate).toFixed(2);
        }

        setFormFields(updatedFields);

        // Recalculate subtotal
        const newSubtotal = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.amount) || 0;
        }, 0);

        setData(prevData => ({
            ...prevData,
            products: updatedFields,
            sub_total: newSubtotal,
            grand_total: newSubtotal,
        }));
    }

    useEffect(() => {
        if (data.discount_type === "Percentage") {
            // Handle percentage discount (e.g., data.discount_value is the percentage value)
            const discountPercentage = parseFloat(data.discount_value) || 0;
            const discountAmount = (discountPercentage / 100) * data.sub_total;
            const newGrandTotal = data.sub_total - discountAmount;

            // Update grand_total in the state
            setData((prevData) => ({
                ...prevData,
                grand_total: newGrandTotal,
                discount_amount: discountAmount,
            }));
        }

        if (data.discount_type === "Flat") {
            // Handle flat discount (e.g., data.discount_value is the flat discount amount)
            const flatDiscount = parseFloat(data.discount_value) || 0;
            const newGrandTotal = data.sub_total - flatDiscount;

            // Update grand_total in the state
            setData((prevData) => ({
                ...prevData,
                grand_total: newGrandTotal,
                discount_amount: flatDiscount,
            }));
        }

        if (data.tax_amount){
            const tax_amount = parseFloat(data.tax_amount) || 0;
            const newGrandTotalTax = (data.sub_total - data?.discount_amount) + tax_amount;

            // Update grand_total in the state
            setData((prevData) => ({
                ...prevData,
                grand_total: newGrandTotalTax,
            }));
        }
    }, [data.discount_value, data.products, data.discount_type, data.tax_amount, data.discount_amount, data.sub_total]);


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
            sub_total: newSubtotal,
            grand_total: newSubtotal - parseFloat(prevData.discount_amount) || 0,
        }));

    }
    //repeatable form fields end

    const handelReset = () => {
        setFormFields([
            {
                product_id: "",
                quantity: "",
                rate: "",
                amount: "",
                description: "",
            },
        ]);

        // Reset data state
        setData({
            products: [],
            sub_total: 0,
            grand_total: 0,
            discount_type: "",
            discount_value: 0,
            discount_amount: 0,
            tax_amount: 0,
        });

        setPartyAccountSelect(null);
        setStartDate(new Date());
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();

        data.purchase_date_at = startDate;

        post(route("product_purchase.save"), {
            preserveScroll: true,
            onSuccess: () => {
                if (data?.is_print_receipt) {
                    const url = route('pdf_account.print_purchase_receipt');

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
                        });

                        break;
                    }
                }
            }
        });
    }

    // handle change discount type start
    const handleChangeDiscountType = (type) => {
        setData((prevData) => ({
            ...prevData,
            discount_type: type
        }));

        if(type == "") {
            setData((prevData) => ({
                ...prevData,
                discount_value: 0,
                discount_amount: 0
            }));
        }
    }
    // handle change discount type end

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="educare-common-card mb-10">
                    <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-school-form-action-title mb-3">
                            <h5>
                                <i className="icon-ShoppingCart"></i>
                                Purchase Product
                            </h5>
                        </div>
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
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
                                            className="block disabled"
                                            type="text"
                                            disabled={true}
                                        />
                                        <InputError
                                            message={errors.receipt_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="supplier_invoice_no"
                                            value="Supplier invoice no."
                                        />
                                        <TextInput
                                            id="supplier_invoice_no"
                                            value={data.supplier_invoice_no}
                                            onChange={(e) =>
                                                setData(
                                                    "supplier_invoice_no",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.supplier_invoice_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
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
                                            message={errors.purchase_date_at}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="lg:col-span-6 maxMd:col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        value="Party A/c name"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <div className="educare-input-type-file-styles">
                                                <Autocomplete
                                                    disablePortal
                                                    options={partyAccountNames}
                                                    value={partyAccountSelect}
                                                    onChange={handlePartyAccountName}
                                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select A/c name' />}
                                                />
                                                {(partyAccountSelect?.debit - partyAccountSelect?.credit) > 0 &&
                                                    <div>
                                                        <p
                                                            className="text-sm"
                                                        >
                                                            Current balance :
                                                            <span
                                                                className="ml-1 font-semibold"
                                                            >
                                                                {(partyAccountSelect?.debit - partyAccountSelect?.credit)?.toFixed(2)} Dr
                                                            </span>
                                                        </p>
                                                    </div>
                                                }

                                                {((partyAccountSelect?.debit - partyAccountSelect?.credit) < 0) &&
                                                    <div>
                                                        <p
                                                            className="text-sm"
                                                        >
                                                            Current balance :
                                                            <span
                                                                className="ml-1 font-semibold text-danger"
                                                            >
                                                                {(partyAccountSelect?.credit - partyAccountSelect?.debit)?.toFixed(2)} Cr
                                                            </span>
                                                        </p>
                                                    </div>
                                                }
                                                <InputError
                                                    message={
                                                        errors.party_account_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="ledger_id"
                                                    value="Purchase Ledger"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            id="ledger_id"
                                            data_label="Purchase Ledger"
                                            data={ledgerNames}
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
                                        />
                                        <InputError
                                            message={
                                                errors.ledger_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                        />
                                        <TextInput
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
                                            message={errors.description}
                                            className="mt-2"
                                        />
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
                                        <div className="educare-admission-filtar-bar-filter items-center flex-wrap justify-between">
                                            <div className="educare-card-title pb-none leading-none">
                                                <h5>
                                                    <i className="icon-ListBullets"></i>
                                                    Products
                                                </h5>
                                            </div>
                                            <div className="educare-classroom-button-wrapper">
                                                <div className="flex">
                                                    <PrimaryButton
                                                        type="button"
                                                        className="educare-dark-btn-md-fill"
                                                        onClick={addFields}
                                                    >
                                                        <i className="icon-PlusCircle"></i> Add product
                                                    </PrimaryButton>
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
                                                                    data={productNames}
                                                                    onChange={(event) => handleFormChange(event, index, "product_id")}
                                                                    value={item.product_id}
                                                                    className="block"
                                                                    // required
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
                                                                    id="sub_total"
                                                                    value={data.sub_total.toFixed(2)}
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
                                                                    data={discountTypeData}
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
                                                                    value={data?.discount_amount?.toFixed(2)}
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
                                                                    id="tax_amount"
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "tax_amount",
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
                                                        <td colSpan="3" className='text-right'>
                                                            <div className="mr-8 educare-create-school-settings-list educare-create-school-settings-list-document">
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
                                                        <td>
                                                            <span className="font-bold">Grand total</span>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="grand_total"
                                                                    value={data.grand_total.toFixed(2)}
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
                                                            className="educare-primary-btn-md-fill hidden"
                                                            type="submit"
                                                            disabled={processing}
                                                        >
                                                            Purchase
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            className="educare-gray-btn-md-stroke"
                                                            type="button"
                                                            onClick={handelReset}
                                                            disabled={processing}
                                                        >
                                                            Reset
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

export default TransactionPurchase;
