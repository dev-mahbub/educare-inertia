import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SaleDueProcess({
    paymentModes,
    data,
    setData,
    setSelectedSaleLedger
}) {

    const [customErrors, setCustomErrors] = useState({});

    // handle take sale due payment start
    const handleTakeSaleDuePayment = (e) => {
        e.preventDefault();

        router.post(route("sale_due_payment.save"), data,{
            preserveScroll: true,
            onSuccess: () => {
                setSelectedSaleLedger({});

                const form_data = {
                    staff_id: data?.staff_id,
                    student_id: data?.student_id,
                    audience_type: data?.audience_type
                }

                router.post(route('sale_due_payment'), form_data);

                let url = route('pdf_account.print_sale_ledger_payment_receipt');

                if (url != "") {
                    setTimeout(() => {
                        window.open(url, '_blank')
                    }, 1000);
                }
            },
            onError: (errors) => {
                for (const key in errors) {
                    if (['audience_type', 'student_id', 'staff_id', 'sale_ledger_id'].includes(key)) {
                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        });

                        break;
                    }
                }

                setCustomErrors(errors);

                const form_data = {
                    staff_id: data?.staff_id,
                    student_id: data?.student_id,
                    audience_type: data?.audience_type
                }

                router.post(route('sale_due_payment'), form_data);
            },
        });
    };
    // handle take sale due payment end

    // handle reset start
    const handleReset = () => {
        router.get(route('sale_due_payment'));
    }
    // handle reset end

    return (
        <>
            <form onSubmit={handleTakeSaleDuePayment}>
                <div className="educare-common-card mt-5">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="bank_ledger_id"
                                                    value="Payment Mode"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            id="bank_ledger_id"
                                            data_label="Payment Mode"
                                            data={paymentModes}
                                            value={data.bank_ledger_id}
                                            onChange={(e) => {
                                                setData(
                                                    "bank_ledger_id",
                                                    e.target.value
                                                );
                                            }}
                                            className="block"
                                        />
                                        <InputError
                                            message={customErrors.bank_ledger_id}
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
                                            selected={data?.payment_date ? new Date(data.payment_date) : null}
                                            onChange={(date) =>
                                                setData('payment_date', date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Payment Date"
                                            className="w-full"
                                        />
                                        <InputError
                                            message={customErrors.payment_date}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 xl:col-span-6 ">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="TransactionNo/ChequeNo"
                                                />
                                                {/* <sup>*</sup> */}
                                            </div>
                                        </div>
                                        <TextInput
                                            value={data.transaction_no}
                                            onChange={(e) =>
                                                setData(
                                                    "transaction_no",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeHolder="Transaction No/Cheque No"
                                        />
                                        <InputError
                                            message={customErrors.transaction_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Transaction Detail"
                                                />
                                                {/* <sup>*</sup> */}
                                            </div>
                                        </div>
                                        <TextInput
                                            id="transaction_details"
                                            value={data.transaction_details}
                                            onChange={(e) =>
                                                setData(
                                                    "transaction_details",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeHolder="Transaction Details"
                                        />
                                        <InputError
                                            message={customErrors.transaction_details}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-6 ">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Date"
                                                />
                                                {/* <sup>*</sup> */}
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={data?.transaction_date ? new Date(data.transaction_date) : null}
                                            onChange={(date) =>
                                                setData('transaction_date', date)
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
                                            message={customErrors.transaction_date}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <div className="flex flex-wrap justify-end gap-2.5">
                                        <PrimaryButton
                                            type="button"
                                            className="educare-gray-btn-lg-stroke"
                                            onClick={() => handleReset()}
                                        >
                                            Reset
                                        </PrimaryButton>
                                        <PrimaryButton
                                            type="submit"
                                            // disabled={processing}
                                            className="educare-primary-btn-lg-fill"
                                        >
                                            Takes Sale Dues
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
