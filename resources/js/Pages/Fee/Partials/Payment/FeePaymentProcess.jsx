import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';

export default function FeePaymentProcess({
    paymentModes = [],
    banks = [],
    studentId = null,
    feeInstallmentsDataArray = [],
    feePaymentType,
    setFeeInstallmentsDataArray,
    getStudentFeeInstallments,
    bankAccounts = [],
    totalPaidAmount,
    totalDiscountAmount,
    feeReceiptPageSize,
    feeReceiptCopy,
    setSelectedFeeIds,
    setSelectedInstallments,
    isBackDateAllowed
}) {
    const [paymentDate, setPaymentDate] = useState(new Date());
    //cheque
    const [chequeDate, setChequeDate] = useState();
    //Demand Draft
    const [ddDate, setDdDate] = useState();

    const { data, setData, errors, post, reset, processing , setError, clearErrors} = useForm({
        fee_payment_type: feePaymentType,
        fee_installments_array: feeInstallmentsDataArray,
        student_id: studentId,
        discount_id: null,
        payment_mode: "Cash",
        payment_date: "",
        school_receipt_no: "",
        payment_note: "",
        keep_same_payment_detail: "",
        //cheque
        cheque_no: "",
        cheque_date: "",
        cheque_amount: totalPaidAmount ?? "",
        bank_id: "",
        branch: "",
        //Bank Process form
        bank_account_id: "",
        //Demand Draft
        dd_bank: "",
        dd_number: "",
        dd_date: "",
        dd_amount: totalPaidAmount ?? "",
        //Paytm
        paytm_ref_no: "",
        paytm_mobile: "",
        //Neft
        neft_number: "",
        neft_desc: "",
        //Online Back Office
        transaction_id: "",
        //UPI
        upi_description: "",
        upi_transaction_id: "",
    });


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            cheque_amount: totalPaidAmount,
            dd_amount: totalPaidAmount
        }));
    }, [totalPaidAmount]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            fee_payment_type: feePaymentType
        }));
    }, [feePaymentType]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId
        }));
    }, [studentId]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            fee_installments_array: feeInstallmentsDataArray
        }));
    }, [feeInstallmentsDataArray]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            payment_date: paymentDate
        }));
    }, [paymentDate]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            cheque_date: chequeDate
        }));
    }, [chequeDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            dd_date: ddDate
        }));
    }, [ddDate]);


    //hanlde form reset start
    const handleReset = () => {
        if (!data?.keep_same_payment_detail) {
            reset();
            setPaymentDate(new Date());
            setChequeDate();
            setDdDate();
        }
        else {
            const paymentMode = data?.payment_mode;
            const keepPaymentDetails = data?.keep_same_payment_detail;

            reset();

            setData((prevData) => ({
                ...prevData,
                payment_mode: paymentMode,
                keep_same_payment_detail: keepPaymentDetails
            }));

            setChequeDate();
            setDdDate();
            data.fee_installments_array = [];
        }

        setSelectedFeeIds([]);
        setSelectedInstallments({
            fee_installment: [],
            general_voucher: [],
            transport_voucher: [],
        });
        setFeeInstallmentsDataArray([]);
        clearErrors();
    }
    //hanlde form reset end


    // show error toast message start
    const showErrorToastMessage = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 1500,
        });
    }
    // show error toast message end


    // hanlde fee pyment form submit start
    const handlePaymentProcessData = (e) => {
        e.preventDefault();

        if (data?.fee_installments_array?.length <= 0) {
            showErrorToastMessage("Please select at least one fee installment.");
        }
        else if (totalPaidAmount <= 0 && totalDiscountAmount <= 0) {
            showErrorToastMessage("Paid amount cannot be empty.");
        }
        else if (
            data?.payment_mode == "" ||
            data?.payment_date == "" ||
            (data?.payment_mode == "Cheque" && ( data?.bank_id == "" || data?.cheque_no == "" || data?.cheque_date == "" || data?.cheque_amount == "" || data?.bank_id == "" || data?.branch == "")) ||
            (data?.payment_mode == "Bank Process" && data?.bank_account_id == "") ||
            (data?.payment_mode == "Demand Draft" && (data?.dd_bank == "" ||data?.dd_number == "" || data?.dd_date == "" || data?.dd_amount == "")) ||
            (data?.payment_mode == "Paytm" && (data?.paytm_ref_no == "" || data?.paytm_mobile == "")) ||
            (data?.payment_mode == "Neft" && ( data?.neft_number == "" || data?.neft_desc == "")) ||
            (data?.payment_mode == "Online Back Office" && data?.transaction_id == "") ||
            (data?.payment_mode == "UPI" && (data?.upi_transaction_id == "" || data?.upi_description == ""))
        ) {
            showErrorToastMessage("Required fields cannot be empty.");
        }
        else if (
            (data?.payment_mode == "Cheque" && data?.cheque_amount != totalPaidAmount) ||
            (data?.payment_mode == "Demand Draft" && data?.dd_amount != totalPaidAmount)
        ) {
            showErrorToastMessage("Paid amount should match with given amount.");
        }
        else if (data?.school_receipt_no != '' && isNaN(data?.school_receipt_no)) {
            setError('school_receipt_no', 'The school receipt no field must be an integer.');
        }
        else {
            post(route("fee.save_fee_payment"), {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    const form_data = {
                        student_id: studentId,
                        request_type: "fetch_fee_installments",
                    }

                    getStudentFeeInstallments(form_data);

                    let url = route('pdf_fee.student_payment_receipt');
                    // const id = 32; // need to work on this

                    // if (id != null || id != "") {
                    //     if (feeReceiptPageSize == "Small" && feeReceiptCopy != "Single") {
                    //         url = route('pdf_fee.student_paid_small', id);
                    //     }
                    //     else if (feeReceiptPageSize == "Small" && feeReceiptCopy == "Single") {
                    //         url = route('pdf_fee.student_paid_single_small', id);
                    //     }
                    //     else if (feeReceiptPageSize == "Large" && feeReceiptCopy != "Single") {
                    //         url = route('pdf_fee.student_paid_large', id);
                    //     }
                    //     else if (feeReceiptPageSize == "Large" && feeReceiptCopy == "Single") {
                    //         url = route('pdf_fee.student_paid_single_large', id);
                    //     }
                    // }

                    if (url != "") {
                        setTimeout(() => {
                            window.open(url, '_blank')
                        }, 1000);
                    }

                    handleReset();
                },
                onError: (errors) => {
                    if (errors['fee_installments_array'] != "") {
                        showErrorToastMessage(errors['fee_installments_array'])
                    }

                    const form_data = {
                        student_id: studentId,
                        request_type: "fetch_fee_installments",
                    }

                    getStudentFeeInstallments(form_data);
                },
            });
        }
    };
    // hanlde fee pyment form submit start

    return (
        <>
            <form onSubmit={handlePaymentProcessData}>
                <div className="educare-common-card mt-5">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6">
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
                                            onChange={(e) => {
                                                setData(
                                                    "payment_mode",
                                                    e.target.value
                                                );
                                            }}
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.payment_mode}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
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
                                            selected={paymentDate}
                                            onChange={(date) =>
                                                setPaymentDate(date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable={false}
                                            placeholderText="Payment Date"
                                            className="w-full"
                                            dateFormat="dd/MM/yyyy"
                                            maxDate={new Date()}
                                            minDate={isBackDateAllowed ? null : new Date()}
                                        />
                                        <InputError
                                            message={errors.payment_date}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* If Enable Bank Process Start */}
                                {data.payment_mode === "Bank Process" ? (
                                    <div className="col-span-12">
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

                                {/* If Enable Online Back Office start */}
                                {data.payment_mode === "Online Back Office" ? (
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={
                                                            data.transaction_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "transaction_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        placeHolder="Transaction ID*"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.transaction_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <button
                                                        type="button"
                                                        // disabled={processing}
                                                        className="educare-secondary-btn-md-fill"
                                                    >
                                                        <i className="icon-FileSearch"></i>{" "}
                                                        Check
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {/* If Enable Online Back Office End */}

                                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            value={data.school_receipt_no}
                                            onChange={(e) =>
                                                setData(
                                                    "school_receipt_no",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeHolder="School Receipt No"
                                        />
                                        <InputError
                                            message={errors.school_receipt_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-8 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="payment_note"
                                            value={data.payment_note}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_note",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeHolder="Payment Note"
                                        />
                                        <InputError
                                            message={errors.payment_note}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* If Enable Cheque Start */}
                                {data.payment_mode === "Cheque" ? (
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
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
                                                        placeholderText="Date*"
                                                        className="w-full"
                                                        dateFormat="dd/MM/yyyy"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={data.cheque_amount}
                                                        onChange={(e) =>
                                                            setData(
                                                                "cheque_amount",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        placeHolder="Amount*"
                                                    />
                                                    <InputError
                                                        message={errors.cheque_amount}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
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
                                                    <div className="educare-input-type-file-styles">
                                                        <Autocomplete
                                                            disablePortal
                                                            options={banks}
                                                            getOptionLabel={(option) => option.title ?? ''}
                                                            value={data?.bank_id != null &&
                                                                ({
                                                                    "id": data?.bank_id,
                                                                    "title": banks?.find(bank => bank.id == data?.bank_id)?.title,
                                                                })
                                                            }
                                                            onChange={(e, value) => {
                                                                setData(
                                                                    "bank_id",
                                                                    value?.id
                                                                )
                                                            }}
                                                            renderInput={(
                                                                params
                                                            ) => (
                                                                <TextField
                                                                    {...params}
                                                                    placeholder="Select Bank"
                                                                />
                                                            )}
                                                        />
                                                    </div>

                                                    {/* do not remove */}
                                                    {/* <SelectInput
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
                                                    /> */}
                                                    <InputError
                                                        message={errors.bank_id}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="h-full flex items-end">
                                                    <div className="educare-input-field-styles">
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
                                    </div>
                                ) : (
                                    ""
                                )}
                                {/* If Enable Cheque End */}

                                {/* If Enable Demand Draft Start */}
                                {data.payment_mode === "Demand Draft" ? (
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
                                                        selected={ddDate}
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
                                                        placeholderText="DdDate*"
                                                        className="w-full"
                                                        dateFormat="dd/MM/yyyy"
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
                                )}
                                {/* If Enable Demand Draft End */}

                                {/* If Enable Paytm Start */}
                                {data.payment_mode === "Paytm" ? (
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
                                )}
                                {/* If Enable Paytm End */}

                                {/* If Enable Neft Start */}
                                {data.payment_mode === "Neft" ? (
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
                                )}
                                {/* If Enable Neft End */}

                                {/* If Enable UPI Start */}
                                {data.payment_mode === "UPI" ? (
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={
                                                            data.upi_transaction_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "upi_transaction_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        placeHolder="UPI Transaction ID*"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.upi_transaction_id
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
                                )}
                                {/* If Enable UPI End */}

                                <div className="col-span-12">
                                    <div className="educare-create-school-settings-list flex-nowrap educare-create-school-settings-list-document">
                                        <div className="translate-y-[-1px] inline-block">
                                            <Checkbox
                                                id="keep_same_payment_detail"
                                                name="keep_same_payment_detail"
                                                checked={
                                                    data.keep_same_payment_detail
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "keep_same_payment_detail",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="keep_same_payment_detail"
                                                value="Keep same payment detail for the next fee payment"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-wrap gap-2.5">
                                        <PrimaryButton
                                            type="button"
                                            className="educare-gray-btn-lg-stroke"
                                            onClick={() => {
                                                reset();
                                                clearErrors();
                                            }}
                                        >
                                            Reset
                                        </PrimaryButton>
                                        <PrimaryButton
                                            type="submit"
                                            disabled={processing}
                                            className="educare-primary-btn-lg-fill"
                                        >
                                            Take Fee
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
