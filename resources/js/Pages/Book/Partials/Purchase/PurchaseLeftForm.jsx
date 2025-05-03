import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import DatePicker from "react-datepicker";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import SelectInput from "@/Components/SelectInput";
import PurchaseLeftFormPopup from "./PurchaseLeftFormPopup";

const PurchaseLeftForm = ({
    bookTypes = [],
    paymentMode = [],
    data,
    setData,
    errors,
    post,
    reset,
    processing,
    libraryVendor = [],
    bankNames = [],
}) => {

    const [listPopup, setListPopup] = useState(false);
    const handleListPopupClick = () => {
        setListPopup(!listPopup);
    };

    return (
        <>
            <div className="educare-common-card">
                <div className="educare-common-card-title mb-3">
                    <h5>
                        <i className="icon-Notebook"></i>
                        Book Purchase
                    </h5>
                </div>
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="bill_number"
                                                value="Bill Number"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="bill_number"
                                        value={data.bill_number}
                                        onChange={(e) =>
                                            setData(
                                                "bill_number",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        required
                                    />
                                    <InputError
                                        message={errors.bill_number}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel value="Purchase Date" />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <DatePicker
                                        selected={
                                            data.purchase_date_at &&
                                            new Date(data.purchase_date_at)
                                        }
                                        onChange={(date) =>
                                            setData("purchase_date_at", date)
                                        }
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
                                        message={errors.purchase_date_at}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="vendor"
                                        value="Vendor"
                                    />
                                    <SelectInput
                                        id="library_vendor_id"
                                        data_label="vendor"
                                        data={libraryVendor}
                                        value={data.library_vendor_id}
                                        onChange={(e) =>
                                            setData(
                                                "library_vendor_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.library_vendor_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="purchase_by"
                                        value="Purchased By"
                                    />
                                    <TextInput
                                        id="purchase_by"
                                        value={data.purchase_by}
                                        onChange={(e) =>
                                            setData(
                                                "purchase_by",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.purchase_by}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="book_type_id"
                                        value="Book Type"
                                    />
                                    <SelectInput
                                        id="book_type_id"
                                        data_label="Book Type"
                                        data={bookTypes}
                                        value={data.book_type_id}
                                        onChange={(e) =>
                                            setData(
                                                "book_type_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.book_type_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                <button
                                    onClick={handleListPopupClick}
                                    className="transition ease-in-out duration-150 undefined educare-success-btn-md-fill mt-7"
                                    type="button"
                                >
                                    <i className="icon-PlusCircle"></i>
                                    Add Book Type
                                </button>
                            </div>
                            {/*Payment mode start*/}
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
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
                                        data={paymentMode}
                                        value={data.payment_mode}
                                        onChange={(e) =>
                                            setData(
                                                "payment_mode",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        required
                                    />
                                    <InputError
                                        message={errors.payment_mode}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            {/* If Enable Bank Process Start */}
                            {data.payment_mode === "Bank Process" ? (
                                <>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="transaction_no"
                                                        value="Transaction No"
                                                    />
                                                </div>
                                            </div>
                                            <TextInput
                                                id="transaction_no"
                                                value={data.transaction_no}
                                                onChange={(e) =>
                                                    setData(
                                                        "transaction_no",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.transaction_no}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
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
                                                    setData(
                                                        "amount",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                required
                                                type="number"
                                            />
                                            <InputError
                                                message={errors.amount}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                            {/* If Enable Bank Process End */}
                            {/* If Enable Cheque Start */}
                            {data.payment_mode === "Cheque" ? (
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
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
                                                    placeHolder="Cheque No"
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors.cheque_no
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
                                                            value="Date"
                                                        />
                                                    </div>
                                                </div>
                                                <DatePicker
                                                    selected={data?.cheque_date_at}
                                                    onChange={(date) => setData('cheque_date_at', date)}
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
                                        <div className="col-span-12 md:col-span-6">
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
                                                    placeHolder="Amount"
                                                    required
                                                    type="number"
                                                />
                                                <InputError
                                                    message={errors.amount}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
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
                                                    data={bankNames}
                                                    value={data.bank_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "bank_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.bank_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-12">
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
                                                    placeHolder="Branch"
                                                    required
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

                            {/*Payment mode end*/}
                            <div className="col-span-12">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="purchase_note"
                                        value="Purchase Note"
                                    />
                                    <TextareaInput
                                        id="purchase_note"
                                        value={data.purchase_note}
                                        onChange={(e) =>
                                            setData(
                                                "purchase_note",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.purchase_note}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <PrimaryButton type="button" disabled={processing} className="educare-gray-btn-lg-stroke">
                                        Reset
                                    </PrimaryButton>
                                    <PrimaryButton type="submit"  disabled={processing} className="educare-primary-btn-lg-fill">
                                        Save
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PurchaseLeftFormPopup
                listPopup={listPopup}
                setListPopup={setListPopup}
                bookTypes={bookTypes}
            />
        </>
    );
};

export default PurchaseLeftForm;
