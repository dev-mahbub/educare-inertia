// export default AdvancePaymentForm;

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";

import SelectInput from "@/Components/SelectInput";
import { useEffect } from "react";

const AdvancePaymentForm = ({
    staffs,
    paymentModes,
    banks,
    paymentMonths,
    setStaffAdvancePaymentsData,
    setStaffId
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        staff_id: "",
        payment_month_id: "",
        payment_mode: "",
        amount: "",
        payment_date: new Date(),
        payment_note: "",
        cheque_no: "",
        cheque_date: "",
        bank_id: "",
        branch: "",
    });

    useEffect(() => {
        setStaffId(data.staff_id);
    }, [data.staff_id]);

    // handle change payment mode start
    const handlePaymentModeChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            payment_mode: value,
            cheque_no: "",
            cheque_date: "",
            bank_id: "",
            branch: "",
        }));
    }
    // handle change payment mode end

    // handle change staff start
    const handleChangeStaff = (value) => {
        setData((prevData) => ({
            ...prevData,
            staff_id: value
        }));

        const form_data = {
            staff_id: value
        }

        // router.post(route('salary.advance_payment'), form_data);
        handleFilterPaymentData(form_data);
    }
    // handle change staff end

    // handle change  amount start
    const handleAmountChange = (value) => {
        let amount = '';

        if (isNaN(value) || value == '') {
            amount = '';
        } else if (String(amount)?.includes('.')) {
            amount = parseInt(String(amount)?.split('.')[0] ?? 0);
        } else {
            amount = parseInt(value);
        }

        setData((prevData) => ({
            ...prevData,
            amount: amount
        }));
    };
    // handle change  amount end

    // handle save advance payment start
    const handleSaveAdvancePayment = (e) => {
        e.preventDefault();

        post(route('salary.advance_payment.save'), {
            onSuccess: () => {
                const form_data = {
                    staff_id: data?.staff_id
                }

                handleFilterPaymentData(form_data);
            },
            onError: () => {
                const form_data = {
                    staff_id: data?.staff_id
                }

                handleFilterPaymentData(form_data);
            }
        })
    }
    // handle save advance payment end

    // handle reset start
    const handleReset = () => {
        setData((prevData) => ({
            ...prevData,
            staff_id: "",
            payment_month_id: "",
            payment_mode: "",
            amount: "",
            payment_date: new Date(),
            payment_note: "",
            cheque_no: "",
            cheque_date: "",
            bank_id: "",
            branch: "",
        }));

        setStaffAdvancePaymentsData([]);
    }
    // handle reset end

    // handle filter payment data start
    const handleFilterPaymentData = (form_data) => {
        router.post(route('salary.advance_payment'), form_data);
    }
    // handle filter payment data end

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Advance Payment of Staffs
                </h5>
            </div>

            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 md:col-span-6">
                                <div className="educare-input-field-styles">
                                    <SelectInput
                                        id="staff_id"
                                        data_label="Staff"
                                        data={staffs}
                                        value={data.staff_id}
                                        onChange={(e) =>
                                            handleChangeStaff(e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.staff_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <div className="educare-input-field-styles">
                                    <SelectInput
                                        id="payment_month_id"
                                        data_label="Month"
                                        data={paymentMonths}
                                        value={data.payment_month_id}
                                        onChange={(e) =>
                                            setData(
                                                "payment_month_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.payment_month_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

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
                                            handlePaymentModeChange(e.target.value)
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
                                                htmlFor="amount"
                                                value="Amount"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>

                                    <TextInput
                                        id="amount"
                                        value={data.amount}
                                        onChange={(e) =>
                                            handleAmountChange(e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.amount}
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
                                                ? new Date(data?.payment_date)
                                                : null
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
                                    <InputError
                                        message={errors.payment_date}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
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
                                                        {/* <sup>*</sup> */}
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
                                                    selected={
                                                        data?.cheque_date
                                                            ? new Date(data?.cheque_date)
                                                            : null
                                                    }
                                                    onChange={(date) =>
                                                        setData("cheque_date", date)
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
                                                        {/* <sup>*</sup> */}
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

                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <PrimaryButton
                                        className="educare-gray-btn-lg-stroke"
                                        type="button"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="button"
                                        onClick={handleSaveAdvancePayment}
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvancePaymentForm;
