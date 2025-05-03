// const BulkProcessSalaryForm = ({totalEarning}) =>

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BulkProcessDraftSalaryPopup from "./popup/BulkProcessDraftSalaryPopup";

const BulkProcessSalaryForm = ({
    totalPayable,
    totalDeduction,
    totalEarning,
    paymentModes,
    banks,
    bankAccounts,
    staffEarningData,
    setStaffIds,
    paymentMonthId,
    staffCategoryId,
    staffSubCategoryId
}) => {

    const [bulkProcessPopup, setBulkProcessPopup] = useState(false);

    const {
        data,
        setData,
        errors,
        reset,
        clearErrors,
        post
    } = useForm({
        payment_month_id: "",
        staff_earnings: staffEarningData,
        payment_mode: "",
        payment_date: new Date(),
        payment_note: "",

        // cheque
        cheque_no: "",
        cheque_date: "",
        bank_id: "",
        branch: "",
        //bank process
        bank_account_id: "",

        //select payment mode
        // school_receipt_no: "",
        //Bank Process form
        // bank_account_id: "",
        //Demand Draft
        // dd_bank: "",
        // dd_number: "",
        // dd_amount: "",
        //Paytm
        // paytm_ref_no: "",
        // paytm_mobile: "",
        //Neft
        // neft_number: "",
        // neft_desc: "",
        //Online Back Office
        // transection_id: "",
        //UPI
        // upi_description: "",
        // upi_transection_id: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            staff_earnings: staffEarningData
        }));
    }, [staffEarningData]);

    /// handle reset start
    const handleReset = () => {
        reset();
        clearErrors();
        setStaffIds([]);
    }
    /// handle reset end

    // handle bulk process salary start
    const handleBulkProcessSalary = (e) => {
        e.preventDefault();

        data.payment_month_id = paymentMonthId;

        post(route('salary.bulk_process_salary.save'), {
            onSuccess:() => {
                handleReset();
            },
            onFinish:() => {
                setBulkProcessPopup(false);

                const form_data = {
                    ...data,
                    payment_month_id: paymentMonthId,
                    staff_category_id: staffCategoryId,
                    staff_sub_category_id: staffSubCategoryId
                }

                router.post(route('salary.bulk_process_salary'), form_data);
            }
        });
    }
    // handle bulk process salary end

    const handleBulkProcessPopupClick = () => {
        if (!paymentMonthId) {
            toast.error("Please select month!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            setBulkProcessPopup(!bulkProcessPopup);
        }
    };

    return (
        <>
            <div className="educare-header-filtar-bar-count mr-auto mb-5">
                <span>Selected Staff: {staffEarningData?.length}</span>
            </div>

            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 md:col-span-6">
                                <strong className="text-headingLight">Total Earning</strong>
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="total_earning"
                                        value={
                                            totalEarning
                                        }
                                        className="block"
                                        disabled={true}
                                    />
                                    <InputError
                                        message={errors.total_earning}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <strong className="text-headingLight">Total Deduction</strong>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="total_deducation"
                                        value={
                                            totalDeduction
                                        }
                                        className="block"
                                        disabled={true}
                                    />
                                    <InputError
                                        message={errors.total_deducation}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <strong className="text-headingLight">Total Payable</strong>
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="total_payable"
                                        value={
                                            totalPayable
                                        }
                                        className="block"
                                        disabled={true}
                                    />
                                    <InputError
                                        message={errors.total_payable}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 xl:col-span-4">
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
                            <div className="col-span-12 md:col-span-6 xl:col-span-4">
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

                            {/* If Enable Bank Process Start */}
                            {data.payment_mode === "Bank Process" ? (
                                <div className="col-span-12 md:col-span-6 xl:col-span-4">
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
                                                    selected={new Date()}
                                                    // onChange={(date) =>
                                                    //     setChequeDate(date)
                                                    // }
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
                                        onClick={handleBulkProcessPopupClick}
                                        className="educare-primary-btn-lg-fill"
                                        type="button"
                                        disabled={staffEarningData?.length == 0}
                                    >
                                        Bulk - Process draft salary
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BulkProcessDraftSalaryPopup
                bulkProcessPopup={bulkProcessPopup}
                setBulkProcessPopup={setBulkProcessPopup}
                handleBulkProcessSalary={handleBulkProcessSalary}
            />
        </>
    );
};

export default BulkProcessSalaryForm;
