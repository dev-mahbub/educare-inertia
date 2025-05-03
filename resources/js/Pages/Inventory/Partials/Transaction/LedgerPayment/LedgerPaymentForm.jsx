import Checkbox from '@/Components/Checkbox';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LedgerPaymentForm = ({
    accountGroupTitles = [],
    ledgerGroupTitles = [],
    ledgerTitles = [],
    paymentModes,
    nextReceiptNo
}) => {
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [accountGroupSelect, setAccountGroupSelect] = useState(null);
    const [paymentMode, setPaymentMode] = useState({});

    const [formFields, setFormFields] = useState([
        // {
        //     // ledger_group: "",
        //     // ledger: "",
        //     // amount: "",
        //     // description: "",
        //     account_group_id: "",
        //     ledger_id: "",
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
        account_group_id: "",
        receipt_no: nextReceiptNo,
        payment_date_at: "",
        bank_ledger_id: "",
        description: "",
        // item
        items: formFields,
        total: 0,
        is_print_receipt: false
    });

    useEffect(() => {
        setData('receipt_no', nextReceiptNo);
    }, [nextReceiptNo]);

    useEffect(() => {
        setPaymentMode(paymentModes?.find(item => item?.id == data?.bank_ledger_id) ?? {});
    }, [data?.bank_ledger_id, paymentModes]);

    const handleAccountGroupTitle = (event, value) => {
        if (value) {
            setData(prevData => ({
                ...prevData,
                account_group_id: value.id
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                account_group_id: ""
            }));
        }
        setAccountGroupSelect(value);
    };


    const handleFormChange = (event, index, field, selectedValue) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = event.target.value;
        if (selectedValue) {
            updatedFields[index][field] = selectedValue;
        }

        const newSubtotal = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.amount) || 0;
        }, 0);

        setData(prevData => ({
            ...prevData,
            items: updatedFields,
            total: newSubtotal,
        }));
    }

    const addFields = () => {
        setFormFields([...formFields,
        {
            account_group_id: "",
            ledger_id: "",
            amount: "",
            description: "",
        },
        ]);
    }

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];
        updatedFormFields.splice(index, 1);
        setFormFields(updatedFormFields);

        const newTotal = updatedFormFields.reduce((sum, item) => {
            return sum + parseFloat(item.amount) || 0;
        }, 0);

        setData((prevData) => ({
            ...prevData,
            items: updatedFormFields,
            total: newTotal || 0,
        }));

    }
    //repeatable form fields end

    const handelReset = () => {
        setFormFields([
            // {
            //     account_group_id: "",
            //     ledger_id: "",
            //     amount: "",
            //     description: "",
            // }
        ]);

        // Reset data state
        setData({
            // receipt
            account_group_id: "",
            receipt_no: nextReceiptNo,
            payment_date_at: "",
            bank_ledger_id: "",
            description: "",
            // item
            items: [],
            total: 0,
        });

        setAccountGroupSelect(null);
        setPaymentDate(new Date());
        setPaymentMode({});
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();

        data.payment_date_at = paymentDate;

        post(route("ledger_payment.save"), {
            preserveScroll: true,
            onSuccess: () => {
                if (data?.is_print_receipt) {
                    const url = route('pdf_account.print_ledger_payment_receipt');

                    window.open(url);
                }

                reset();
                handelReset();
            },
            onError: (errors) => {
                for (const key in errors) {
                    if(key == 'items') {
                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        });
                    }
                }
            }
        });
    };

    // handle change payment mode start
    const handleChangePaymentMode = (value) => {
        setData((prevData) => ({
            ...prevData,
            bank_ledger_id: value
        }));

        const form_data = {
            bank_ledger_id: value
        }

        router.post(route('ledger_payment'), form_data);
    }
    // handle change payment mode end

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="educare-common-card">
                    <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-school-form-action-title mb-3">
                            <h5>
                                Payment
                            </h5>
                        </div>
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="receipt_no"
                                            value="Receipt No."
                                        />
                                        <TextInput
                                            id="receipt_no"
                                            value={data.receipt_no}
                                            // onChange={(e) =>
                                            //     setData(
                                            //         "receipt_no",
                                            //         e.target.value
                                            //     )
                                            // }
                                            className="block cursor-not-allowed"
                                            type="text"
                                            disabled={true}
                                        />
                                        <InputError
                                            message={errors.receipt_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel value="Payment date" />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={paymentDate}
                                            onChange={(date) => setPaymentDate(date)}
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
                                            required
                                        />
                                        <InputError
                                            message={errors.payment_date_at}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
                                    <div className="lg:col-span-6 maxMd:col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        value="Account"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <div className="educare-input-type-file-styles">
                                                <SelectInput
                                                    id="bank_ledger_id"
                                                    data_label="Credit Ledger"
                                                    data={paymentModes}
                                                    value={data?.bank_ledger_id}
                                                    onChange={(e) => {
                                                        handleChangePaymentMode(e.target.value)
                                                    }}
                                                    type="text"
                                                    className="block"
                                                />
                                                {(paymentMode?.debit - paymentMode?.credit) > 0 &&
                                                    <div>
                                                        <p
                                                            className="text-sm"
                                                        >
                                                            Current balance :
                                                            <span
                                                                className="ml-1 font-semibold"
                                                            >
                                                                {(paymentMode?.debit - paymentMode?.credit)?.toFixed(2)} Dr
                                                            </span>
                                                        </p>
                                                    </div>
                                                }

                                                {((paymentMode?.debit - paymentMode?.credit) < 0) &&
                                                    <div>
                                                        <p
                                                            className="text-sm"
                                                        >
                                                            Current balance :
                                                            <span
                                                                className="ml-1 font-semibold text-danger"
                                                            >
                                                                {(paymentMode?.credit - paymentMode?.debit)?.toFixed(2)} Cr
                                                            </span>
                                                        </p>
                                                    </div>
                                                }
                                                <InputError
                                                    message={errors.bank_ledger_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        {/* <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                        /> */}
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Narration"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
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
                                    <div className="py-3 pt-0">
                                        <div className="flex gap-4 items-center justify-between w-full">
                                            <div className="educare-card-title pb-none">
                                                <h5>
                                                    <i className="icon-ListBullets"></i>
                                                    Ledger
                                                </h5>
                                            </div>
                                            <div className="educare-classroom-button-wrapper">
                                                <div className="flex">
                                                    <PrimaryButton
                                                        type="button"
                                                        className="educare-dark-btn-md-fill"
                                                        onClick={addFields}
                                                    >
                                                        <i className="icon-PlusCircle"></i>Add ledger
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="educare-admission-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Ledger Group</th>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            Ledger
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Description</th>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            Amount
                                                            <sup>*</sup>
                                                        </div>
                                                    </div></th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formFields?.length > 0 ?
                                                formFields?.map((item, index) => (
                                                    <tr key={index} className="align-top">
                                                        <td>
                                                            <div className="educare-input-type-file-styles min-w-[300px]">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    options={ledgerGroupTitles}
                                                                    value={item?.label}
                                                                    onChange={(event, value) => handleFormChange(event, index, "account_group_id", value?.id)}
                                                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select ledger group' />}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`items.${index}.account_group_id`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-type-file-styles min-w-[300px]">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    options={item?.account_group_id ? ledgerTitles?.filter(ledgerTitle => ledgerTitle?.account_group_id == item?.account_group_id) : ledgerTitles}
                                                                    value={item?.label}
                                                                    required
                                                                    onChange={(event, value) => handleFormChange(event, index, "ledger_id", value?.id)}
                                                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select ledger' />}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`items.${index}.ledger_id`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            {(ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.debit - ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.credit) > 0 &&
                                                                <div>
                                                                    <p
                                                                        className="text-sm"
                                                                    >
                                                                        Current balance :
                                                                        <span
                                                                            className="ml-1 font-semibold"
                                                                        >
                                                                            {(ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.debit - ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.credit)?.toFixed(2)} Dr
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            }
                                                            {((ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.debit - ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.credit) <= 0 && (ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.credit - ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.debit) > 0) &&
                                                                <div>
                                                                    <p
                                                                        className="text-sm"
                                                                    >
                                                                        Current balance :
                                                                        <span
                                                                            className="ml-1 font-semibold text-danger"
                                                                        >
                                                                            {ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.credit - ledgerTitles?.find(ledgerTitle => ledgerTitle?.id == item?.ledger_id)?.debit?.toFixed(2)} Cr
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="description"
                                                                    onChange={(event) => handleFormChange(event, index, "description")}
                                                                    value={item.description}
                                                                    className="block"
                                                                    type="text"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`items.${index}.description`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="amount"
                                                                    value={item.amount}
                                                                    onChange={(event) => handleFormChange(event, index, "amount")}
                                                                    className="block"
                                                                    type="number"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`items.${index}.amount`]
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
                                                        <td>
                                                        </td>
                                                        <td>
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
                                                            <span className="font-bold">Total amount</span>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="total"
                                                                    value={data.total.toFixed(2)}
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
                                                    <div className='flex flex-wrap gap-5 justify-end pr-5'>
                                                        <PrimaryButton
                                                            className="educare-gray-btn-lg-stroke"
                                                            type="button"
                                                            onClick={handelReset}
                                                            disabled={processing}
                                                        >
                                                            Reset
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            className="educare-primary-btn-lg-fill hidden"
                                                            type="submit"
                                                            disabled={processing}
                                                        >
                                                            Save
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

export default LedgerPaymentForm;
