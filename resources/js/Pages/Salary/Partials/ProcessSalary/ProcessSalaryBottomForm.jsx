import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import SuccessButton from "@/Components/SuccessButton";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";


const ProcessSalaryBottomForm = ({
    data,
    setData,
    errors,
    handlePaidAmountChange,
    setPayableAmount,
    setPaidAmount,
    paymentModes,
    banks,
    bankAccounts,
    handleSaveProcessSalary,
    showBonusInput,
    setShowBonusInput,
    advancePayment,
    setAdvancePayment
}) => {

    //handle and state for add bonus start
    // const [showBonusInput, setShowBonusInput] = useState(false);

    const handleToggleBonusClick = () => {
        setShowBonusInput(!showBonusInput);

        setPayableAmount((prevAmount) => prevAmount - data?.bonus_amount);
        setPaidAmount((prevAmount) => prevAmount - data?.bonus_amount);

        setData((prevData) => ({
            ...prevData,
            bonus_amount: 0,
        }));
    };

    const buttonText = showBonusInput ? 'Cancel Bonus' : 'Add Bonus';

    const handleCancelBonusClick = () => {
        setShowBonusInput(false);

        setPayableAmount((prevAmount) => prevAmount - data?.bonus_amount);
        setPaidAmount((prevAmount) => prevAmount - data?.bonus_amount);

        setData((prevData) => ({
            ...prevData,
            bonus_amount: 0,
        }));
    };
    //handle and state for add bonus start


    //advance payment start
    // const [advancePayment, setAdvancePayment] = useState(false);

    const handleToggleAdvanceClick = () => {
        setAdvancePayment(!advancePayment);

        setPayableAmount((prevAmount) => prevAmount - data?.advance_amount);
        setPaidAmount((prevAmount) => prevAmount - data?.advance_amount);

        setData((prevData) => ({
            ...prevData,
            advance_amount: 0,
        }));
    };
    const AdvanceButtonText = advancePayment ? 'Cancel Payment' : 'Advance Payment';

    const handleCancelAdvancePaymentClick = () => {
        setAdvancePayment(false);

        setPayableAmount((prevAmount) => prevAmount - data?.advance_amount);
        setPaidAmount((prevAmount) => prevAmount - data?.advance_amount);

        setData((prevData) => ({
            ...prevData,
            advance_amount: 0,
        }));
    };
    //advance paymentend

    //*************payment mode selected wise form state */
    //cheque
    const [chequeDate, setChequeDate] = useState();
    //Demand Draft
    // const [DdDate, setDdDate] = useState();

    //handle bottom form
    const handleBottomForm = (e) => {
        e.preventDefault();
    };

    // handle change bonus amount start
    const handleBonusAmountChange = (value) => {
        let amount = 0;

        if (isNaN(amount) || value == '') {
            amount = 0;
        } else if (String(amount)?.includes('.')) {
            amount = parseInt(String(amount)?.split('.')[0] ?? 0);
        } else {
            amount = parseInt(value);
        }

        setPayableAmount((prevAmount) => (prevAmount - (data?.bonus_amount ?? 0)) + amount);
        setPaidAmount((prevAmount) => (prevAmount - (data?.bonus_amount ?? 0)) + amount);

        setData((prevData) => ({
            ...prevData,
            bonus_amount: amount
        }));
    };
    // handle change bonus amount end

    // handle reset start
    const handleReset = () => {
        router.get(route('salary.process'));
    }
    // handle reset end

    // handle change advance amount start
    const handleAdvanceAmountChange = (value) => {
        let amount = 0;

        if (isNaN(amount) || value == '') {
            amount = 0;
        } else if (String(amount)?.includes('.')) {
            amount = parseInt(String(amount)?.split('.')[0] ?? 0);
        } else {
            amount = parseInt(value);
        }

        setPayableAmount((prevAmount) => (prevAmount - (data?.advance_amount ?? 0)) + amount);
        setPaidAmount((prevAmount) => (prevAmount - (data?.advance_amount ?? 0)) + amount);

        setData((prevData) => ({
            ...prevData,
            advance_amount: amount
        }));
    };
    // handle change advance amount end


    return (
        <>
            {/*bonus and advance payment start*/}
            {data?.payment_month_id &&
                <div className="flex flex-wrap justify-between gap-2 my-2">
                    <div>
                        <PrimaryButton
                            className={`educare-primary-btn-md-fill ${showBonusInput ? 'hidden' : ''}`}
                            onClick={handleToggleBonusClick}
                        >
                            {buttonText}
                        </PrimaryButton>
                    </div>
                    <div>
                        <SuccessButton
                            // disabled={processing}
                            className="educare-secondary-btn-md-fill"
                            onClick={handleToggleAdvanceClick}
                        >
                            {AdvanceButtonText}
                        </SuccessButton>
                    </div>
                </div>
            }

            <div className="educare-classroom-form-area">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <tbody>
                                {/*Add Bonus input box*/}
                                {showBonusInput && (
                                    <tr>
                                        <td>
                                            <h5 className="font-bold text-headingLight">Add Bonus Amount</h5>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={
                                                                data?.bonus_amount
                                                            }
                                                            onChange={(e) =>
                                                                handleBonusAmountChange(e.target.value)
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.bonus_amount
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="Cancel"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <button
                                                            className="educare-danger-btn-md-fill"
                                                            onClick={handleCancelBonusClick}
                                                        >
                                                            X
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {/*Advance Payment input box*/}
                                {advancePayment && (
                                    <tr>
                                        <td>
                                            <h5 className="font-bold text-headingLight">Add Advance Amount</h5>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={
                                                                data?.advance_amount
                                                            }
                                                            onChange={(e) =>
                                                                handleAdvanceAmountChange(e.target.value)
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.advance_amount
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="Cancel"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <button
                                                            className="educare-danger-btn-md-fill"
                                                            onClick={handleCancelAdvancePaymentClick}
                                                        >
                                                            X
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*bonus and advance payment end*/}

            {/* payment mode start*/}

            <form onSubmit={handleBottomForm}>
                <div className="educare-common-card mt-2">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="payment_mode"
                                                    value="Payment Mode"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            id="payment_mode"
                                            data_label="Payment Mode"
                                            data={paymentModes}
                                            value={data.payment_mode}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_mode",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.payment_mode}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="payment_date"
                                                    value="Payment Date"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={
                                                data?.payment_date
                                                    ? new Date(
                                                        data?.payment_date
                                                    )
                                                    : new Date()
                                            }
                                            onChange={(date) =>
                                                setData("payment_date", date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* If Enable Bank Process Start */}
                                {data.payment_mode === "Bank Process" ? (
                                    <div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="bank_account_id"
                                                        value="Account Name"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="bank_account_id"
                                                data_label="Account"
                                                data={bankAccounts}
                                                value={data.bank_account_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "bank_account_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.bank_account_id}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {/* If Enable Bank Process End */}

                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="payable_amount"
                                                    value="Amount Payable"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <TextInput
                                            id="payable_amount"
                                            value={data?.payable_amount}
                                            placeHolder="Disable Input"
                                            disabled={true}
                                            className={`block disabled`}
                                        />
                                        <InputError
                                            message={errors.payable_amount}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="paid_amount"
                                                    value="Amount Paid"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <TextInput
                                            id="paid_amount"
                                            placeHolder="Amount Paid"
                                            value={data?.paid_amount}
                                            onChange={(e) =>
                                                handlePaidAmountChange(e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.paid_amount}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="due_amount"
                                                    value="Due Amount"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <TextInput
                                            id="due_amount"
                                            value={data?.due_amount}
                                            placeHolder="Due Amount"
                                            disabled={true}
                                            className={`block disabled`}
                                        />
                                        <InputError
                                            message={errors.due_amount}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12 mb-5">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="payment_note"
                                            value="Note"
                                        />
                                        <TextareaInput
                                            id="payment_note"
                                            value={data.payment_note}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_note",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.payment_note}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* If Enable Cheque Start */}
                            {data.payment_mode === "Cheque" ? (
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-4">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="cheque_no"
                                                            value="Cheque No."
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    value={data.cheque_no}
                                                    onChange={(e) =>
                                                        setData(
                                                            "cheque_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Cheque No*"
                                                />
                                                <InputError
                                                    message={
                                                        errors.cheque_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-4">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Date"
                                                        />
                                                    </div>
                                                </div>
                                                <DatePicker
                                                    selected={chequeDate}
                                                    onChange={(date) =>
                                                        setChequeDate(date)
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Date*"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="col-span-12 md:col-span-4">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="amount"
                                                            value="Amount"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    value={data.amount}
                                                    onChange={(e) =>
                                                        setData(
                                                            "amount",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Amount*"
                                                />
                                                <InputError
                                                    message={errors.amount}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div> */}
                                        <div className="col-span-12 md:col-span-8">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="bank_id"
                                                            value="Bank Name"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    id="bank_id"
                                                    data_label="Bank"
                                                    data={banks}
                                                    value={data.bank_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "bank_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.bank_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-4">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Branch Detail"
                                                        />
                                                    </div>
                                                </div>
                                                <TextInput
                                                    value={data.branch}
                                                    onChange={(e) =>
                                                        setData(
                                                            "branch",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Branch*"
                                                />
                                                <InputError
                                                    message={errors.branch}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            {/* If Enable Cheque End */}

                            {/* If Enable Demand Draft Start */}
                            {/* {data.payment_mode === "DemandDraft" ? (
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={data.dd_bank}
                                                    onChange={(e) =>
                                                        setData(
                                                            "dd_bank",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="DdBank*"
                                                />
                                                <InputError
                                                    message={errors.dd_bank}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={data.dd_number}
                                                    onChange={(e) =>
                                                        setData(
                                                            "dd_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="DdNumber*"
                                                />
                                                <InputError
                                                    message={
                                                        errors.dd_number
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={DdDate}
                                                    onChange={(date) =>
                                                        setDdDate(date)
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="DdDate*"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={data.dd_amount}
                                                    onChange={(e) =>
                                                        setData(
                                                            "dd_amount",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Amount*"
                                                />
                                                <InputError
                                                    message={
                                                        errors.dd_amount
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )} */}
                            {/* If Enable Demand Draft End */}

                            {/* If Enable Paytm Start */}
                            {/* {data.payment_mode === "Paytm" ? (
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.paytm_ref_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "paytm_ref_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Paytm Ref. No*"
                                                />
                                                <InputError
                                                    message={
                                                        errors.paytm_ref_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.paytm_mobile
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "dd_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Paytm Mobile*"
                                                />
                                                <InputError
                                                    message={
                                                        errors.dd_number
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )} */}
                            {/* If Enable Paytm End */}

                            {/* If Enable Neft Start */}
                            {/* {data.payment_mode === "Neft" ? (
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={data.neft_number}
                                                    onChange={(e) =>
                                                        setData(
                                                            "neft_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Neft Number*"
                                                />
                                                <InputError
                                                    message={
                                                        errors.neft_number
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={data.neft_desc}
                                                    onChange={(e) =>
                                                        setData(
                                                            "neft_desc",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Neft Desc*"
                                                />
                                                <InputError
                                                    message={
                                                        errors.neft_desc
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )} */}
                            {/* If Enable Neft End */}

                            {/* If Enable UPI Start */}
                            {/* {data.payment_mode === "UPI" ? (
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.upi_transection_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "upi_transection_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="UPI Transection ID*"
                                                />
                                                <InputError
                                                    message={
                                                        errors.upi_transection_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.upi_description
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "upi_description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="UPI Description*"
                                                />
                                                <InputError
                                                    message={
                                                        errors.upi_description
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )} */}
                            {/* If Enable UPI End */}




                            {/* Process Draft salary Button*/}
                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-5 justify-end">
                                    <PrimaryButton
                                        className="educare-gray-btn-lg-stroke"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="button"
                                        onClick={handleSaveProcessSalary}
                                    >
                                        Process Draft Salary
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* payment mode end*/}
        </>
    );
};

export default ProcessSalaryBottomForm;
