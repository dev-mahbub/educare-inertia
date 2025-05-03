import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import DatePicker from "react-datepicker";

const LedgerReceiptForm = ({
    accountGroupTitles = [],
    ledgerGroupTitles = [],
    ledgerTitles = [],
}) => {
    const [receiptDate, setReceiptDate] = useState(new Date());
    const [accountGroupSelect, setAccountGroupSelect] = useState(null);
    const [formFields, setFormFields] = useState([
        {
            ledger_group: "",
            ledger: "",
            amount: "",
            description: "",
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
        receipt_date_at: "",
        description: "",
        // item
        items: formFields,
        total: 0,
    });

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
            ledger_group: "",
            ledger: "",
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
            {
                ledger_group: "",
                ledger: "",
                amount: "",
                description: "",
            },
        ]);

        // Reset data state
        setData({
            // receipt
            account_group_id: "",
            receipt_no: "",
            receipt_date_at: "",
            description: "",
            // item
            items: [],
            total: 0,
        });

        setAccountGroupSelect(null);
        setReceiptDate(new Date());
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        data.receipt_date_at = receiptDate;
        post(route("ledger_receipt.save"), {
            preserveScroll: true,
            onSuccess: () => {
                handelReset();
                reset();
            },
        });
    };

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="educare-common-card mb-5">
                    <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
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
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel value="Receipt date" />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={receiptDate}
                                            onChange={(date) => setReceiptDate(date)}
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
                                            message={errors.receipt_date_at}
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
                                                        value="Account group"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <div className="educare-input-type-file-styles">
                                                <Autocomplete
                                                    disablePortal
                                                    options={accountGroupTitles}
                                                    value={accountGroupSelect}
                                                    onChange={handleAccountGroupTitle}
                                                    required
                                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select account group' />}
                                                />
                                                <InputError
                                                    message={errors.account_group_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
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
                                    <div className="py-3 pt-0">
                                        <div className="flex flex-wrap justify-between gap-2.5">
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
                                                        <i className="icon-PlusCircle"></i> Add ledger
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
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-input-type-file-styles min-w-[300px]">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    options={ledgerGroupTitles}
                                                                    value={item?.label}
                                                                    onChange={(event, value) => handleFormChange(event, index, "ledger_group", value)}
                                                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select ledger group' />}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-type-file-styles min-w-[300px]">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    options={ledgerTitles}
                                                                    value={item?.label}
                                                                    required
                                                                    onChange={(event, value) => handleFormChange(event, index, "ledger", value)}
                                                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select ledger' />}
                                                                />
                                                            </div>
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
                                                                        errors.description
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
                                                                        errors.amount
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

export default LedgerReceiptForm;
